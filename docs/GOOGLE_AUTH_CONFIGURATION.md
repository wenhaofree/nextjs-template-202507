# Google 认证配置指南

本项目支持两种Google登录方式，您可以根据需要选择启用：

## 1. Google One Tap (推荐)

**特点**：
- 自动弹出登录提示
- 无需跳转页面
- 更好的用户体验
- 适合首次访问用户

**配置**：
```bash
# 启用 Google One Tap
NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED=true
NEXT_PUBLIC_AUTH_GOOGLE_ID=your_google_client_id
```

## 2. 传统 Google OAuth

**特点**：
- 登录页面中的按钮
- 标准OAuth流程
- 用户主动点击登录
- 适合登录页面

**配置**：
```bash
# 启用传统 Google OAuth
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=true
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

## 推荐配置

### 方案一：仅使用 Google One Tap
```bash
# 禁用传统OAuth，仅使用One Tap
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=false
NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED=true
NEXT_PUBLIC_AUTH_GOOGLE_ID=your_google_client_id
```

### 方案二：同时启用两种方式
```bash
# 同时启用两种方式（当前配置）
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED=true
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED=true
NEXT_PUBLIC_AUTH_GOOGLE_ID=your_google_client_id
```

## Google Cloud Console 配置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建或选择项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 添加授权域名：
   - 开发环境：`localhost:3000`
   - 生产环境：`yourdomain.com`

## 测试

1. 启动开发服务器：`pnpm dev`
2. 访问主页：`http://localhost:3000`
3. 访问测试页面：`http://localhost:3000/test-google-one-tap`

## 故障排除

### Google One Tap 不显示
1. 检查环境变量配置
2. 确认未登录状态
3. 清除浏览器缓存：`localStorage.removeItem("googleOneTapPromptShown")`
4. 检查Google Cloud Console域名配置

### 传统登录失败
1. 检查 AUTH_GOOGLE_SECRET 是否配置
2. 确认重定向URI配置正确
3. 查看浏览器控制台错误信息

## 相关文件

- `src/auth.ts` - 认证配置
- `src/components/GoogleOneTap.tsx` - One Tap组件
- `src/components/GoogleOneTapWrapper.tsx` - One Tap包装器
- `src/components/auth/sign-in-form.tsx` - 登录表单
- `src/app/layout.tsx` - Google脚本加载
