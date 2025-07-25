import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import { getServerSession } from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma, findUserWithPassword } from '@/lib/prisma'
import { compare } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const authOptions: AuthOptions = {
  providers: [
    // 配置Google登录
    ...(process.env.NEXT_PUBLIC_AUTH_GOOGLE_ENABLED === "true" && process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
          }),
        ]
      : []),
    // 配置GitHub登录
    ...(process.env.NEXT_PUBLIC_AUTH_GITHUB_ENABLED === "true" && process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
          }),
        ]
      : []),
    // 邮箱密码登录
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 使用辅助函数查找用户，包含password字段
        const user = await findUserWithPassword(credentials.email, 'credentials');

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.nickname || '',
          image: user.avatarUrl || '',
          uuid: user.uuid,
        };
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 天
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
  },
  callbacks: {
    async jwt({ token, user, account }: any) {
      // 如果是OAuth登录，处理用户信息
      if (user && account && account.provider !== 'credentials') {
        try {
          // 查找或创建用户
          let dbUser = await prisma.user.findFirst({
            where: {
              email: user.email || '',
              signinProvider: account.provider,
            },
          });

          if (!dbUser) {
            // 如果用户不存在，创建新用户
            dbUser = await prisma.user.create({
              data: {
                uuid: uuidv4(),
                email: user.email || '',
                nickname: user.name || '',
                avatarUrl: user.image || '',
                signinProvider: account.provider,
                signinOpenid: account.providerAccountId,
                signinType: 'oauth',
                signinIp: '127.0.0.1', // 可以后续优化获取真实IP
              },
            });
          } else {
            // 更新现有用户信息
            await prisma.user.update({
              where: { id: dbUser.id },
              data: {
                nickname: user.name || dbUser.nickname,
                avatarUrl: user.image || dbUser.avatarUrl,
                signinIp: '127.0.0.1',
              },
            });
          }

          // 更新token
          token.id = dbUser.id.toString();
          token.uuid = dbUser.uuid;
        } catch (error) {
          console.error('Error in JWT callback:', error);
        }
      }

      if (user) {
        token.id = user.id
        token.uuid = (user as any).uuid
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }

      return token
    },
    async session({ session, token }: any) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
        (session.user as any).uuid = token.uuid as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      return session
    },
    async signIn({ user, account }: any) {
      try {
        if (!user.email) {
          console.error('No email provided by OAuth provider')
          return false
        }

        // 对于credentials登录，直接返回true（已在authorize中验证）
        if (account?.provider === 'credentials') {
          return true
        }

        // 对于OAuth登录，允许登录（用户创建/更新在jwt回调中处理）
        return true
      } catch (error) {
        console.error('Sign in error:', error)
        return false
      }
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };

// For server-side authentication in NextAuth v4
export const auth = () => getServerSession(authOptions);
