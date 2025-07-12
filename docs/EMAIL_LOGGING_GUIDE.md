# 邮件发送日志监控指南

## 📊 概述

参考 shipsaas-office 项目，我们增强了邮件发送的日志记录功能，确保能够准确确认邮件是否发送成功。

## 🔍 日志级别和内容

### 1. 发送前日志
```
📧 Attempting to send password reset email...
   📍 To: user@example.com
   📍 From: noreply@yourdomain.com
   📍 Subject: Reset Your Password
   📍 Locale: en
   📍 API Key: Set (***1234)
```

### 2. API响应日志
```
📊 Resend API Response (245ms):
   📧 Data: {
     "id": "re_123456789",
     "from": "noreply@yourdomain.com",
     "to": ["user@example.com"],
     "created_at": "2025-07-12T06:00:00.000Z"
   }
   📧 Error: null
```

### 3. 成功发送日志
```
✅ Password reset email sent successfully!
   📧 Email ID: re_123456789
   📧 To: user@example.com
   📧 Subject: Reset Your Password
   📧 Duration: 245ms
   📧 Timestamp: 2025-07-12T06:00:00.000Z
   📧 Full response: { ... }
```

### 4. 详细的邮件尝试日志
```
📊 ===== EMAIL ATTEMPT LOG =====
   📧 Type: password-reset
   📧 To: user@example.com
   📧 Status: ✅ SUCCESS
   📧 Timestamp: 2025-07-12T06:00:00.000Z
   ✅ Message ID: re_123456789
   ⏱️ Duration: 245ms
   🌐 Locale: en
   📋 Full Resend Response: { ... }
📊 ===== END EMAIL LOG =====
```

### 5. 失败情况日志
```
❌ Failed to send password reset email:
   📧 Error details: {
     "message": "Invalid API key",
     "name": "ResendError"
   }
   📧 Error type: object
   📧 Error message: Invalid API key
   📧 Status code: 401
   📧 Error name: ResendError
```

## 🧪 测试工具

### 1. 交互式测试脚本
```bash
node scripts/test-password-reset-email.js
```

功能：
- 检查开发服务器状态
- 交互式输入邮箱和语言
- 实时显示详细的发送日志
- 提供故障排除建议

### 2. API测试端点
```bash
curl -X POST http://localhost:3000/api/test-password-reset-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","locale":"en"}'
```

功能：
- 完整的邮件发送流程测试
- 详细的步骤日志记录
- 错误诊断和报告

### 3. 生产环境测试
```bash
curl -X POST http://localhost:3000/api/password/forgot \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 📋 日志监控检查清单

### ✅ 成功发送的标志
1. **API响应包含 data.id**
   ```
   📧 Data: { "id": "re_123456789", ... }
   ```

2. **成功日志出现**
   ```
   ✅ Password reset email sent successfully!
   ```

3. **邮件尝试日志显示成功**
   ```
   📧 Status: ✅ SUCCESS
   ✅ Message ID: re_123456789
   ```

### ❌ 失败发送的标志
1. **API响应包含错误**
   ```
   📧 Error: { "message": "...", ... }
   ```

2. **失败日志出现**
   ```
   ❌ Failed to send password reset email:
   ```

3. **邮件尝试日志显示失败**
   ```
   📧 Status: ❌ FAILED
   ❌ Error: Invalid API key
   ```

## 🔧 常见问题诊断

### 1. API密钥问题
**症状**:
```
❌ Error message: Invalid API key
🔢 Status Code: 401
```

**解决方案**:
- 检查 `RESEND_API_KEY` 环境变量
- 确认API密钥格式正确（以 `re_` 开头）
- 验证API密钥在Resend控制台中有效

### 2. 发件人邮箱问题
**症状**:
```
❌ Error message: Domain not verified
🔢 Status Code: 403
```

**解决方案**:
- 检查 `NEXT_PUBLIC_FROM_EMAIL` 环境变量
- 在Resend中验证发件人域名
- 使用已验证的邮箱地址

### 3. 网络连接问题
**症状**:
```
💥 Critical error sending password reset email:
   📧 Error: fetch failed
```

**解决方案**:
- 检查网络连接
- 验证Resend API服务状态
- 检查防火墙设置

### 4. 数据库连接问题
**症状**:
```
❌ Failed to generate token: Database connection failed
```

**解决方案**:
- 检查 `DATABASE_URL` 环境变量
- 确认数据库服务运行正常
- 运行数据库迁移

## 📊 日志分析

### 性能监控
- **正常响应时间**: 200-500ms
- **慢响应警告**: >1000ms
- **超时错误**: >5000ms

### 成功率监控
- **目标成功率**: >95%
- **警告阈值**: <90%
- **严重阈值**: <80%

### 错误模式识别
1. **间歇性失败**: 网络问题
2. **持续401错误**: API密钥问题
3. **持续403错误**: 域名验证问题
4. **超时错误**: 服务器性能问题

## 🚀 生产环境建议

1. **日志聚合**: 将日志发送到集中式日志服务
2. **监控告警**: 设置邮件发送失败率告警
3. **性能追踪**: 监控邮件发送响应时间
4. **错误报告**: 自动报告关键错误到错误追踪服务

## 📚 相关文档

- [忘记密码功能配置指南](./FORGOT_PASSWORD_SETUP.md)
- [故障排除指南](./TROUBLESHOOTING_EMAIL_ERROR.md)
- [问题解决总结](./PROBLEM_RESOLUTION_SUMMARY.md)
