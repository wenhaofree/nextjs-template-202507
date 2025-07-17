"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GoogleOneTapWrapper from "@/components/GoogleOneTapWrapper"

export default function TestGoogleOneTapPage() {
  const { data: session, status } = useSession()

  const handleClearStorage = () => {
    localStorage.removeItem("googleOneTapPromptShown")
    window.location.reload()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <GoogleOneTapWrapper />
      
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Google One Tap 测试页面</CardTitle>
            <CardDescription>
              此页面用于测试 Google One Tap 登录功能
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">当前状态</h3>
              <p className="text-sm text-muted-foreground">
                登录状态: {status === "loading" ? "加载中..." : status === "authenticated" ? "已登录" : "未登录"}
              </p>
              {session?.user && (
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <p><strong>用户名:</strong> {session.user.name}</p>
                  <p><strong>邮箱:</strong> {session.user.email}</p>
                  <p><strong>头像:</strong> {session.user.image ? "已设置" : "未设置"}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">测试操作</h3>
              <div className="space-y-2">
                {session ? (
                  <Button onClick={() => signOut()} variant="outline">
                    退出登录
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    如果配置正确，您应该看到 Google One Tap 登录提示
                  </p>
                )}
                
                <Button onClick={handleClearStorage} variant="secondary">
                  重置 One Tap 状态
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">配置检查</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Google One Tap 启用:</strong>{" "}
                  {process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED === "true" ? "✅ 是" : "❌ 否"}
                </p>
                <p>
                  <strong>Google Client ID:</strong>{" "}
                  {process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID ? "✅ 已配置" : "❌ 未配置"}
                </p>
                <p>
                  <strong>本地存储状态:</strong>{" "}
                  {typeof window !== "undefined" && localStorage.getItem("googleOneTapPromptShown") 
                    ? "已显示过" 
                    : "未显示过"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">使用说明</h3>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>确保在 .env.local 中配置了正确的 Google 认证信息</li>
                <li>设置 NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED=true</li>
                <li>如果已登录，请先退出登录</li>
                <li>刷新页面或点击"重置 One Tap 状态"按钮</li>
                <li>应该会看到 Google One Tap 登录提示</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
