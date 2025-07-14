# GitHub 邀请逻辑测试指南

## 测试目标
验证已经邀请成功的订单不可以再次发送邀请，订单对应状态要修改正确。

## 测试准备

### 1. 数据库准备
确保有以下测试数据：

```sql
-- 已激活但未发送邀请的订单
INSERT INTO "Order" (order_no, user_uuid, user_email, amount, status, product_name, order_detail) 
VALUES ('TEST-001', 'user-uuid', 'test@example.com', 2999, 'activated', 'Pro Plan', '{}');

-- 已激活且已发送邀请的订单
INSERT INTO "Order" (order_no, user_uuid, user_email, amount, status, product_name, order_detail) 
VALUES ('TEST-002', 'user-uuid', 'test@example.com', 2999, 'activated', 'Pro Plan', 
'{"githubUsername": "testuser", "repositoryName": "shipsaas-starter", "invitationSentAt": "2024-01-15T10:30:00.000Z"}');
```

## 前端测试

### 测试1: 未发送邀请的订单
1. 登录系统
2. 访问 `/dashboard/billing` 页面
3. 找到订单 `TEST-001`
4. 验证显示：
   - ✅ 蓝色 "Send GitHub Invitation" 按钮
   - ✅ 提示文字："Click 'Send GitHub Invitation' to get access to the repository."

### 测试2: 已发送邀请的订单
1. 在同一页面找到订单 `TEST-002`
2. 验证显示：
   - ✅ 灰色禁用的 "Invitation Sent" 按钮
   - ✅ GitHub用户名：`testuser`
   - ✅ 仓库名：`shipsaasnet/shipsaas-starter`
   - ✅ 发送时间：`Jan 15, 2024 10:30`
   - ✅ 绿色成功状态："✅ GitHub invitation sent: ..."

### 测试3: 发送邀请流程
1. 点击订单 `TEST-001` 的 "Send GitHub Invitation" 按钮
2. 在弹窗中输入GitHub用户名
3. 点击发送
4. 验证：
   - ✅ 邀请发送成功
   - ✅ 按钮立即变为灰色禁用状态
   - ✅ 显示GitHub信息和发送时间
   - ✅ 无需刷新页面

## API测试

### 测试4: API防重复发送
使用以下curl命令测试：

```bash
# 对已发送邀请的订单再次发送邀请
curl -X POST http://localhost:3000/api/github/invite \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "orderNo": "TEST-002",
    "githubUsername": "anotheruser"
  }'
```

期望响应：
```json
{
  "error": "GitHub invitation has already been sent for this order",
  "alreadySent": true,
  "sentAt": "2024-01-15T10:30:00.000Z",
  "githubUsername": "testuser",
  "repositoryName": "shipsaas-starter"
}
```

### 测试5: 正常发送邀请
```bash
# 对未发送邀请的订单发送邀请
curl -X POST http://localhost:3000/api/github/invite \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -d '{
    "orderNo": "TEST-001",
    "githubUsername": "newuser"
  }'
```

期望响应：
```json
{
  "success": true,
  "message": "GitHub invitation sent successfully",
  "invitationUrl": "https://github.com/shipsaasnet/shipsaas-starter/invitations",
  "repositoryName": "shipsaas-starter"
}
```

## 数据库验证

### 测试6: 数据库状态检查
发送邀请后，检查数据库中的订单详情：

```sql
SELECT order_no, order_detail FROM "Order" WHERE order_no = 'TEST-001';
```

期望结果：
```json
{
  "githubUsername": "newuser",
  "repositoryName": "shipsaas-starter", 
  "invitationSentAt": "2024-01-15T12:00:00.000Z"
}
```

## 边界情况测试

### 测试7: 无效订单状态
尝试对未激活的订单发送邀请，应该返回错误。

### 测试8: 无效GitHub用户名
尝试使用无效的GitHub用户名格式，应该返回验证错误。

### 测试9: 网络错误处理
模拟GitHub API错误，验证错误处理是否正确。

## 测试通过标准

- ✅ 已发送邀请的订单不能再次发送邀请
- ✅ 前端UI正确显示邀请状态
- ✅ API层面正确阻止重复发送
- ✅ 数据库状态正确更新
- ✅ 错误处理完善
- ✅ 用户体验流畅

## 回归测试

确保修改不影响现有功能：
- ✅ 订单激活流程正常
- ✅ 其他订单状态显示正常
- ✅ 页面加载性能无影响
- ✅ 国际化文本正常显示
