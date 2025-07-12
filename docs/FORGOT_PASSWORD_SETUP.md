# 忘记密码功能配置指南

本文档介绍如何配置和使用忘记密码功能。

## 功能概述

忘记密码功能已成功集成到主登录表单中，包含以下流程：

1. 用户在登录页面点击"Forgot password?"链接
2. 切换到忘记密码表单，输入邮箱地址
3. 系统生成唯一的重置token（1小时有效）
4. 发送包含重置链接的邮件到用户邮箱
5. 用户点击邮件中的链接，跳转到重置密码页面
6. 用户设置新密码
7. Token标记为已使用，防止重复使用

## 环境变量配置

在 `.env` 文件中添加以下配置：

```bash
# 基础配置
NEXT_PUBLIC_WEB_URL=http://localhost:3000
AUTH_SECRET=your_auth_secret_here

# 数据库配置
DATABASE_URL=your_database_url_here

# Resend API密钥（用于发送密码重置邮件）
RESEND_API_KEY=re_xxxxxxxxx

# 发件人邮箱地址
NEXT_PUBLIC_FROM_EMAIL=noreply@yourdomain.com
```

### 获取Resend API密钥

1. 访问 [Resend官网](https://resend.com)
2. 注册账户并登录
3. 在Dashboard中创建API密钥
4. 复制API密钥到环境变量（格式：re_xxxxxxxxx）

### 配置发件人邮箱

- 使用您拥有的域名邮箱
- 确保域名已在Resend中验证
- 建议使用 `noreply@` 前缀

## 功能特性

### 1. 集成到主登录表单

- 在密码输入框右上角显示"Forgot password?"链接
- 点击后切换到忘记密码表单
- 提供"Back to Sign In"按钮返回登录表单

### 2. 用户体验优化

- 统一的UI设计风格
- 清晰的状态反馈
- 友好的错误提示
- 成功发送后的确认信息

### 3. 安全特性

1. **Token安全**：
   - 使用加密随机生成的64字符token
   - 1小时后自动过期
   - 一次性使用，使用后立即失效

2. **邮箱枚举防护**：
   - 无论邮箱是否存在都返回相同的成功消息
   - 防止攻击者枚举系统中的邮箱地址

3. **密码强度**：
   - 要求至少8个字符
   - 前端和后端双重验证

## API端点

### 1. 忘记密码 - POST /api/password/forgot

请求体：
```json
{
  "email": "user@example.com",
  "locale": "en"
}
```

响应：
```json
{
  "success": true,
  "message": "If the email exists in our system, you will receive a password reset link shortly."
}
```

### 2. 重置密码 - POST /api/password/reset

请求体：
```json
{
  "token": "reset_token_here",
  "password": "new_password"
}
```

响应：
```json
{
  "success": true,
  "message": "Password has been reset successfully. You can now sign in with your new password."
}
```

## 页面路由

- 登录页面（包含忘记密码功能）：`/auth/signin`
- 重置密码页面：`/[locale]/auth/reset-password?token=xxx`

## 测试功能

### 1. 检查邮件配置

在开发环境中，可以访问以下端点检查配置：

```bash
GET /api/check-email-status?action=config
```

### 2. 测试邮件发送

```bash
POST /api/test-send-email
Content-Type: application/json

{
  "to": "test@example.com",
  "subject": "Test Email",
  "message": "This is a test message."
}
```

## 故障排除

### 1. 邮件发送失败

检查以下配置：
- `RESEND_API_KEY` 是否正确设置
- `NEXT_PUBLIC_FROM_EMAIL` 是否正确设置
- 域名是否在Resend中验证

### 2. 重置链接无效

检查以下问题：
- Token是否已过期（1小时有效期）
- Token是否已被使用
- 数据库连接是否正常

### 3. 页面跳转问题

确保：
- `NEXT_PUBLIC_WEB_URL` 配置正确
- 路由配置正确
- 国际化配置正常

## 开发注意事项

1. **环境变量**：确保所有必需的环境变量都已配置
2. **数据库**：确保用户表包含 `resetToken` 和 `resetTokenExpiresAt` 字段
3. **邮件模板**：支持中英文双语邮件模板
4. **错误处理**：所有API都有完善的错误处理和日志记录

## 生产环境部署

1. 确保所有环境变量在生产环境中正确配置
2. 使用真实的域名邮箱作为发件人
3. 在Resend中验证发件人域名
4. 监控邮件发送状态和错误日志
