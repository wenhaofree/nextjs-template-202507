# NextAuth.js 认证系统完善版 - 参考 ShipSaaS Office

## ✅ 已完成的功能

### 🔐 认证提供商
- **Google OAuth** - 支持 Google 账号一键登录（可通过环境变量控制）
- **GitHub OAuth** - 支持 GitHub 账号一键登录（可通过环境变量控制）
- **邮箱密码登录** - 基础框架已搭建（待数据库集成后完善）

### 🎨 UI 组件
- **完善的登录页面** (`/auth/signin`) - 支持多种登录方式的统一界面
- **智能登录按钮** - 根据环境变量自动显示/隐藏提供商
- **用户头像组件** - 多尺寸支持，完整的用户信息展示
- **认证状态组件** - 导航栏中的智能登录/登出状态
- **错误处理** - 完善的错误信息显示和处理

### 🛠️ 技术实现
- **NextAuth.js v5** - 最新版本的认证解决方案
- **环境变量控制** - 灵活的提供商启用/禁用配置
- **会话管理** - 优化的客户端和服务端会话状态同步
- **中间件集成** - 与国际化中间件完美兼容
- **TypeScript 支持** - 完整的类型安全和类型定义
- **工具函数** - 便捷的认证状态检查和用户获取函数

## 📁 文件结构

```
src/
├── auth.ts                           # NextAuth.js 配置
├── app/
│   ├── api/auth/[...nextauth]/       # NextAuth.js API 路由
│   │   └── route.ts
│   └── auth/signin/                  # 登录页面
│       └── page.tsx
├── components/auth/                  # 认证相关组件
│   ├── auth-status.tsx              # 认证状态组件
│   ├── session-provider.tsx         # 会话提供者
│   ├── sign-in-button.tsx           # 登录按钮
│   ├── sign-in-form.tsx             # 登录表单
│   └── user-avatar.tsx              # 用户头像
├── components/ui/                    # UI 组件
│   ├── avatar.tsx                   # 头像组件
│   └── separator.tsx                # 分隔符组件
└── middleware.ts                     # 中间件配置（已更新）
```

## 🔧 配置步骤

### 1. 环境变量配置

复制 `.env.example` 到 `.env.local` 并填入真实的配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# NextAuth.js Configuration
AUTH_SECRET="your-secret-key-here"  # 生成: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Configuration
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# GitHub OAuth Configuration  
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

### 2. Google OAuth 设置

1. 访问 [Google Cloud Console](https://console.developers.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 添加授权重定向 URI：
   - 开发环境：`http://localhost:3000/api/auth/callback/google`
   - 生产环境：`https://yourdomain.com/api/auth/callback/google`

### 3. GitHub OAuth 设置

1. 访问 [GitHub Developer Settings](https://github.com/settings/applications/new)
2. 创建新的 OAuth App
3. 填写应用信息：
   - Application name: 你的应用名称
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### 4. 启动应用

确保 Node.js 版本 >= 18：

```bash
# 检查 Node.js 版本
node --version

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🚀 使用方法

### 访问登录页面
- 直接访问：`http://localhost:3000/auth/signin`
- 点击导航栏的 "Sign In" 按钮

### 登录流程
1. 选择 Google 或 GitHub 登录
2. 完成第三方认证
3. 自动重定向回首页
4. 导航栏显示用户头像

### 登出
1. 点击导航栏的用户头像
2. 选择 "Log out"
3. 自动重定向到首页

## 🔍 故障排除

### 中间件重定向问题
已修复：认证页面 (`/auth/*`) 不会被国际化中间件处理，避免了 404 错误。

### 环境变量问题
确保 `.env.local` 文件中的所有变量都已正确配置。

### OAuth 回调 URL 错误
检查 Google 和 GitHub 应用设置中的回调 URL 是否正确。

## 📚 API 参考

### 客户端 Hooks

```tsx
import { useSession, signIn, signOut } from "next-auth/react"

// 获取会话信息
const { data: session, status } = useSession()

// 登录
signIn("google") // 或 "github"

// 登出
signOut()
```

### 服务端认证

```tsx
import { auth } from "@/auth"

// 在服务端组件中获取会话
const session = await auth()
```

## 🎉 完成！

NextAuth.js 认证系统已成功集成到您的 Next.js 应用中。用户现在可以使用 Google 或 GitHub 账号进行安全登录。
