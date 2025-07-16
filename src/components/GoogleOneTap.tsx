"use client";

import { useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";

export default function GoogleOneTap() {
  const { status } = useSession();

  const handleCredentialResponse = useCallback(async (response: any) => {
    if (response.credential) {
      // 使用获取到的凭据调用NextAuth登录
      await signIn("google-one-tap", {
        credential: response.credential,
        redirect: false,
      });
    }
  }, []);

  useEffect(() => {
    // 仅在未登录状态且浏览器环境下初始化Google One Tap
    if (status === "unauthenticated" && typeof window !== "undefined") {
      // 确保googleOneTapPromptShown不存在或为false
      if (!localStorage.getItem("googleOneTapPromptShown")) {
        // 等待Google脚本加载完成
        const initializeGoogleOneTap = () => {
          if (window.google && process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID) {
            try {
              window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
                callback: handleCredentialResponse,
                auto_select: true,
                cancel_on_tap_outside: true,
              });

              window.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                  localStorage.setItem("googleOneTapPromptShown", "true");
                }
              });
            } catch (error) {
              // 静默处理初始化错误
            }
          }
        };

        // 如果Google脚本已经加载，直接初始化
        if (window.google) {
          initializeGoogleOneTap();
        } else {
          // 否则等待脚本加载
          const checkGoogleLoaded = setInterval(() => {
            if (window.google) {
              clearInterval(checkGoogleLoaded);
              initializeGoogleOneTap();
            }
          }, 100);

          // 10秒后清除检查
          setTimeout(() => {
            clearInterval(checkGoogleLoaded);
          }, 10000);
        }
      }
    }
  }, [status, handleCredentialResponse]);

  // 这是一个隐形组件，不需要渲染任何内容
  return null;
}
