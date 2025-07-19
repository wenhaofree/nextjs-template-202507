"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GoogleOneTapWrapper from "@/components/GoogleOneTapWrapper"
import { useEffect, useState } from "react"

export default function TestGoogleOneTapPage() {
  const { data: session, status } = useSession()
  const [diagnostics, setDiagnostics] = useState<any>({})

  useEffect(() => {
    // 运行诊断检查
    const runDiagnostics = () => {
      const diag = {
        googleAPILoaded: typeof window !== "undefined" && !!window.google,
        clientIdConfigured: !!process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
        oneTapEnabled: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED === "true",
        localStorageState: typeof window !== "undefined" ? localStorage.getItem("googleOneTapPromptShown") : null,
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "N/A",
        cookiesEnabled: typeof window !== "undefined" ? navigator.cookieEnabled : false,
        isSecureContext: typeof window !== "undefined" ? window.isSecureContext : false,
        currentURL: typeof window !== "undefined" ? window.location.href : "N/A",
      }
      setDiagnostics(diag)
    }

    runDiagnostics()

    // 每秒检查一次 Google API 状态
    const interval = setInterval(runDiagnostics, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleClearStorage = () => {
    localStorage.removeItem("googleOneTapPromptShown")
    console.log("🧹 Cleared googleOneTapPromptShown from localStorage")
    window.location.reload()
  }

  const handleForcePrompt = () => {
    if (window.google && process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID) {
      try {
        console.log("🔄 Force triggering Google One Tap prompt...")
        window.google.accounts.id.prompt()
      } catch (error) {
        console.error("❌ Error forcing prompt:", error)
      }
    } else {
      console.warn("⚠️ Google API or Client ID not available")
    }
  }

  const handleTestGoogleAPI = () => {
    console.log("🧪 Testing Google API availability...")
    console.log("Google API:", window.google)
    console.log("Client ID:", process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID)
    console.log("Environment variables:", {
      NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED,
      NEXT_PUBLIC_AUTH_GOOGLE_ID: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <GoogleOneTapWrapper />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Google One Tap 测试页面</CardTitle>
            <CardDescription>
              此页面用于测试 Google One Tap 登录功能，包含详细的诊断信息
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">当前状态</h3>
              <p className="text-sm text-muted-foreground mb-2">
                登录状态: {status === "loading" ? "加载中..." : status === "authenticated" ? "已登录" : "未登录"}
              </p>
              {session?.user && (
                <div className="mt-2 p-3 bg-muted rounded-lg">
                  <p><strong>用户名:</strong> {session.user.name}</p>
                  <p><strong>邮箱:</strong> {session.user.email}</p>
                  <p><strong>头像:</strong> {session.user.image ? "已设置" : "未设置"}</p>
                  <p><strong>用户ID:</strong> {(session.user as any).id}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">系统诊断</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Google API 加载:</span>
                    <Badge variant={diagnostics.googleAPILoaded ? "default" : "destructive"}>
                      {diagnostics.googleAPILoaded ? "✅ 已加载" : "❌ 未加载"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Client ID 配置:</span>
                    <Badge variant={diagnostics.clientIdConfigured ? "default" : "destructive"}>
                      {diagnostics.clientIdConfigured ? "✅ 已配置" : "❌ 未配置"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">One Tap 启用:</span>
                    <Badge variant={diagnostics.oneTapEnabled ? "default" : "destructive"}>
                      {diagnostics.oneTapEnabled ? "✅ 已启用" : "❌ 未启用"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Cookie 支持:</span>
                    <Badge variant={diagnostics.cookiesEnabled ? "default" : "destructive"}>
                      {diagnostics.cookiesEnabled ? "✅ 支持" : "❌ 不支持"}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">安全上下文:</span>
                    <Badge variant={diagnostics.isSecureContext ? "default" : "destructive"}>
                      {diagnostics.isSecureContext ? "✅ HTTPS" : "❌ HTTP"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">本地存储:</span>
                    <Badge variant={diagnostics.localStorageState ? "secondary" : "default"}>
                      {diagnostics.localStorageState ? "已显示过" : "未显示过"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted rounded-lg text-xs">
                <p><strong>当前URL:</strong> {diagnostics.currentURL}</p>
                <p><strong>用户代理:</strong> {diagnostics.userAgent}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">测试操作</h3>
              <div className="flex flex-wrap gap-2">
                {session ? (
                  <Button onClick={() => signOut()} variant="outline">
                    退出登录
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground w-full mb-2">
                    如果配置正确，您应该看到 Google One Tap 登录提示
                  </p>
                )}

                <Button onClick={handleClearStorage} variant="secondary">
                  重置 One Tap 状态
                </Button>

                <Button onClick={handleForcePrompt} variant="outline">
                  强制触发提示
                </Button>

                <Button onClick={handleTestGoogleAPI} variant="outline">
                  测试 Google API
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">故障排除指南</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">1. 检查浏览器控制台</h4>
                  <p className="text-muted-foreground">打开开发者工具 (F12) 查看控制台日志，寻找以 🔍、✅、❌ 开头的消息</p>
                </div>
                <div>
                  <h4 className="font-medium">2. 验证 Google Cloud Console 配置</h4>
                  <ul className="list-disc list-inside text-muted-foreground ml-4">
                    <li>确保 JavaScript 来源包含: http://localhost:3000</li>
                    <li>确保授权重定向 URI 包含: http://localhost:3000/api/auth/callback/google</li>
                    <li>检查 OAuth 同意屏幕是否已配置</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">3. 浏览器设置</h4>
                  <ul className="list-disc list-inside text-muted-foreground ml-4">
                    <li>确保启用了第三方 Cookie</li>
                    <li>清除浏览器缓存和 Cookie</li>
                    <li>尝试无痕模式</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
