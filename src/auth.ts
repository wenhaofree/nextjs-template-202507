import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"
import { getServerSession } from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
// 动态导入 Prisma，避免构建时初始化
const getPrisma = async () => {
  const { prisma } = await import('@/lib/prisma')
  return prisma
}

const getFindUserWithPassword = async () => {
  const { findUserWithPassword } = await import('@/lib/prisma')
  return findUserWithPassword
}
import { compare } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { headers } from 'next/headers'
import { jwtDecode } from "jwt-decode"

// 获取客户端IP地址
async function getClientIP(): Promise<string> {
  try {
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const realIP = headersList.get('x-real-ip');

    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    if (realIP) {
      return realIP;
    }
    return '127.0.0.1';
  } catch (error) {
    console.warn('Failed to get client IP:', error);
    return '127.0.0.1';
  }
}

// Google One Tap凭据提供者
const googleOneTapProvider = CredentialsProvider({
  id: "google-one-tap",
  name: "Google One Tap",
  credentials: {
    credential: { type: "text" }
  },
  async authorize(credentials) {
    try {
      if (!credentials?.credential) return null;

      // 解码Google提供的JWT令牌
      const decoded: any = jwtDecode(credentials.credential);
      const clientIP = await getClientIP();

      // 处理用户信息
      const userData = {
        uuid: decoded.sub,
        email: decoded.email,
        nickname: decoded.name,
        avatarUrl: decoded.picture,
        signinType: 'oauth',
        signinIp: clientIP,
        signinProvider: 'google-one-tap',
        signinOpenid: decoded.sub,
        createdAt: new Date(),
      };

      // 查找或创建用户
      const existingUser = await prisma.user.findFirst({
        where: {
          email: decoded.email,
          signinProvider: 'google-one-tap',
        },
      });

      if (existingUser) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            signinIp: clientIP,
          },
        });
        return {
          id: existingUser.id.toString(),
          uuid: existingUser.uuid,
          email: existingUser.email,
          name: existingUser.nickname,
          image: existingUser.avatarUrl,
        };
      } else {
        const newUser = await prisma.user.create({
          data: userData,
        });
        return {
          id: newUser.id.toString(),
          uuid: newUser.uuid,
          email: newUser.email,
          name: newUser.nickname,
          image: newUser.avatarUrl,
        };
      }
    } catch (error) {
      console.error('Google One Tap authorization error:', error);
      return null;
    }
  }
});

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

    // Google One Tap Provider (if enabled)
    ...(process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED === "true"
      ? [googleOneTapProvider]
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
        const findUserWithPassword = await getFindUserWithPassword()
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
          const prisma = await getPrisma()
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
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        (session.user as any).id = token.id as string;
        (session.user as any).uuid = token.uuid as string;
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
