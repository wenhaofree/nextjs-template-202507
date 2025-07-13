# GitHub Repository Integration Guide

## 概述 / Overview

本文档介绍如何配置和使用 ShipSaaS 项目中的 GitHub 仓库邀请功能。该功能允许在用户购买产品后，自动向其发送 GitHub 私有仓库的访问邀请。

This document explains how to configure and use the GitHub repository invitation feature in the ShipSaaS project. This feature allows automatic sending of GitHub private repository access invitations after users purchase products.

## 功能特性 / Features

- ✅ 自动 GitHub 仓库邀请发送
- ✅ 多产品计划支持（Basic、Standard、Premium）
- ✅ 权限验证和错误处理
- ✅ 用户友好的邀请界面
- ✅ 实时状态更新
- ✅ 演示页面用于测试

## 配置步骤 / Configuration Steps

### 1. 创建 GitHub Personal Access Token

1. 访问 [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 设置 Token 名称，如: "ShipSaaS Repository Access"
4. 选择过期时间（建议选择 "No expiration" 或较长时间）
5. 选择以下权限范围 (Scopes):
   - ✅ **repo** (完整的仓库访问权限)
     - repo:status
     - repo_deployment  
     - public_repo
     - repo:invite
   - ✅ **admin:org** (如果仓库属于组织，需要组织管理权限)
     - write:org
     - read:org

6. 点击 "Generate token" 生成 Token
7. 复制生成的 Token

### 2. 环境变量配置

在 `.env.local` 文件中添加以下配置：

```bash
# GitHub API Token for repository access
GITHUB_API_TOKEN=your_github_token_here
```

### 3. 仓库映射配置

系统支持以下产品计划到仓库的映射：

- **Basic Plan** → `nextjs-template-basic`
- **Standard Plan** → `nextjs-template-standard`  
- **Premium Plan** → `nextjs-template-premium`

确保这些仓库存在于您的 GitHub 组织中，并且 Token 所有者有管理权限。

## 使用方法 / Usage

### 1. 订单激活流程

1. 用户在 Dashboard > Billing 页面查看已支付订单
2. 点击 "Activate Order" 按钮激活订单
3. 系统自动弹出 GitHub 邀请弹窗
4. 用户输入 GitHub 用户名
5. 系统发送仓库邀请

### 2. 手动发送邀请

如果需要重新发送邀请，可以：

1. 在 Billing 页面找到已激活的订单
2. 点击 "Send GitHub Invitation" 按钮
3. 输入 GitHub 用户名并发送

### 3. 演示页面测试

访问 `/demo/github-invite` 页面可以：

- 测试 GitHub Token 配置
- 检查权限和连接状态
- 手动发送测试邀请
- 查看详细的错误信息

## API 接口 / API Endpoints

### 权限检查 API

```http
GET /api/github/check-permissions
```

**响应示例:**
```json
{
  "tokenConfigured": true,
  "user": {
    "login": "your-username",
    "id": 12345
  },
  "scopes": ["repo", "admin:org"],
  "rateLimit": {
    "limit": 5000,
    "remaining": 4999
  }
}
```

### 发送邀请 API

```http
POST /api/github/invite
Content-Type: application/json

{
  "orderNo": "ORDER_123",
  "githubUsername": "target-username"
}
```

**响应示例:**
```json
{
  "success": true,
  "message": "GitHub invitation sent successfully",
  "repositoryName": "nextjs-template-basic",
  "invitationUrl": "https://github.com/ShipSaaSCo/nextjs-template-basic/invitations"
}
```

## 故障排除 / Troubleshooting

### 常见错误及解决方案

#### 1. Token 配置错误

**错误:** `GitHub API token is not configured`

**解决方案:**
- 检查 `.env.local` 文件中的 `GITHUB_API_TOKEN` 是否正确设置
- 确保 Token 没有过期
- 重启开发服务器

#### 2. 权限不足

**错误:** `Insufficient permissions to invite users`

**解决方案:**
- 确保 Token 包含 `repo` 和 `admin:org` 权限
- 确保 Token 所有者是目标仓库的管理员或所有者
- 重新生成具有正确权限的 Token

#### 3. 用户不存在

**错误:** `GitHub user not found`

**解决方案:**
- 检查 GitHub 用户名拼写是否正确
- 确认用户名区分大小写
- 确认目标用户的 GitHub 账户存在且活跃

#### 4. 仓库不存在

**错误:** `Repository not found`

**解决方案:**
- 确认仓库名称映射是否正确
- 检查仓库是否存在于指定的组织中
- 确认 Token 所有者有访问该仓库的权限

#### 5. 邀请已存在

**错误:** `User already has access or invitation pending`

**解决方案:**
- 检查用户是否已经是仓库的协作者
- 查看 GitHub 仓库的 Settings > Manage access 页面
- 如有待处理的邀请，可以重新发送或取消后重新邀请

### 调试工具

1. **演示页面:** 访问 `/demo/github-invite` 进行功能测试
2. **权限检查:** 使用权限检查 API 验证 Token 状态
3. **浏览器控制台:** 查看详细的错误日志
4. **GitHub 通知:** 检查 GitHub 通知页面确认邀请状态

## 安全注意事项 / Security Notes

1. **Token 安全:**
   - 不要在代码中硬编码 Token
   - 定期轮换 Token
   - 使用最小权限原则

2. **访问控制:**
   - 仅向已验证的用户发送邀请
   - 记录所有邀请操作的日志
   - 定期审查仓库访问权限

3. **错误处理:**
   - 不要在客户端暴露敏感的错误信息
   - 记录详细的服务器端日志
   - 实现适当的重试机制

## 开发指南 / Development Guide

### 添加新的产品计划

1. 在 `src/app/api/github/invite/route.ts` 中更新 `getRepositoryName` 函数
2. 确保对应的 GitHub 仓库存在
3. 更新文档中的仓库映射说明

### 自定义邀请逻辑

可以在 `src/app/api/github/invite/route.ts` 中自定义：
- 邀请验证逻辑
- 错误处理机制
- 日志记录格式
- 响应消息内容

### 扩展功能

- 添加邀请过期时间管理
- 实现批量邀请功能
- 集成 Webhook 处理邀请状态变化
- 添加邀请统计和分析功能

## 支持 / Support

如果遇到问题，请：

1. 查看本文档的故障排除部分
2. 使用演示页面进行功能测试
3. 检查服务器日志和浏览器控制台
4. 联系技术支持团队

---

**版本:** 1.0.0  
**更新时间:** 2024-01-01  
**维护者:** ShipSaaS.CO
