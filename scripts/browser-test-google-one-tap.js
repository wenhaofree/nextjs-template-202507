// 浏览器端 Google One Tap 测试脚本
// 在浏览器控制台中运行此脚本来验证 Google One Tap 配置

console.log("🔍 Testing Google One Tap configuration in browser...");

// 测试当前页面的 CSP 状态
function testCurrentPageCSP() {
  console.log("🛡️ Testing current page CSP status...");
  
  // 检查是否有 CSP 违规
  const cspViolations = [];
  
  // 监听 CSP 违规事件
  document.addEventListener('securitypolicyviolation', (e) => {
    cspViolations.push({
      directive: e.violatedDirective,
      blockedURI: e.blockedURI,
      originalPolicy: e.originalPolicy
    });
    console.error("🚨 CSP Violation:", e);
  });
  
  // 测试 Google 样式表加载
  const testStylesheet = document.createElement('link');
  testStylesheet.rel = 'stylesheet';
  testStylesheet.href = 'https://accounts.google.com/gsi/style';
  testStylesheet.onload = () => {
    console.log("✅ Google stylesheet loaded successfully");
  };
  testStylesheet.onerror = () => {
    console.error("❌ Failed to load Google stylesheet");
  };
  
  document.head.appendChild(testStylesheet);
  
  return cspViolations;
}

// 检查 Google One Tap 的具体要求
function checkGoogleOneTapRequirements() {
  console.log("📋 Checking Google One Tap requirements...");
  
  const requirements = {
    googleAPILoaded: !!window.google,
    clientIdAvailable: !!process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID,
    httpsContext: window.location.protocol === 'https:' || window.location.hostname === 'localhost',
    cookiesEnabled: navigator.cookieEnabled,
    thirdPartyCookies: 'testing...'
  };
  
  console.log("📊 Requirements check:", requirements);
  
  // 测试第三方 Cookie
  testThirdPartyCookies();
  
  return requirements;
}

// 测试第三方 Cookie 支持
function testThirdPartyCookies() {
  console.log("🍪 Testing third-party cookies...");
  
  // 创建一个隐藏的 iframe 来测试第三方 Cookie
  const testFrame = document.createElement('iframe');
  testFrame.src = 'https://accounts.google.com/gsi/iframe/select';
  testFrame.style.display = 'none';
  testFrame.style.width = '1px';
  testFrame.style.height = '1px';
  
  testFrame.onload = () => {
    console.log("✅ Third-party iframe loaded (cookies likely enabled)");
    setTimeout(() => {
      if (document.body.contains(testFrame)) {
        document.body.removeChild(testFrame);
      }
    }, 2000);
  };
  
  testFrame.onerror = () => {
    console.error("❌ Third-party iframe failed (cookies likely blocked)");
  };
  
  document.body.appendChild(testFrame);
}

// 实际测试 Google One Tap 初始化
function testRealGoogleOneTap() {
  console.log("🎯 Testing real Google One Tap initialization...");
  
  if (!window.google) {
    console.error("❌ Google API not loaded");
    return;
  }
  
  const clientId = process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID || '482582148726-meu0odo1u9iojrt3ru9ev2o5nudemob7.apps.googleusercontent.com';
  
  try {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        console.log("🔐 Test callback received:", response);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    
    console.log("✅ Google One Tap initialized successfully");
    
    // 尝试显示提示（仅用于测试）
    window.google.accounts.id.prompt((notification) => {
      console.log("📢 Prompt notification:", notification);
      
      if (notification.isNotDisplayed()) {
        console.log("❌ Prompt not displayed:", notification.getNotDisplayedReason());
      } else if (notification.isSkippedMoment()) {
        console.log("⏭️ Prompt skipped:", notification.getSkippedReason());
      } else {
        console.log("✅ Prompt displayed successfully");
      }
    });
    
  } catch (error) {
    console.error("❌ Google One Tap test failed:", error);
  }
}

// 检查环境变量
function checkEnvironmentVariables() {
  console.log("🔧 Checking environment variables...");
  
  const envVars = {
    NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED,
    NEXT_PUBLIC_AUTH_GOOGLE_ID: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID ? 'Set' : 'Not set'
  };
  
  console.log("📋 Environment variables:", envVars);
  
  return envVars;
}

// 检查页面元素
function checkPageElements() {
  console.log("🔍 Checking page elements...");
  
  const elements = {
    googleScript: !!document.querySelector('script[src*="accounts.google.com"]'),
    googleOneTapWrapper: !!document.querySelector('[data-testid="google-one-tap-wrapper"]') || 'Component may be dynamically loaded',
    sessionProvider: !!document.querySelector('[data-nextauth-session-provider]') || 'May not have data attribute'
  };
  
  console.log("📋 Page elements:", elements);
  
  return elements;
}

// 运行完整的诊断
function runFullDiagnostic() {
  console.log("🚀 Running full Google One Tap diagnostic...");
  
  const violations = testCurrentPageCSP();
  const requirements = checkGoogleOneTapRequirements();
  const envVars = checkEnvironmentVariables();
  const pageElements = checkPageElements();
  
  setTimeout(() => {
    if (window.google) {
      testRealGoogleOneTap();
    } else {
      console.error("❌ Google API not available for testing");
    }
  }, 2000);
  
  // 返回诊断结果
  return {
    violations,
    requirements,
    envVars,
    pageElements,
    timestamp: new Date().toISOString()
  };
}

// 清除 Google One Tap 状态
function clearGoogleOneTapState() {
  console.log("🧹 Clearing Google One Tap state...");
  
  // 清除本地存储
  localStorage.removeItem("googleOneTapPromptShown");
  
  // 清除 Google 的内部状态（如果可能）
  if (window.google && window.google.accounts && window.google.accounts.id) {
    try {
      window.google.accounts.id.cancel();
      console.log("✅ Google One Tap cancelled");
    } catch (error) {
      console.log("⚠️ Could not cancel Google One Tap:", error.message);
    }
  }
  
  console.log("✅ State cleared, you can now refresh the page to test again");
}

// 浏览器环境下的全局函数
if (typeof window !== 'undefined') {
  window.googleOneTapDiagnostic = {
    runFullDiagnostic,
    testCurrentPageCSP,
    checkGoogleOneTapRequirements,
    testThirdPartyCookies,
    testRealGoogleOneTap,
    checkEnvironmentVariables,
    checkPageElements,
    clearGoogleOneTapState
  };
  
  console.log("💡 Available functions:");
  console.log("  - window.googleOneTapDiagnostic.runFullDiagnostic()");
  console.log("  - window.googleOneTapDiagnostic.testCurrentPageCSP()");
  console.log("  - window.googleOneTapDiagnostic.testRealGoogleOneTap()");
  console.log("  - window.googleOneTapDiagnostic.clearGoogleOneTapState()");
  
  // 自动运行基本检查
  setTimeout(() => {
    console.log("\n🔄 Auto-running basic checks...");
    checkEnvironmentVariables();
    checkPageElements();
  }, 1000);
}
