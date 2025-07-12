# 解决 "Unexpected token 'E'" 错误指南

## 问题描述

在使用忘记密码功能时遇到错误：
```
Error: Unexpected token 'E', "Error: Thi"... is not valid JSON
```

这个错误通常表示前端尝试解析一个非JSON格式的响应（比如HTML错误页面）。

## 诊断步骤

### 1. 检查环境变量配置

运行诊断脚本：
```bash
node scripts/debug-email-issue.js
```

确保以下环境变量已正确设置：
- `RESEND_API_KEY` - Resend API密钥（格式：re_xxxxxxxxx）
- `NEXT_PUBLIC_FROM_EMAIL` - 发件人邮箱
- `DATABASE_URL` - 数据库连接字符串
- `AUTH_SECRET` - 认证密钥

### 2. 创建环境变量文件

如果没有 `.env.local` 文件，请创建：
```bash
cp .env.local.example .env.local
```

然后编辑 `.env.local` 文件，填入真实的配置值。

### 3. 测试API端点

使用测试API检查系统状态：
```bash
curl -X POST http://localhost:3000/api/test-forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 4. 检查浏览器网络面板

1. 打开浏览器开发者工具
2. 切换到 Network 标签
3. 尝试使用忘记密码功能
4. 查看 `/api/password/forgot` 请求的响应

## 常见原因和解决方案

### 1. 环境变量未设置

**症状**: API返回500错误，提示邮件服务未配置

**解决方案**:
```bash
# 在 .env.local 中添加
RESEND_API_KEY=re_your_api_key_here
NEXT_PUBLIC_FROM_EMAIL=noreply@yourdomain.com
```

### 2. Resend API密钥无效

**症状**: API调用失败，返回认证错误

**解决方案**:
1. 访问 [Resend Dashboard](https://resend.com/api-keys)
2. 创建新的API密钥
3. 确保密钥格式正确（以 `re_` 开头）

### 3. 发件人邮箱未验证

**症状**: 邮件发送失败，返回域名验证错误

**解决方案**:
1. 在Resend中验证您的域名
2. 或使用Resend提供的测试域名（仅开发环境）

### 4. 数据库连接问题

**症状**: API返回数据库错误

**解决方案**:
1. 检查 `DATABASE_URL` 是否正确
2. 确保数据库服务正在运行
3. 运行数据库迁移：`npx prisma db push`

### 5. 前端JSON解析错误

**症状**: 前端显示 "Unexpected token" 错误

**解决方案**: 已在代码中修复，增加了错误处理逻辑

## 测试流程

### 1. 基础配置测试
```bash
# 检查环境变量
node scripts/debug-email-issue.js

# 测试API端点
curl -X POST http://localhost:3000/api/test-forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 2. 完整功能测试
```bash
# 启动开发服务器
npm run dev

# 访问登录页面
open http://localhost:3000/auth/signin

# 点击 "Forgot password?" 链接
# 输入邮箱地址测试
```

### 3. 邮件发送测试
```bash
# 使用测试邮件API
curl -X POST http://localhost:3000/api/test-send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"your-email@example.com","subject":"Test","message":"Test message"}'
```

## 日志检查

查看服务器控制台输出，寻找以下信息：
- `📧 Attempting to send password reset email...`
- `✅ Password reset email sent successfully!`
- `❌ Failed to send password reset email:`

## 获取帮助

如果问题仍然存在：

1. 检查服务器控制台的完整错误日志
2. 查看浏览器网络面板的API响应
3. 确认所有环境变量都已正确设置
4. 验证Resend账户状态和API配额

## 相关文档

- [忘记密码功能配置指南](./FORGOT_PASSWORD_SETUP.md)
- [Resend官方文档](https://resend.com/docs)
- [Next.js API路由文档](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
