# Next.js 模板 2025

一个现代化的 Next.js 模板，集成了使用 React、TypeScript 和 Tailwind CSS 构建的高级 UI 组件。该模板为构建美观、响应式的 Web 应用程序提供了坚实的基础，采用最新技术栈。

## ✨ 特性

### 🚀 核心技术
- **Next.js 15.3.5** - 最新的 React 框架，支持 App Router
- **React 19** - 最新版本的 React，包含新特性
- **TypeScript 5** - 类型安全的开发体验
- **Tailwind CSS v4** - 最新的实用优先 CSS 框架
- **Turbopack** - 超快速的开发环境打包工具

### 🎨 UI 组件和设计系统
- **Shadcn/ui** - 高质量、可访问的 UI 组件库
- **Radix UI** - 无样式、可访问的组件基础
  - 包含 Checkbox、Label、Select、Slot、Switch 组件
- **Lucide React** - 美观的图标库（525+ 图标）
- **Framer Motion** - 流畅的动画和过渡效果
- **Class Variance Authority (CVA)** - 组件变体管理
- **Next Themes** - 深色/浅色模式支持

### 🧩 自定义组件
- **Hero Section** - 着陆页英雄区域，包含徽章、标题、描述和操作按钮
- **Button** - 多种变体（默认、破坏性、轮廓、次要、幽灵、链接、发光）
- **Badge** - 状态和通知徽章
- **Mockup & MockupFrame** - 设备模型，用于展示应用程序
- **Glow Effects** - 美观的渐变发光组件
- **Ghost 404 Page** - 使用 Framer Motion 的动画 404 错误页面
- **Flow Button** - 现代动画按钮，带悬停效果
- **Icons Collection** - 自定义 SVG 图标集（GitHub、Twitter、React、Tailwind 等）

### 🛠 开发工具
- **PNPM** - 快速、节省磁盘空间的包管理器
- **PostCSS** - CSS 处理，集成 Tailwind CSS 插件
- **ESLint** - 代码检查和格式化
- **TypeScript Config** - 优化的 TypeScript 配置

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局，包含字体配置
│   ├── page.tsx           # 主页，包含 Hero Section
│   ├── not-found.tsx      # 自定义 404 页面
│   └── globals.css        # 全局样式和 CSS 变量
├── components/
│   ├── blocks/            # 页面区块
│   │   └── hero-section.tsx
│   └── ui/                # 可复用 UI 组件
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── switch.tsx
│       ├── mockup.tsx
│       ├── glow.tsx
│       ├── flow-button.tsx
│       ├── ghost-404-page.tsx
│       └── icons.tsx
└── lib/
    └── utils.ts           # 工具函数（cn、clsx、twMerge）
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- PNPM（推荐）或 npm/yarn

### 安装步骤

1. 克隆仓库：
```bash
git clone <repository-url>
cd nextjs-template-202507
```

2. 安装依赖：
```bash
pnpm install
# 或
npm install
# 或
yarn install
```

3. 启动开发服务器：
```bash
pnpm dev
# 或
npm run dev
# 或
yarn dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 可用脚本

- `pnpm dev` - 使用 Turbopack 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm start` - 启动生产服务器
- `pnpm lint` - 运行 ESLint

## 🎨 自定义配置

### 主题配置
项目使用 CSS 变量进行主题配置。在 `src/app/globals.css` 中自定义颜色：

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... 更多变量 */
}
```

### 组件变体
组件使用 Class Variance Authority (CVA) 进行变体管理：

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        glow: "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
      },
    },
  }
)
```

## 📦 依赖项

### 生产依赖
- `@radix-ui/react-*` - 可访问的 UI 基础组件
- `class-variance-authority` - 组件变体管理
- `clsx` - 条件 className 工具
- `framer-motion` - 动画库
- `lucide-react` - 图标库
- `next-themes` - 主题切换
- `tailwind-merge` - Tailwind 类名合并

### 开发依赖
- `@tailwindcss/postcss` - Tailwind CSS PostCSS 插件
- `@types/*` - TypeScript 类型定义
- `tw-animate-css` - 额外的 Tailwind 动画

## 🌟 核心功能说明

### Hero Section（英雄区域）
灵活的英雄组件，包含：
- 可选的徽章和操作链接
- 渐变文本标题
- 描述文本
- 多个操作按钮和变体
- 响应式图片，支持深色/浅色模式
- 发光效果和动画

### 404 页面
动画 404 页面，特色功能：
- Framer Motion 动画
- 交互式幽灵角色
- 流畅的过渡和悬停效果
- 响应式设计

### 按钮系统
全面的按钮组件，包含：
- 多种变体（默认、发光、轮廓等）
- 尺寸选项（sm、default、lg、icon）
- 图标支持
- 无障碍功能

## 📚 学习更多

了解更多使用的技术：

- [Next.js 文档](https://nextjs.org/docs) - 学习 Next.js 特性和 API
- [Tailwind CSS](https://tailwindcss.com/docs) - 实用优先的 CSS 框架
- [Shadcn/ui](https://ui.shadcn.com/) - 基于 Radix UI 构建的可复用组件
- [Framer Motion](https://www.framer.com/motion/) - React 动画库
- [Radix UI](https://www.radix-ui.com/) - 底层 UI 基础组件

## 🚀 部署到 Vercel

部署 Next.js 应用最简单的方法是使用 Next.js 创建者提供的 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)。

查看 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying) 了解更多详情。

## 📄 许可证

本项目是开源的，采用 [MIT 许可证](LICENSE)。



## 功能记录：
1. 核心依赖：
	- next.js：v15.3.5 ✅
	- tailwindcss：v4 ✅
	- react：19 ✅
2. 落地页：
	- hero ✅
	- head
	- techstack
	- features
	- pricing
	- faq
	- Testimonials
	- cat
	- stats
	- showcase
	- Newsletter
	- footer
3. 功能组件依赖：
	- next-theme
	- auth（betterauth， next-auth）
	- orm （drizzleorm， prisma）
	- postgreSQL
	- stripe
	- shadcnui
	- resend
	- fumadocs
	- next-init
	- magicui
	- tailark
	- vercel ai sdk
	- ChatGPT
