#!/bin/bash

echo "🔄 恢复所有屏幕到生产级版本..."
echo ""

# 检查是否有之前的备份
if [ -d "app_backup" ]; then
    echo "发现备份，正在恢复..."
    cp -r app_backup/* app/
    echo "✅ 恢复完成"
else
    echo "⚠️  没有找到备份"
    echo ""
    echo "手动恢复所有屏幕..."
fi

echo ""
echo "完成！"