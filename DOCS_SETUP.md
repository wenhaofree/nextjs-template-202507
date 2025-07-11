# Fumadocs 文档系统设置指南

## 🎯 概述

本项目成功集成了 Fumadocs 文档系统，提供了现代化的文档体验。系统基于 Next.js 15、React 19 和 TypeScript 构建。

## ✅ 已完成的配置

### 1. 核心文件结构

```
├── content/docs/              # 文档内容目录
│   ├── index.mdx             # 首页
│   ├── getting-started.mdx   # 入门指南
│   ├── components.mdx        # 组件文档
│   ├── configuration.mdx     # 配置说明
│   ├── troubleshooting.mdx   # 故障排除
│   └── meta.json            # 页面元数据配置
├── src/
│   ├── app/docs/            # 文档路由
│   │   ├── layout.tsx       # 文档布局
│   │   └── [[...slug]]/page.tsx  # 动态路由页面
│   ├── lib/source.ts        # 文档源配置
│   └── mdx-components.tsx   # MDX 组件配置
├── source.config.ts         # Fumadocs 主配置
├── next.config.ts          # Next.js 配置（已集成 MDX）
├── tsconfig.json           # TypeScript 配置（已添加路径映射）
└── .source/                # 自动生成的类型文件
```

### 2. 关键配置文件

#### source.config.ts
```typescript
import { defineDocs } from 'fumadocs-mdx/config';
import { defineConfig } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: '@/mdx-components',
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
```

#### src/mdx-components.tsx
```typescript
import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...components,
  };
}
```

#### src/lib/source.ts
```typescript
import { docs, meta } from '@/.source';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

export const source = loader({
  baseUrl: '/docs',
  source: createMDXSource(docs, meta),
});
```

### 3. 修复的问题

#### Hydration 错误修复
在 `src/app/layout.tsx` 中添加了 `suppressHydrationWarning`:

```typescript
<html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
    <RootProvider>{children}</RootProvider>
  </body>
</html>
```

#### 路径映射配置
在 `tsconfig.json` 中添加了正确的路径映射:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/.source": ["./.source"]
    }
  }
}
```

#### Next.js MDX 集成
在 `next.config.ts` 中集成了 Fumadocs MDX:

```typescript
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
export default withMDX(nextConfig);
```

## 🚀 启动流程

### 1. 安装依赖
```bash
pnpm install
```

### 2. 生成文档类型（重要！）
```bash
pnpm fumadocs-mdx
```
这会生成 `.source` 文件夹和必要的类型定义。

### 3. 启动开发服务器
```bash
pnpm dev
```

### 4. 访问文档
打开浏览器访问: http://localhost:3001/docs

## 📝 添加新文档页面

1. 在 `content/docs/` 目录下创建新的 `.mdx` 文件
2. 添加 frontmatter:
   ```yaml
   ---
   title: 页面标题
   description: 页面描述
   ---
   ```
3. 编写内容
4. 更新 `content/docs/meta.json` 文件
5. 运行 `pnpm fumadocs-mdx` 重新生成类型
6. 重启开发服务器

## 🎨 功能特性

### ✅ 已实现的功能

- **现代化 UI**: 基于 Fumadocs UI 的美观界面
- **MDX 支持**: 在 Markdown 中使用 React 组件
- **代码高亮**: 支持多种编程语言
- **搜索功能**: 内置搜索 API
- **深色模式**: 自动主题切换
- **响应式设计**: 移动端友好
- **类型安全**: 完整的 TypeScript 支持
- **组件库**: 包含 Tabs、CodeBlock 等组件

### 🔧 可用的 MDX 组件

- **Tabs**: 标签页组件
- **CodeBlock**: 增强的代码块
- **Pre**: 预格式化文本
- 所有 Fumadocs UI 默认组件

## 🔍 故障排除

### 常见问题

1. **模块解析错误**: 确保运行了 `pnpm fumadocs-mdx`
2. **Hydration 错误**: 已通过 `suppressHydrationWarning` 修复
3. **404 错误**: 检查文件路径和 `meta.json` 配置
4. **类型错误**: 重新生成类型文件

### 调试步骤

1. 清理缓存: `rm -rf .next .source`
2. 重新生成: `pnpm fumadocs-mdx`
3. 重启服务器: `pnpm dev`

## 📚 文档页面

当前可用的文档页面：

- [首页](/docs) - 系统概述
- [入门指南](/docs/getting-started) - 详细的使用说明
- [组件库](/docs/components) - 可用的 UI 组件
- [配置指南](/docs/configuration) - 系统配置说明
- [故障排除](/docs/troubleshooting) - 常见问题解决方案

## 🎯 成功指标

系统正常运行的标志：

- ✅ 开发服务器启动无错误
- ✅ 所有文档页面返回 200 状态码
- ✅ 导航菜单正常显示
- ✅ 代码高亮正常工作
- ✅ 搜索功能可用
- ✅ 主题切换正常

## 📞 技术支持

- [Fumadocs 官方文档](https://fumadocs.vercel.app/)
- [Next.js 文档](https://nextjs.org/docs)
- [MDX 文档](https://mdxjs.com/)

---

**状态**: ✅ 完全配置并正常运行
**最后更新**: 2025-01-11
**版本**: Fumadocs 15.6.3, Next.js 15.3.5
