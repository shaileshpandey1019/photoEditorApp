#!/bin/bash

echo "🧹 清理缓存和进程..."

# 停止所有 Expo 进程
pkill -f "expo" 2>/dev/null || true

# 清除缓存
rm -rf .expo .expo-shared node_modules/.cache

echo "✅ 缓存已清除"
echo ""
echo "🚀 启动 Expo 开发服务器..."
echo ""
echo "使用以下命令之一："
echo "  按 'a' - 打开 Android"
echo "  按 'i' - 打开 iOS 模拟器"
echo "  按 'w' - 在浏览器中打开"
echo ""

# 启动 Expo
npx expo start --port 8082 --clear