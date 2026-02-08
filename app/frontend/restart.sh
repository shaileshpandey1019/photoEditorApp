#!/bin/bash

echo "🧹 清理并重启 Expo..."
echo ""

# 停止所有 Expo 进程
echo "1. 停止所有 Expo 进程..."
pkill -f "expo" 2>/dev/null || true
sleep 2
echo "   ✅ 进程已停止"
echo ""

# 清除缓存
echo "2. 清除缓存..."
rm -rf .expo .expo-shared node_modules/.cache 2>/dev/null || true
echo "   ✅ 缓存已清除"
echo ""

# 检查端口
echo "3. 检查端口 8081..."
if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "   ⚠️  端口 8081 被占用，尝试释放..."
    lsof -ti:8081 | xargs kill -9 2>/dev/null || true
    sleep 1
fi
echo "   ✅ 端口 8081 可用"
echo ""

# 启动 Expo
echo "4. 启动 Expo 开发服务器..."
echo ""
echo "🚀 正在启动..."
echo ""
echo "等待 Metro bundler 启动..."
echo ""

# 启动 Expo 并在后台运行
npx expo start --clear 2>&1 &
EXPO_PID=$!

# 等待服务器启动
echo "等待中..."
for i in {1..60}; do
    if curl -s http://localhost:8081 > /dev/null 2>&1; then
        echo ""
        echo "✅ Expo 开发服务器已启动！"
        echo ""
        echo "使用以下命令之一："
        echo "  按 'a' - 打开 Android"
        echo "  按 'i' - 打开 iOS 模拟器"
        echo "  按 'w' - 在浏览器中打开"
        echo ""
        echo "进程 ID: $EXPO_PID"
        echo ""
        echo "按 Ctrl+C 停止服务器"
        echo ""

        # 等待用户输入
        wait $EXPO_PID
        break
    fi
    sleep 1
    echo -n "."
done

if [ $i -eq 60 ]; then
    echo ""
    echo "❌ 启动超时，请检查日志"
    kill $EXPO_PID 2>/dev/null
    exit 1
fi