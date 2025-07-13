# AI 功能 API 配置指南

本文档详细说明如何配置 AI 功能所需的 API 密钥和环境变量，以启用 ChatGPT 对话和 AI 图片生成功能。

## 📋 目录

- [概述](#概述)
- [环境变量配置](#环境变量配置)
- [OpenAI API 配置](#openai-api-配置)
- [功能验证](#功能验证)
- [故障排除](#故障排除)
- [API 使用限制](#api-使用限制)

## 🎯 概述

项目集成了以下 AI 功能：

### ✅ 已实现的功能
- **AI 对话页面** (`/chat`): ChatGPT 驱动的智能对话
- **AI 图片生成页面** (`/image-generation`): DALL-E 3 图片生成
- **工具集成**: 天气查询、计算器、搜索、代码分析
- **演示模式**: 无 API 密钥时的功能演示

### 🔧 技术栈
- **AI SDK**: Vercel AI SDK (`@ai-sdk/react`, `@ai-sdk/openai`)
- **模型支持**: GPT-4o, GPT-4o-mini, GPT-4, GPT-3.5-turbo
- **图片生成**: DALL-E 3
- **流式响应**: 实时文本和对话流

## ⚙️ 环境变量配置

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# 复制示例文件
cp .env.example .env.local
```

### 2. 配置 OpenAI API 密钥

在 `.env.local` 文件中添加以下配置：

```env
# OpenAI API 配置
OPENAI_API_KEY=your_openai_api_key_here

# 可选：指定 OpenAI 组织 ID（如果有）
OPENAI_ORGANIZATION=your_org_id_here

# 可选：API 基础 URL（默认使用 OpenAI 官方）
OPENAI_BASE_URL=https://api.openai.com/v1
```

### 3. 其他可选配置

```env
# AI 功能开关（可选，默认启用）
ENABLE_AI_CHAT=true
ENABLE_IMAGE_GENERATION=true

# 默认模型配置（可选）
DEFAULT_CHAT_MODEL=gpt-4o-mini
DEFAULT_IMAGE_MODEL=dall-e-3

# API 限制配置（可选）
MAX_TOKENS_PER_REQUEST=2000
MAX_IMAGES_PER_REQUEST=1
```

## 🔑 OpenAI API 配置

### 1. 获取 API 密钥

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 登录或注册账户
3. 进入 [API Keys](https://platform.openai.com/api-keys) 页面
4. 点击 "Create new secret key"
5. 复制生成的 API 密钥

### 2. 设置计费信息

⚠️ **重要**: OpenAI API 需要设置付费账户才能使用

1. 进入 [Billing](https://platform.openai.com/account/billing) 页面
2. 添加付款方式
3. 设置使用限额（建议从小额开始）

### 3. API 密钥权限

确保 API 密钥具有以下权限：
- ✅ Model capabilities (模型调用)
- ✅ Image generation (图片生成)

## 🧪 功能验证

### 1. 启动开发服务器

```bash
pnpm dev
```

### 2. 测试 AI 对话功能

访问 `http://localhost:3001/chat` 并测试：

- ✅ 基础对话功能
- ✅ 工具调用（天气、计算器、搜索）
- ✅ 流式响应
- ✅ 多轮对话记忆

### 3. 测试图片生成功能

访问 `http://localhost:3001/image-generation` 并测试：

- ✅ 文本到图片生成
- ✅ 不同风格选择
- ✅ 多种尺寸支持
- ✅ 图片下载功能

### 4. API 端点测试

使用 curl 测试 API：

```bash
# 测试聊天 API
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}]}'

# 测试图片生成 API
curl -X POST http://localhost:3001/api/image-generation \
  -H "Content-Type: application/json" \
  -d '{"prompt":"A beautiful sunset over mountains"}'
```

## 🔧 故障排除

### 常见问题

#### 1. API 密钥无效
```
Error: Invalid API key
```
**解决方案**:
- 检查 `.env.local` 文件中的 `OPENAI_API_KEY`
- 确保密钥没有多余的空格或引号
- 验证密钥在 OpenAI 平台上是否有效

#### 2. 账户余额不足
```
Error: You exceeded your current quota
```
**解决方案**:
- 检查 OpenAI 账户余额
- 添加付款方式或充值
- 检查使用限额设置

#### 3. 模型访问权限
```
Error: The model does not exist or you do not have access
```
**解决方案**:
- 确认账户有权访问指定模型
- 尝试使用 `gpt-3.5-turbo` 等基础模型
- 检查 API 密钥权限设置

#### 4. 网络连接问题
```
Error: Network error or timeout
```
**解决方案**:
- 检查网络连接
- 确认防火墙设置
- 尝试使用代理（如需要）

### 演示模式

如果没有配置 API 密钥，系统会自动启用演示模式：
- 显示模拟响应
- 提供功能预览
- 不产生实际 API 费用

## 💰 API 使用限制

### 费用估算

| 功能 | 模型 | 大约费用 |
|------|------|----------|
| 文本对话 | GPT-4o-mini | $0.15/1M tokens |
| 文本对话 | GPT-4o | $2.50/1M tokens |
| 图片生成 | DALL-E 3 (1024×1024) | $0.040/image |
| 图片生成 | DALL-E 3 (1024×1792) | $0.080/image |

### 使用建议

1. **开发阶段**: 使用 `gpt-4o-mini` 降低成本
2. **生产环境**: 根据需求选择合适模型
3. **设置限额**: 在 OpenAI 平台设置月度使用限额
4. **监控使用**: 定期检查 API 使用情况

### 优化建议

```typescript
// 在 API 路由中设置合理的参数
const result = await streamText({
  model: openai('gpt-4o-mini'), // 使用成本较低的模型
  maxTokens: 1000,              // 限制响应长度
  temperature: 0.7,             // 平衡创造性和一致性
});
```

## 📚 相关文档

- [OpenAI API 文档](https://platform.openai.com/docs)
- [Vercel AI SDK 文档](https://sdk.vercel.ai/docs)
- [项目 AI 功能使用指南](./AI_FEATURES_GUIDE.md)

## 🆘 获取帮助

如果遇到问题，可以：

1. 查看 [OpenAI 状态页面](https://status.openai.com/)
2. 检查浏览器开发者工具的网络和控制台
3. 查看服务器日志输出
4. 参考 OpenAI 官方文档和社区

---

**注意**: 请妥善保管您的 API 密钥，不要将其提交到版本控制系统中。
