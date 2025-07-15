# Tailark Components

这个目录包含了从 [tailark.com](https://tailark.com) 整合的现代化营销组件。这些组件基于 shadcn/ui 和 Tailwind CSS 构建，提供了响应式、可定制的营销网站组件。

## 组件列表

### HeroSection
现代化的英雄区域组件，支持标题、描述、CTA按钮、图片和logo云展示。

**特性：**
- 响应式设计
- 渐变背景
- 可选的徽章标签
- 主要和次要CTA按钮
- 英雄图片展示
- Logo云展示

**使用示例：**
```tsx
import { HeroSection } from "@/components/tailark"

<HeroSection
  badge="🚀 New Release"
  title="Modern Solutions for"
  subtitle="Customer Engagement"
  description="Highly customizable components for building modern websites and applications."
  primaryCta={{
    text: "Start Building",
    href: "#features"
  }}
  secondaryCta={{
    text: "Watch Demo",
    href: "#demo"
  }}
  image={{
    src: "/app-light.png",
    alt: "App Screenshot"
  }}
  logoCloud={{
    title: "Trusted by leading companies",
    logos: [
      { src: "/logo1.svg", alt: "Company 1" },
      { src: "/logo2.svg", alt: "Company 2" }
    ]
  }}
/>
```

### FeaturesSection
功能特性展示组件，支持网格和列表两种布局。

**特性：**
- 网格或列表布局
- 可配置列数（2、3、4列）
- 图标支持
- 可选徽章标签
- 悬停效果

**使用示例：**
```tsx
import { FeaturesSection } from "@/components/tailark"
import { Zap, Shield } from "lucide-react"

<FeaturesSection
  badge="Features"
  title="Everything you need"
  features={[
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed with optimized performance.",
      badge: "Fast"
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Enterprise-grade security with encryption."
    }
  ]}
  layout="grid"
  columns={2}
/>
```

### PricingSection
定价方案展示组件，支持月付/年付切换。

**特性：**
- 月付/年付切换
- 热门方案标识
- 功能对比列表
- 自定义CTA按钮
- 年付折扣显示

**使用示例：**
```tsx
import { PricingSection } from "@/components/tailark"

<PricingSection
  title="Choose the perfect plan"
  showYearlyToggle={true}
  yearlyDiscount="Save 20%"
  plans={[
    {
      name: "Starter",
      description: "Perfect for individuals",
      price: { monthly: 0, yearly: 0 },
      features: [
        { name: "Up to 3 projects", included: true },
        { name: "5GB storage", included: true }
      ],
      cta: { text: "Get ShipSaaS", href: "/signup" }
    }
  ]}
/>
```

### ContactSection
联系我们组件，包含联系信息和表单。

**特性：**
- 联系信息展示
- 联系表单
- 图标支持
- 响应式布局

**使用示例：**
```tsx
import { ContactSection } from "@/components/tailark"
import { Mail, Phone } from "lucide-react"

<ContactSection
  title="Get in touch"
  contactInfo={[
    {
      icon: Mail,
      title: "Email",
      details: ["hello@example.com"],
      href: "mailto:hello@example.com"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567"],
      href: "tel:+15551234567"
    }
  ]}
  showForm={true}
/>
```

## 安装和使用

1. 确保项目已安装必要的依赖：
   - @radix-ui/react-* 组件
   - lucide-react 图标
   - tailwindcss
   - class-variance-authority
   - clsx

2. 导入组件：
```tsx
import { 
  HeroSection, 
  FeaturesSection, 
  PricingSection, 
  ContactSection 
} from "@/components/tailark"
```

3. 查看完整示例：访问 `/tailark-demo` 页面查看所有组件的使用示例。

## 自定义

所有组件都支持通过props进行自定义，包括：
- 颜色主题（通过CSS变量）
- 布局选项
- 内容配置
- 样式变体

## 技术栈

- **React 19** - 现代React特性
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的CSS框架
- **Radix UI** - 无样式、可访问的组件
- **Lucide React** - 美观的图标库
- **shadcn/ui** - 组件设计系统

## 浏览器支持

支持所有现代浏览器，包括：
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
