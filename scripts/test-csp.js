#!/usr/bin/env node

/**
 * CSP 测试脚本
 * 用于验证 Content Security Policy 配置是否正确
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔒 CSP 配置测试开始...\n');

// 1. 检查 next.config.ts 中的 CSP 配置
console.log('📋 检查 CSP 配置:');
try {
  const configPath = path.join(process.cwd(), 'next.config.ts');
  const configContent = fs.readFileSync(configPath, 'utf8');
  
  if (configContent.includes('Content-Security-Policy')) {
    console.log('   ✅ CSP 配置已找到');
    
    // 检查开发环境配置
    if (configContent.includes("process.env.NODE_ENV === 'development'")) {
      console.log('   ✅ 开发环境 CSP 配置已找到');
    } else {
      console.log('   ⚠️ 开发环境 CSP 配置未找到');
    }
    
    // 检查是否包含 unsafe-eval
    if (configContent.includes("'unsafe-eval'")) {
      console.log('   ✅ 开发环境允许 unsafe-eval');
    } else {
      console.log('   ⚠️ 未找到 unsafe-eval 配置');
    }
  } else {
    console.log('   ❌ CSP 配置未找到');
  }
} catch (error) {
  console.log('   ❌ 读取配置文件失败:', error.message);
}

// 2. 检查代码中是否还有 eval() 使用
console.log('\n🔍 检查代码中的 eval() 使用:');
try {
  const srcPath = path.join(process.cwd(), 'src');
  
  // 搜索 eval() 使用 (排除注释)
  try {
    const result = execSync(`grep -r "eval(" ${srcPath} --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" | grep -v "//.*eval(" | grep -v "/\\*.*eval("`, { encoding: 'utf8' });
    if (result.trim()) {
      console.log('   ⚠️ 发现 eval() 使用:');
      console.log(result.trim().split('\n').map(line => `      ${line}`).join('\n'));
    }
  } catch (grepError) {
    // grep 没有找到匹配项时会返回非零退出码
    if (grepError.status === 1) {
      console.log('   ✅ 未发现 eval() 使用');
    } else {
      console.log('   ⚠️ 搜索过程中出现错误');
    }
  }
  
  // 搜索 new Function() 使用
  try {
    const result = execSync(`grep -r "new Function" ${srcPath} --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"`, { encoding: 'utf8' });
    if (result.trim()) {
      console.log('   ⚠️ 发现 new Function() 使用:');
      console.log(result.trim().split('\n').map(line => `      ${line}`).join('\n'));
    }
  } catch (grepError) {
    if (grepError.status === 1) {
      console.log('   ✅ 未发现 new Function() 使用');
    } else {
      console.log('   ⚠️ 搜索过程中出现错误');
    }
  }
} catch (error) {
  console.log('   ❌ 代码检查失败:', error.message);
}

// 3. 检查构建是否成功
console.log('\n🏗️ 测试构建过程:');
try {
  console.log('   正在构建...');
  execSync('npm run build', { stdio: 'pipe' });
  console.log('   ✅ 构建成功');
} catch (error) {
  console.log('   ❌ 构建失败');
  console.log('   错误信息:', error.message);
}

// 4. 检查特定文件的安全性
console.log('\n🔐 检查关键文件安全性:');
const criticalFiles = [
  'src/app/api/chat/route.ts',
  'src/components/seo/web-vitals.tsx',
  'src/lib/performance.ts'
];

criticalFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`   📄 ${file}:`);
    
    // 检查 eval (排除注释)
    const lines = content.split('\n');
    const hasEval = lines.some(line => {
      const trimmed = line.trim();
      return trimmed.includes('eval(') && !trimmed.startsWith('//') && !trimmed.startsWith('*');
    });

    if (hasEval) {
      console.log('      ⚠️ 包含 eval() 调用');
    } else {
      console.log('      ✅ 无 eval() 调用');
    }
    
    // 检查 Function 构造函数
    if (content.includes('new Function(')) {
      console.log('      ⚠️ 包含 Function 构造函数');
    } else {
      console.log('      ✅ 无 Function 构造函数');
    }
    
    // 检查 setTimeout/setInterval 字符串参数
    if (content.match(/setTimeout\s*\(\s*["'`]/) || content.match(/setInterval\s*\(\s*["'`]/)) {
      console.log('      ⚠️ 包含字符串形式的 setTimeout/setInterval');
    } else {
      console.log('      ✅ 无字符串形式的 setTimeout/setInterval');
    }
  } else {
    console.log(`   📄 ${file}: 文件不存在`);
  }
});

console.log('\n✅ CSP 配置测试完成!');
console.log('\n📝 建议:');
console.log('   1. 在开发环境中，CSP 允许 unsafe-eval 以支持热重载');
console.log('   2. 在生产环境中，CSP 不允许 unsafe-eval 以提高安全性');
console.log('   3. 所有动态代码执行都应该使用安全的替代方案');
console.log('   4. 定期运行此脚本以确保代码安全性');
