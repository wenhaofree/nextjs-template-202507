import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { UserAvatar } from "@/components/auth/user-avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/profile')
  }

  // 从数据库获取完整的用户信息
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email || '',
      isDeleted: false,
    },
  })

  if (!user) {
    redirect('/auth/signin?callbackUrl=/profile')
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">用户资料</h1>
          <p className="text-muted-foreground">管理您的账户信息和设置</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
              <CardDescription>您的账户基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <UserAvatar size="lg" />
                <div>
                  <h3 className="text-lg font-semibold">{user.nickname || '未设置昵称'}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">用户ID:</span>
                  <span className="text-sm text-muted-foreground">{user.uuid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">注册时间:</span>
                  <span className="text-sm text-muted-foreground">
                    {user.createdAt.toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">最后更新:</span>
                  <span className="text-sm text-muted-foreground">
                    {user.updatedAt.toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 登录信息 */}
          <Card>
            <CardHeader>
              <CardTitle>登录信息</CardTitle>
              <CardDescription>您的登录方式和安全信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">登录方式:</span>
                  <Badge variant={user.signinProvider === 'credentials' ? 'default' : 'secondary'}>
                    {user.signinProvider === 'credentials' ? '邮箱密码' : 
                     user.signinProvider === 'google' ? 'Google' :
                     user.signinProvider === 'github' ? 'GitHub' : 
                     user.signinProvider}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">登录类型:</span>
                  <span className="text-sm text-muted-foreground">{user.signinType || '未知'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">最后登录IP:</span>
                  <span className="text-sm text-muted-foreground">{user.signinIp || '未知'}</span>
                </div>
                {user.locale && (
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">语言设置:</span>
                    <span className="text-sm text-muted-foreground">{user.locale}</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  编辑资料
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 会话信息 */}
        <Card>
          <CardHeader>
            <CardTitle>会话信息</CardTitle>
            <CardDescription>当前登录会话的详细信息</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button asChild variant="outline">
            <a href="/">返回首页</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/test-auth">测试认证</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
