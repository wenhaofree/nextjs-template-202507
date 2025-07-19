"use client";

import { useEffect, useCallback } from "react";
import { useSession, signIn } from "next-auth/react";

export default function GoogleOneTap() {
  const { status } = useSession();

  const handleCredentialResponse = useCallback(async (response: any) => {
    console.log("🔐 Google One Tap credential received:", response);

    if (response.credential) {
      try {
        console.log("🚀 Attempting to sign in with Google One Tap...");
        const result = await signIn("google-one-tap", {
          credential: response.credential,
          redirect: false,
        });
        console.log("✅ Sign in result:", result);
      } catch (error) {
        console.error("❌ Sign in error:", error);
      }
    } else {
      console.warn("⚠️ No credential in response");
    }
  }, []);

  useEffect(() => {
    console.log("🔍 GoogleOneTap useEffect - Status:", status);

    // 仅在未登录状态且浏览器环境下初始化Google One Tap
    if (status === "unauthenticated" && typeof window !== "undefined") {
      const promptShown = localStorage.getItem("googleOneTapPromptShown");
      console.log("📱 Local storage googleOneTapPromptShown:", promptShown);

      // 确保googleOneTapPromptShown不存在或为false
      if (!promptShown) {
        console.log("🎯 Initializing Google One Tap...");

        // 等待Google脚本加载完成
        const initializeGoogleOneTap = () => {
          const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID;
          console.log("🔑 Client ID available:", !!clientId);
          console.log("🌐 Google API available:", !!window.google);

          if (window.google && clientId) {
            try {
              console.log("⚙️ Initializing Google accounts.id...");

              window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse,
                auto_select: true,
                cancel_on_tap_outside: true,
                // 添加更多配置选项
                use_fedcm_for_prompt: true,
              });

              console.log("📢 Calling Google One Tap prompt...");
              window.google.accounts.id.prompt((notification: any) => {
                console.log("📋 Prompt notification:", notification);

                if (notification.isNotDisplayed()) {
                  console.log("❌ One Tap not displayed:", notification.getNotDisplayedReason());
                  localStorage.setItem("googleOneTapPromptShown", "true");
                } else if (notification.isSkippedMoment()) {
                  console.log("⏭️ One Tap skipped:", notification.getSkippedReason());
                  localStorage.setItem("googleOneTapPromptShown", "true");
                } else if (notification.isDismissedMoment()) {
                  console.log("🚫 One Tap dismissed:", notification.getDismissedReason());
                  localStorage.setItem("googleOneTapPromptShown", "true");
                } else {
                  console.log("✅ One Tap displayed successfully");
                }
              });
            } catch (error) {
              console.error("❌ Google One Tap initialization error:", error);
            }
          } else {
            console.warn("⚠️ Missing requirements:", {
              googleAPI: !!window.google,
              clientId: !!clientId
            });
          }
        };

        // 如果Google脚本已经加载，直接初始化
        if (window.google) {
          console.log("✅ Google API already loaded");
          initializeGoogleOneTap();
        } else {
          console.log("⏳ Waiting for Google API to load...");
          // 否则等待脚本加载
          const checkGoogleLoaded = setInterval(() => {
            if (window.google) {
              console.log("✅ Google API loaded, initializing...");
              clearInterval(checkGoogleLoaded);
              initializeGoogleOneTap();
            }
          }, 100);

          // 10秒后清除检查
          setTimeout(() => {
            console.log("⏰ Timeout waiting for Google API");
            clearInterval(checkGoogleLoaded);
          }, 10000);
        }
      } else {
        console.log("🔒 Google One Tap already shown, skipping");
      }
    } else {
      console.log("🚫 Skipping Google One Tap:", {
        status,
        isClient: typeof window !== "undefined"
      });
    }
  }, [status, handleCredentialResponse]);

  // 这是一个隐形组件，不需要渲染任何内容
  return null;
}
