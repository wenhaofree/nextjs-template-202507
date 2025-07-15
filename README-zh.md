# ShipSaaS - 完整的 SaaS 开发平台

🚀 **一个周末搭建你的 SaaS！** 一个全面的 Next.js 样板，包含构建和启动盈利 SaaS 应用程序所需的一切。采用最新技术构建，具备生产就绪的功能。

🌐 **官网**: [shipsaas.net](https://shipsaas.net)
📖 **English Docs**: [README.md](./README.md)
🎯 **在线演示**: [demo.shipsaas.net](https://demo.shipsaas.net)

## ✨ 为什么选择 ShipSaaS？

### 🚀 最新技术栈
- **Next.js 15.3.5** - 最新的 React 框架，支持 App Router 和服务器组件
- **React 19** - 最新版本的 React，具有并发特性和改进的性能
- **TypeScript 5** - 整个应用程序的完整类型安全
- **Tailwind CSS v4** - 最新的实用优先 CSS 框架，具有现代特性
- **Turbopack** - 超快速的开发环境打包工具，提供闪电般的开发体验

### 🔐 完整的认证系统
- **NextAuth.js v4.24.11** - 生产就绪的认证系统，带会话管理
- **多提供商支持** - Google OAuth、GitHub OAuth、邮箱密码登录
- **Google One-Tap** - 无缝的一键认证体验
- **安全密码处理** - bcryptjs 哈希加盐
- **会话管理** - 基于 JWT 的会话，具有数据库持久性

### 💳 支付和计费集成
- **Stripe v18.3.0** - 完整的支付处理，带 Webhook 支持
- **多种支付方式** - 信用卡、支付宝、微信支付（本地化）
- **订阅管理** - 周期性计费和套餐管理
- **订单管理** - 完整的订单生命周期，带激活系统
- **多币种支持** - USD/CNY，具有适当的汇率转换

### 🌍 国际化 (i18n)
- **next-intl v4.3.4** - 专业的国际化解决方案
- **多语言支持** - 英语和中文（易于扩展）
- **本地化路由** - SEO 友好的 URL，带语言前缀
- **动态内容** - 本地化的价格、支付方式和内容
- **RTL 支持** - 支持从右到左的语言

### 🗄️ 数据库和 ORM
- **Prisma v6.11.1** - 类型安全的数据库操作，带自动完成
- **PostgreSQL** - 生产级数据库，完全符合 ACID
- **Neon 集成** - 无服务器 PostgreSQL，带自动扩展
- **迁移系统** - 版本控制的数据库架构变更
- **种子数据** - 开发和测试数据设置

### 🎨 高级 UI 组件
- **Shadcn/ui** - 50+ 高质量、可访问的组件
- **Radix UI** - 无样式、可访问的原语，用于自定义设计
- **Framer Motion v12.23.0** - 流畅的动画和微交互
- **Lucide React v0.525.0** - 525+ 美观、一致的图标
- **Next Themes v0.4.6** - 无缝的深色/浅色模式切换
- **Class Variance Authority** - 类型安全的组件变体

### 📧 电子邮件和通信
- **Resend v4.6.0** - 现代电子邮件 API，用于事务性邮件
- **通讯系统** - 订阅者管理和电子邮件活动
- **电子邮件模板** - 美观、响应式的电子邮件设计
- **SMTP 集成** - 灵活的电子邮件提供商配置

### 🛠️ 开发者体验
- **TypeScript** - 完整的类型安全，带严格配置
- **ESLint** - 代码质量和一致性强制
- **PNPM** - 快速、高效的包管理
- **热重载** - 开发过程中的即时反馈
- **错误边界** - 优雅的错误处理和恢复

## 🏗️ 架构概览

ShipSaaS 遵循现代、可扩展的架构，专为生产级 SaaS 应用程序设计：

```
📦 ShipSaaS 项目结构
├── 🌐 前端层 (Next.js 15 + React 19)
│   ├── App Router 与服务器组件
│   ├── 客户端组件用于交互
│   ├── 中间件处理认证和国际化
│   └── 静态生成提升性能
├── 🔐 认证层 (NextAuth.js)
│   ├── 多提供商 OAuth (Google, GitHub)
│   ├── 基于凭据的认证
│   ├── 会话管理 (JWT + 数据库)
│   └── Google One-Tap 集成
├── 💾 数据层 (Prisma + PostgreSQL)
│   ├── 类型安全的数据库操作
│   ├── 迁移系统
│   ├── 连接池
│   └── 种子数据管理
├── 💳 支付层 (Stripe)
│   ├── 结账会话
│   ├── Webhook 处理
│   ├── 订阅管理
│   └── 多币种支持
├── 🌍 国际化 (next-intl)
│   ├── 服务器端渲染
│   ├── 动态路由
│   ├── 消息管理
│   └── 语言检测
└── 📧 通信层 (Resend)
    ├── 事务性邮件
    ├── 通讯系统
    ├── 模板管理
    └── 分析跟踪
```

### 📂 详细文件结构

```
src/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # 国际化路由
│   │   ├── layout.tsx            # 特定语言布局
│   │   ├── page.tsx              # 着陆页
│   │   ├── auth/                 # 认证页面
│   │   ├── dashboard/            # 用户仪表板
│   │   ├── pricing/              # 价格页面
│   │   ├── orders/               # 订单管理
│   │   └── profile/              # 用户资料
│   ├── api/                      # API 路由
│   │   ├── auth/                 # 认证 API
│   │   ├── stripe/               # 支付处理
│   │   ├── orders/               # 订单管理
│   │   └── newsletter/           # 邮件订阅
│   ├── globals.css               # 全局样式和 CSS 变量
│   └── layout.tsx                # 根布局
├── components/                    # React 组件
│   ├── auth/                     # 认证组件
│   ├── blocks/                   # 页面区块
│   ├── sections/                 # 布局区块
│   ├── ui/                       # 可复用 UI 组件
│   └── providers.tsx             # 上下文提供者
├── lib/                          # 工具库
│   ├── auth.ts                   # 认证助手
│   ├── prisma.ts                 # 数据库客户端
│   ├── stripe.ts                 # 支付助手
│   ├── email.ts                  # 邮件工具
│   └── utils.ts                  # 通用工具
├── messages/                     # 国际化消息文件
│   ├── en.json                   # 英语翻译
│   └── zh.json                   # 中文翻译
├── i18n/                         # 国际化配置
│   ├── routing.ts                # 路由配置
│   └── request.ts                # 请求配置
├── types/                        # TypeScript 定义
│   ├── auth.ts                   # 认证类型
│   ├── stripe.ts                 # 支付类型
│   └── global.ts                 # 全局类型
└── middleware.ts                 # Next.js 中间件
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- PNPM 10+（推荐）或 npm/yarn
- PostgreSQL 数据库（或 Neon.tech 账户）
- Stripe 账户用于支付处理
- Google/GitHub 开发者账户（用于 OAuth）

### 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/shipsaasnet/shipsaas-starter.git
cd shipsaas-starter
```

2. 设置环境变量：
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入你的凭据：
```
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/shipsaas"

# 认证
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_PRIVATE_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# 邮件 (Resend)
RESEND_API_KEY="re_..."
```

3. 安装依赖：
```bash
pnpm install
```

4. 设置数据库：
```bash
# 生成 Prisma 客户端
pnpm db:generate

# 推送架构到数据库
pnpm db:push

# 使用测试数据填充数据库
pnpm db:seed
```

5. 启动开发服务器：
```bash
pnpm dev
```

6. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 可用脚本

- `pnpm dev` - 使用 Turbopack 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行 ESLint
- `pnpm db:generate` - 生成 Prisma 客户端
- `pnpm db:push` - 推送架构到数据库
- `pnpm db:migrate` - 运行数据库迁移
- `pnpm db:studio` - 打开 Prisma Studio
- `pnpm db:seed` - 使用测试数据填充数据库

## 🎨 自定义配置

### 主题配置
ShipSaaS 使用 CSS 变量进行主题配置，支持深色/浅色模式。在 `src/app/globals.css` 中自定义颜色：

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(1 0 0);
  /* ... 更多变量 */
}

.dark {
  --background: oklch(0.1 0 0);
  --foreground: oklch(0.95 0 0);
  --primary: oklch(0.7 0.2 250);
  --primary-foreground: oklch(0.1 0 0);
  /* ... 更多变量 */
}
```

### 组件变体
组件使用 Class Variance Authority (CVA) 进行类型安全的变体管理：

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        glow: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/35",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### 国际化配置
在 `messages` 目录中添加或修改翻译：

```json
// messages/zh.json
{
  "Index": {
    "title": "一个周末搭建你的 SaaS",
    "description": "一个完整的 Next.js 样板，包含构建和启动盈利 SaaS 应用程序所需的一切。"
  },
  "Pricing": {
    "title": "简单透明的价格",
    "description": "没有隐藏费用，没有意外。免费开始，准备好时升级。",
    "monthly": "月付",
    "annually": "年付",
    "basic": "基础版",
    "standard": "标准版",
    "premium": "高级版"
  }
}
```

### 认证配置
在 `.env.local` 中配置认证提供商：

```
# 启用/禁用提供商
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED="true"
NEXT_PUBLIC_AUTH_GITHUB_ENABLED="true"
NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED="true"

# 提供商凭据
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

## 📦 完整依赖列表

### 核心框架
- **next**: `15.3.5` - React 框架，支持 App Router
- **react**: `19.0.0` - 最新的 React，支持并发特性
- **react-dom**: `19.0.0` - React DOM 渲染器
- **typescript**: `5.x` - TypeScript 语言支持

### 认证与安全
- **next-auth**: `4.24.11` - Next.js 的认证解决方案
- **bcryptjs**: `3.0.2` - 密码哈希
- **jwt-decode**: `4.0.0` - JWT 令牌解码
- **uuid**: `11.1.0` - UUID 生成

### 数据库与 ORM
- **@prisma/client**: `6.11.1` - Prisma 数据库客户端
- **prisma**: `6.11.1` - Prisma ORM 工具包

### 支付处理
- **stripe**: `18.3.0` - Stripe 服务器端 SDK
- **@stripe/stripe-js**: `7.4.0` - Stripe 客户端 SDK

### UI 组件与样式
- **@radix-ui/react-accordion**: `1.2.11` - 可访问的手风琴组件
- **@radix-ui/react-avatar**: `1.1.10` - 头像组件
- **@radix-ui/react-checkbox**: `1.3.2` - 复选框组件
- **@radix-ui/react-dialog**: `1.1.14` - 模态对话框
- **@radix-ui/react-dropdown-menu**: `2.1.15` - 下拉菜单
- **@radix-ui/react-icons**: `1.3.2` - Radix 图标集
- **@radix-ui/react-label**: `2.1.7` - 表单标签
- **@radix-ui/react-navigation-menu**: `1.2.13` - 导航菜单
- **@radix-ui/react-select**: `2.2.5` - 选择下拉框
- **@radix-ui/react-separator**: `1.1.7` - 视觉分隔符
- **@radix-ui/react-slot**: `1.2.3` - 插槽组件
- **@radix-ui/react-switch**: `1.2.5` - 开关组件
- **@radix-ui/react-tooltip**: `1.2.7` - 工具提示
- **lucide-react**: `0.525.0` - 美观的图标库
- **framer-motion**: `12.23.0` - 动画库
- **motion**: `12.23.3` - 动画组件

### 样式与主题
- **tailwindcss**: `4.x` - 实用优先的 CSS 框架
- **@tailwindcss/postcss**: `4.x` - PostCSS 插件
- **tailwind-merge**: `3.3.1` - 合并 Tailwind 类
- **tailwindcss-animate**: `1.0.7` - 动画工具
- **tw-animate-css**: `1.3.5` - 额外的动画
- **class-variance-authority**: `0.7.1` - 组件变体
- **clsx**: `2.1.1` - 条件类名
- **next-themes**: `0.4.6` - 主题切换

### 国际化
- **next-intl**: `4.3.4` - Next.js 的国际化解决方案

### 电子邮件与通信
- **resend**: `4.6.0` - 现代电子邮件 API

### 工具与助手
- **date-fns**: `4.1.0` - 日期工具库
- **zod**: `4.0.5` - 模式验证
- **sonner**: `2.0.6` - 提示通知
- **@number-flow/react**: `0.5.10` - 动画数字

### 文档（可选）
- **fumadocs-core**: `15.6.3` - 文档核心
- **fumadocs-mdx**: `11.6.10` - MDX 处理
- **fumadocs-ui**: `15.6.3` - 文档 UI
- **@types/mdx**: `2.0.13` - MDX 类型定义

### 开发依赖
- **@types/node**: `20.x` - Node.js 类型定义
- **@types/react**: `19.x` - React 类型定义
- **@types/react-dom**: `19.x` - React DOM 类型定义
- **@types/uuid**: `10.0.0` - UUID 类型定义

## 🌟 生产就绪功能

### 🔐 认证系统
- **多提供商 OAuth**: Google、GitHub 一键设置
- **邮箱/密码**: 安全的基于凭据的认证
- **Google One-Tap**: 无缝认证体验
- **会话管理**: JWT 令牌与数据库持久性
- **密码安全**: bcryptjs 哈希加盐
- **用户管理**: 个人资料页面、头像上传、账户设置

### 💳 支付与计费
- **Stripe 集成**: 完整的支付处理，带 Webhook 支持
- **多种支付方式**: 信用卡、支付宝、微信支付
- **订阅管理**: 周期性计费和套餐升级
- **多币种**: USD/CNY 支持，带汇率转换
- **订单管理**: 完整的订单生命周期，带激活功能
- **计费仪表板**: 发票历史、支付方式、使用跟踪

### 🌍 国际化
- **多语言**: 英语和中文（易于扩展）
- **本地化路由**: SEO 友好的 URL，带语言前缀
- **动态内容**: 本地化的价格、支付方式和内容
- **服务器端渲染**: 针对性能和 SEO 优化
- **语言检测**: 自动语言检测和切换

### 🎨 UI/UX 卓越性
- **50+ 组件**: 生产就绪的 Shadcn/ui 组件
- **深色/浅色模式**: 无缝主题切换，支持系统偏好
- **响应式设计**: 移动优先的 Tailwind CSS 方法
- **动画**: 使用 Framer Motion 的流畅微交互
- **无障碍性**: 符合 WCAG 标准，支持键盘导航
- **加载状态**: 骨架加载器和进度指示器

### 📊 仪表板与分析
- **用户仪表板**: 账户概览、计费、设置
- **管理面板**: 用户管理、订单跟踪、分析
- **实时更新**: 带乐观更新的实时数据
- **数据可视化**: 业务洞察的图表和指标
- **导出功能**: 报告的 CSV/PDF 导出

### 📧 电子邮件系统
- **事务性邮件**: 欢迎、密码重置、订单确认
- **通讯**: 订阅者管理和电子邮件活动
- **电子邮件模板**: 美观、响应式的电子邮件设计
- **分析**: 打开率、点击跟踪、参与度指标

### 🛡️ 安全与性能
- **CSRF 保护**: NextAuth.js 内置安全性
- **速率限制**: API 保护防止滥用
- **输入验证**: 所有表单的 Zod 模式验证
- **错误处理**: 优雅的错误边界和用户反馈
- **性能**: 使用 Next.js 15 和 React 19 优化
- **SEO 优化**: 元标签、结构化数据、站点地图生成

## 🎯 价格套餐

ShipSaaS 提供三个精心设计的套餐，满足不同需求：

### � 基础版 ($99)
适合开始 SaaS 之旅
- Next.js 15 + React 19 + TypeScript
- TailwindCSS v4 带深色/浅色模式
- 国际化 (i18n) 支持
- Neon PostgreSQL 数据库
- OAuth 认证 (Google, GitHub)
- SEO 优化
- Stripe 支付集成
- 使用 Resend 的电子邮件系统

### ⭐ 标准版 ($169)
增强了高级 UI 组件和 AI 功能
- 包含基础版的所有功能，外加：
- MagicUI 高级组件
- TailArk 组件库
- Animate-UI 动画
- Vercel AI SDK 集成
- ChatGPT 功能
- 高级电子邮件模板
- 优先电子邮件支持

### 💎 高级版 ($299)
完整的 SaaS 平台，带高级功能
- 包含标准版的所有功能，外加：
- 用户仪表板带分析
- 管理系统
- 积分/信用管理
- API 管理系统
- 一对一咨询
- 优先支持
- 自定义集成

## �📚 文档与资源

### 官方文档
- [ShipSaaS 文档](https://docs.shipsaas.net) - 完整的设置和使用指南
- [API 参考](https://docs.shipsaas.net/api) - 详细的 API 文档
- [组件库](https://ui.shipsaas.net) - 交互式组件展示

### 技术栈资源
- [Next.js 15 文档](https://nextjs.org/docs) - 最新的 Next.js 特性和 API
- [React 19 文档](https://react.dev) - 新的 React 特性和钩子
- [Tailwind CSS v4](https://tailwindcss.com/docs) - 实用优先的 CSS 框架
- [Prisma 文档](https://www.prisma.io/docs) - 数据库 ORM 和迁移
- [NextAuth.js 指南](https://authjs.dev) - 认证设置和配置
- [Stripe 文档](https://stripe.com/docs) - 支付处理和 Webhook
- [next-intl 指南](https://next-intl.dev) - 国际化最佳实践

### 社区与支持
- [GitHub 仓库](https://github.com/shipsaasnet/shipsaas-starter) - 源代码和问题
- [Discord 社区](https://discord.gg/shipsaas) - 社区支持和讨论
- [Twitter 更新](https://twitter.com/shipsaas) - 最新消息和更新
- [YouTube 教程](https://youtube.com/@shipsaas) - 视频指南和教程

## 🚀 部署

### Vercel（推荐）
部署 ShipSaaS 最简单的方法是使用 [Vercel](https://vercel.com)：

1. 将代码推送到 GitHub
2. 将你的仓库连接到 Vercel
3. 配置环境变量
4. 零配置部署

### 其他平台
ShipSaaS 可在任何支持 Next.js 的平台上运行：
- **Netlify**: 带边缘函数的全栈部署
- **Railway**: 数据库和应用程序托管
- **DigitalOcean**: App Platform 部署
- **AWS**: Amplify 或自定义 EC2 设置
- **Google Cloud**: Cloud Run 或 App Engine

### 生产环境变量
```
# 数据库
DATABASE_URL="your-production-database-url"

# 认证
AUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_PRIVATE_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# 邮件
RESEND_API_KEY="re_..."
```

## 🤝 贡献

我们欢迎对 ShipSaaS 的贡献！请阅读我们的[贡献指南](CONTRIBUTING.md)，了解我们的行为准则和提交拉取请求的流程。

## 📄 许可证

ShipSaaS 采用 [MIT 许可证](LICENSE)。可以自由用于个人和商业项目。

---

**准备好发布你的 SaaS 了吗？** 🚀
访问 [shipsaas.net](https://shipsaas.net) 立即开始！



## 📋 功能清单

ShipSaaS 包含以下已实现的核心功能：

### 🚀 核心技术
- **Next.js 15.3.5** ✅
- **React 19** ✅
- **TypeScript 5** ✅
- **Tailwind CSS v4** ✅
- **Turbopack** ✅

### 🏠 页面组件
- **Hero 区域** ✅
- **站点头部** ✅
- **技术栈展示** ✅
- **功能特性** ✅
- **价格方案** ✅
- **页脚** ✅
- **文档系统** ✅
- **仪表板** ✅
- **FAQ 常见问题**
- **用户评价**
- **统计数据**
- **演示页面**

### ⚙️ 功能模块
- **主题切换** (next-themes) ✅
- **认证系统** (next-auth) ✅
  - Google OAuth ✅
  - GitHub OAuth ✅
  - 邮箱密码登录 ✅
- **数据库 ORM** (Prisma) ✅
- **PostgreSQL 数据库** (Neon) ✅
- **支付系统** (Stripe) ✅
- **UI 组件库** (Shadcn/ui) ✅
- **邮件服务** (Resend) ✅
- **国际化** (next-intl) ✅
- **高级 UI 组件**
  - MagicUI ✅
  - TailArk ✅
  - Animate-UI ✅
- **AI 集成**
  - Vercel AI SDK
  - ChatGPT

### 🔜 即将推出
- **企业版功能**:
  - 管理控制台
  - 积分系统
  - API 管理系统
  - 一对一咨询服务
- **订单管理**:
  - 订单信息整合到仪表板
  - 支付成功后的自动处理
- **营销系统**:
  - 用户分析
  - 推广工具
  - 转化跟踪