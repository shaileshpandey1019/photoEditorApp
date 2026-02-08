#!/bin/bash

echo "================================"
echo "诊断 Expo 运行时问题"
echo "================================"
echo ""

# 检查 Node.js
echo "1. 检查 Node.js 版本..."
node --version || echo "❌ Node.js 未安装"
echo ""

# 检查 npm
echo "2. 检查 npm 版本..."
npm --version || echo "❌ npm 未安装"
echo ""

# 检查 Expo CLI
echo "3. 检查 Expo CLI..."
npx expo --version || echo "❌ Expo CLI 未安装"
echo ""

# 检查依赖
echo "4. 检查 node_modules..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules 存在"
    echo "   包数量: $(ls node_modules | wc -l)"
else
    echo "❌ node_modules 不存在"
fi
echo ""

# 检查关键依赖
echo "5. 检查关键依赖..."
for pkg in expo react react-native expo-router expo-splash-screen; do
    if [ -d "node_modules/$pkg" ]; then
        version=$(cat node_modules/$pkg/package.json | grep '"version"' | head -1 | cut -d'"' -f4)
        echo "✅ $pkg: $version"
    else
        echo "❌ $pkg 未安装"
    fi
done
echo ""

# 检查 app 目录
echo "6. 检查 app 目录..."
if [ -d "app" ]; then
    echo "✅ app 目录存在"
    echo "   文件:"
    ls -la app/*.tsx 2>/dev/null | awk '{print "     " $9}' || echo "     (无 .tsx 文件)"
else
    echo "❌ app 目录不存在"
fi
echo ""

# 检查配置文件
echo "7. 检查配置文件..."
for file in app.json package.json tsconfig.json babel.config.js; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file 不存在"
    fi
done
echo ""

# 检查端口占用
echo "8. 检查端口占用..."
for port in 8081 8082 8083; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  端口 $port 被占用"
    else
        echo "✅ 端口 $port 可用"
    fi
done
echo ""

# 检查缓存
echo "9. 检查缓存目录..."
for dir in .expo .expo-shared node_modules/.cache; do
    if [ -d "$dir" ]; then
        echo "⚠️  $dir 存在 (可能需要清除)"
    else
        echo "✅ $dir 不存在"
    fi
done
echo ""

echo "================================"
echo "诊断完成"
echo "================================"
echo ""
echo "建议操作："
echo "1. 如果有依赖缺失: npm install"
echo "2. 如果有缓存问题: rm -rf .expo .expo-shared node_modules/.cache"
echo "3. 如果端口被占用: pkill -f 'expo' 或使用不同端口"
echo ""