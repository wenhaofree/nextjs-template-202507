# 中国支付方式生产环境配置指南

## 🎯 概述

支付宝支付和微信支付已集成到 ShipSaaS 项目中，支持中国地区用户使用这两种流行的支付方式。本文档介绍生产环境的配置要求。

## ✅ 已完成的功能

### 1. 智能地区检测
- **中文页面** (`/zh/*`) 自动启用支付宝支付
- **英文页面** (`/en/*`) 仅显示信用卡支付
- 根据用户语言偏好自动选择合适的支付方式

### 2. 货币支持
- **CNY (人民币)** - 中国地区推荐
- **USD (美元)** - 全球通用
- **EUR, GBP, HKD, SGD** - 其他支持货币

### 3. 支付流程
- 用户在中文定价页面点击 "Get Started"
- 自动跳转到 Stripe 支付页面
- 显示信用卡、支付宝和微信支付三种支付选项
- 支付成功后跳转到账单页面

## 🔧 生产环境配置

### 1. Stripe Dashboard 配置

#### 启用支付宝和微信支付
1. 登录 [Stripe Dashboard](https://dashboard.stripe.com)
2. 进入 **Settings** → **Payment methods**
3. 找到 **Alipay** 并点击 **Enable** 启用支付宝
4. 找到 **WeChat Pay** 并点击 **Enable** 启用微信支付
5. 确认两个支付方式状态都显示为 **Active**

#### 验证账户能力
1. 进入 **Settings** → **Account details**
2. 检查 **Capabilities** 部分
3. 确认 `alipay_payments` 状态为 **active**
4. 确认 `wechat_pay_payments` 状态为 **active**

#### 微信支付特殊配置
⚠️ **重要**：微信支付需要在代码中设置特殊配置：
- 必须在 `payment_method_options` 中设置 `wechat_pay.client = 'web'`
- 这是 Stripe 微信支付的必需配置，否则会报错
- 已在代码中自动处理，无需手动配置

### 2. 环境变量配置

确保以下环境变量已正确配置：

```bash
# Stripe 配置
STRIPE_PRIVATE_KEY=sk_live_...  # 生产环境密钥
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...  # 生产环境公钥

# 应用配置
NEXTAUTH_URL=https://yourdomain.com
```

### 3. 支持的地区和货币

| 地区 | 货币 | 支付方式 |
|------|------|----------|
| 中国 (zh) | CNY | 信用卡 + 支付宝 + 微信支付 |
| 香港 (hk) | HKD | 信用卡 + 支付宝 |
| 新加坡 (sg) | SGD | 信用卡 + 支付宝 |
| 马来西亚 (my) | MYR | 信用卡 + 支付宝 |
| 全球 (global) | USD | 信用卡 |

## 📋 测试清单

### 部署前检查

- [ ] Stripe Dashboard 中支付宝已启用
- [ ] Stripe Dashboard 中微信支付已启用
- [ ] 账户 `alipay_payments` capability 为 active
- [ ] 账户 `wechat_pay_payments` capability 为 active
- [ ] 生产环境 API 密钥已配置
- [ ] 域名和回调 URL 已设置
- [ ] SSL 证书已配置

### 功能测试

- [ ] 中文页面显示支付宝和微信支付选项
- [ ] 英文页面仅显示信用卡
- [ ] 价格正确转换为对应货币
- [ ] 支付成功后正确跳转
- [ ] 订单记录正确创建

## 🚀 部署步骤

### 1. 更新环境变量
```bash
# 更新生产环境配置
STRIPE_PRIVATE_KEY=sk_live_your_production_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_your_production_key
```

### 2. 构建和部署
```bash
# 构建项目
pnpm run build

# 部署到生产环境
# (根据你的部署平台执行相应命令)
```

### 3. 验证部署
1. 访问 `https://yourdomain.com/zh/pricing`
2. 点击任意 "Get Started" 按钮
3. 验证 Stripe 支付页面显示支付宝和微信支付选项
4. 测试完整支付流程

## 🔍 故障排除

### 支付宝或微信支付选项不显示
1. 检查 Stripe Dashboard 配置
2. 验证账户 capability 状态
3. 确认使用正确的 API 密钥
4. 检查地区和货币设置

### 支付失败
1. 查看 Stripe Dashboard 日志
2. 检查服务器错误日志
3. 验证回调 URL 配置
4. 确认 SSL 证书有效

## 📊 监控和分析

### 关键指标
- 支付成功率
- 支付方式使用分布
- 地区转化率
- 错误率和类型

### 日志监控
- Stripe API 调用日志
- 支付会话创建日志
- 订单创建日志
- 错误和异常日志

## 🆘 支持资源

- **Stripe 文档**: https://docs.stripe.com/payments/alipay
- **Stripe 支持**: https://support.stripe.com
- **项目文档**: `/docs` 目录

## 📝 更新日志

- **v1.0.0** - 初始支付宝支付集成
- **v1.1.0** - 优化地区检测和货币转换
- **v1.2.0** - 移除测试代码，优化生产环境配置
- **v1.3.0** - 添加微信支付支持，完善中国地区支付方式
- **v1.3.1** - 修复微信支付配置问题，添加 `payment_method_options.wechat_pay.client = 'web'` 配置
