# JSON 解析错误修复文档

## 问题描述

在运行 `pnpm dev` 时遇到以下错误：

```
SyntaxError: Unexpected non-whitespace character after JSON at position 373
```

错误影响的页面：
- `/zh/blog/building-saas-with-nextjs`
- `/zh/blog`
- `/zh` (中文首页)
- `/favicon.ico`

## 错误分析

### 根本原因
这个错误是由 **next-intl 的动态导入机制** 引起的：

```typescript
// 问题代码 (src/i18n/request.ts)
messages: (await import(`../../messages/${locale}.json`)).default
```

### 为什么会出现这个问题？

1. **动态导入的 JSON 解析问题**: Next.js 在处理动态导入的 JSON 文件时，可能会遇到字符编码或格式问题
2. **Webpack 模块解析**: 在开发模式下，Webpack 对动态导入的处理可能不够稳定
3. **国际化文件大小**: 中文消息文件较大，包含复杂的 Unicode 字符

### 错误位置分析
- **位置 373**: 指向 JSON 文件中的特定字符位置
- **中文页面受影响**: 说明问题出现在 `zh.json` 文件的处理上
- **动态导入失败**: 导致整个页面渲染失败

## 解决方案

### 修复方法：使用静态导入

**修改前 (动态导入):**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

**修改后 (静态导入):**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// 静态导入消息文件，避免动态导入的 JSON 解析问题
import enMessages from '../../messages/en.json';
import zhMessages from '../../messages/zh.json';

const messages = {
  en: enMessages,
  zh: zhMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messages[locale as keyof typeof messages]
  };
});
```

### 优势对比

| 方面 | 动态导入 | 静态导入 |
|------|----------|----------|
| **性能** | 按需加载 | 预加载所有语言 |
| **稳定性** | 可能出现解析错误 | 稳定可靠 |
| **构建时间** | 快 | 稍慢 |
| **运行时错误** | 可能发生 | 不会发生 |
| **类型安全** | 较弱 | 更强 |

## 其他修复措施

### 1. 清理缓存
```bash
rm -rf .next .source
pnpm fumadocs-mdx
```

### 2. 修复 Git 合并冲突
确保 `next.config.ts` 文件没有合并冲突标记。

### 3. 优化 Next.js 配置
```typescript
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  serverComponentsHmrCache: false, // 禁用可能导致问题的缓存
},
```

## 预防措施

### 1. JSON 文件验证
定期验证 JSON 文件格式：
```bash
# 验证 JSON 格式
python3 -m json.tool messages/zh.json > /dev/null && echo "✅ Valid" || echo "❌ Invalid"
```

### 2. 使用 TypeScript 类型检查
为消息文件添加类型定义，确保类型安全。

### 3. 测试多语言功能
在开发过程中定期测试所有语言版本的页面。

## 总结

通过将 next-intl 的动态导入改为静态导入，成功解决了 JSON 解析错误。这种方法虽然会增加一些初始包大小，但提供了更好的稳定性和类型安全性。

### 修复结果
- ✅ 中文页面正常加载
- ✅ 博客页面正常显示
- ✅ 国际化功能正常工作
- ✅ 开发服务器稳定运行

### 建议
对于生产环境，建议继续使用静态导入方式，因为它提供了更好的稳定性和性能可预测性。
