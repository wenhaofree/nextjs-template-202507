#!/usr/bin/env node

/**
 * 调试开发环境问题的脚本
 * 检查可能导致 pnpm dev 模式下页面交互和显示问题的原因
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 调试开发环境问题...\n');

// 1. 检查 Node.js 版本
console.log('📋 环境检查:');
console.log(`   Node.js 版本: ${process.version}`);
console.log(`   平台: ${process.platform}`);
console.log(`   架构: ${process.arch}\n`);

// 2. 检查关键文件
console.log('📁 关键文件检查:');
const criticalFiles = [
  'next.config.ts',
  'package.json',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/app/[locale]/layout.tsx',
  'src/components/providers.tsx',
  '.env.local'
];

criticalFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// 3. 检查依赖版本
console.log('\n📦 关键依赖版本:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const keyDeps = [
    'next',
    'react',
    'react-dom',
    'next-themes',
    'next-intl',
    'fumadocs-ui',
    'framer-motion',
    'motion'
  ];
  
  keyDeps.forEach(dep => {
    const version = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
    console.log(`   ${dep}: ${version || '未安装'}`);
  });
} catch (error) {
  console.log('   ❌ 无法读取 package.json');
}

// 4. 检查 Turbopack 配置
console.log('\n🚀 Turbopack 配置:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const devScript = packageJson.scripts?.dev || '';
  const usesTurbopack = devScript.includes('--turbopack');
  console.log(`   使用 Turbopack: ${usesTurbopack ? '是' : '否'}`);
  console.log(`   开发脚本: ${devScript}`);
} catch (error) {
  console.log('   ❌ 无法检查 Turbopack 配置');
}

// 5. 检查 Next.js 配置
console.log('\n⚙️ Next.js 配置检查:');
try {
  const configPath = 'next.config.ts';
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');
    console.log(`   ✅ 配置文件存在`);
    console.log(`   React Strict Mode: ${configContent.includes('reactStrictMode: true') ? '启用' : '禁用'}`);
    console.log(`   实验性功能: ${configContent.includes('experimental') ? '有' : '无'}`);
  }
} catch (error) {
  console.log('   ❌ 无法读取 Next.js 配置');
}

// 6. 检查环境变量
console.log('\n🌍 环境变量检查:');
try {
  // 尝试读取 .env.local 文件
  const envPath = '.env.local';
  if (fs.existsSync(envPath)) {
    console.log('   ✅ .env.local 文件存在');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    console.log(`   📝 环境变量数量: ${envLines.length}`);
  } else {
    console.log('   ❌ .env.local 文件不存在');
  }
} catch (error) {
  console.log('   ❌ 无法检查环境变量文件');
}

// 7. 提供解决方案建议
console.log('\n💡 解决方案建议:');
console.log('');

console.log('🔧 尝试以下解决方案:');
console.log('   1. 禁用 Turbopack: 将 "next dev --turbopack" 改为 "next dev"');
console.log('   2. 清理缓存: rm -rf .next && rm -rf node_modules/.cache');
console.log('   3. 重新安装依赖: rm -rf node_modules && pnpm install');
console.log('   4. 检查浏览器控制台错误');
console.log('   5. 尝试不同的浏览器或无痕模式');
console.log('');

console.log('🚀 测试命令:');
console.log('   pnpm dev          # 不使用 Turbopack');
console.log('   pnpm dev:turbo    # 使用 Turbopack');
console.log('   pnpm build        # 构建生产版本');
console.log('   pnpm start        # 启动生产服务器');
console.log('');

console.log('📊 性能对比建议:');
console.log('   1. 在两种模式下测试相同页面');
console.log('   2. 检查网络面板的资源加载');
console.log('   3. 查看控制台的错误和警告');
console.log('   4. 测试页面交互功能');
