# 启动画面问题排查指南

## 问题描述
应用卡在启动画面，无法进入主屏幕。

## 已实施的修复方案

### 1. ✅ 更新 app.json 配置
- 添加了 `expo-splash-screen` 插件配置
- 配置了正确的启动画面参数

### 2. ✅ 更新 _layout.tsx
- 添加了 `appIsReady` 状态管理
- 实现了启动画面自动隐藏逻辑
- 添加了错误处理和日志

## 立即执行的修复步骤

### 步骤 1：清除缓存并重启
```bash
# 停止当前运行的应用（Ctrl+C）

# 清除 Expo 缓存
npx expo start -c

# 如果上述命令不行，尝试完全清除
rm -rf node_modules
rm -rf .expo
rm -rf .expo-shared
npm install
npx expo start -c
```

### 步骤 2：检查启动画面资源
确保以下文件存在于 `app/frontend/assets/` 目录：
- ✅ `splash.png` - 启动画面图片
- ✅ `icon.png` - 应用图标
- ✅ `adaptive-icon.png` - Android 自适应图标
- ✅ `favicon.png` - Web 图标

### 步骤 3：重建原生代码（如果需要）
```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

### 步骤 4：检查日志
```bash
# 启动应用并查看日志
npx expo start

# 查看是否有以下错误：
# - "Error hiding splash screen"
# - "Error preparing app"
# - 任何与 expo-splash-screen 相关的错误
```

## 代码检查清单

### app.json 配置
```json
{
  "expo": {
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/splash.png",
          "imageWidth": 200,
          "imageHeight": 200,
          "backgroundColor": "#ffffff"
        }
      ],
      // ... 其他插件
    ]
  }
}
```

### _layout.tsx 关键代码
```typescript
import * as SplashScreen from 'expo-splash-screen';

// 防止自动隐藏
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  
  useEffect(() => {
    async function prepare() {
      try {
        // 准备应用资源
        await new Promise(resolve => setTimeout(resolve, 100));
        setAppIsReady(true);
      } catch (e) {
        console.warn('Error preparing app:', e);
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  // ... 返回 UI
}
```

## 常见问题及解决方案

### 问题 1：启动画面图片损坏
**症状**：启动画面显示异常或卡住
**解决**：
- 确保 `splash.png` 是有效的 PNG 文件
- 建议尺寸：1284x2778（iPhone X/11/12 Pro Max）
- 最大文件大小：< 1MB

### 问题 2：expo-splash-screen 未正确安装
**症状**：控制台显示模块未找到错误
**解决**：
```bash
npm install expo-splash-screen
npx expo install --fix
```

### 问题 3：依赖版本冲突
**症状**：各种奇怪的运行时错误
**解决**：
```bash
npm install
npx expo doctor
```

### 问题 4：Android 原生配置问题
**症状**：只在 Android 上卡住
**解决**：
```bash
# 清除 Android 缓存
npx expo run:android --variant=release
# 或
cd android && ./gradlew clean && cd ..
```

### 问题 5：iOS 模拟器问题
**症状**：只在 iOS 模拟器上卡住
**解决**：
- 重置模拟器：Device → Erase All Content and Settings
- 重启模拟器
- 尝试真机测试

## 调试技巧

### 添加更多日志
在 `_layout.tsx` 中添加：
```typescript
console.log('App is ready:', appIsReady);
console.log('Hiding splash screen...');
```

### 检查组件渲染
```typescript
useEffect(() => {
  console.log('RootLayout mounted');
}, []);
```

### 检查路由
```typescript
import { usePathname } from 'expo-router';
const pathname = usePathname();
console.log('Current path:', pathname);
```

## 替代方案（如果上述方法都不行）

### 方案 1：禁用启动画面隐藏控制
让 Expo 自动管理启动画面：

从 `_layout.tsx` 中移除：
```typescript
// 删除这些行
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
// 及所有相关的 useEffect
```

### 方案 2：使用延迟隐藏
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    SplashScreen.hideAsync();
  }, 2000); // 延迟 2 秒

  return () => clearTimeout(timer);
}, []);
```

### 方案 3：添加加载指示器
```typescript
if (!appIsReady) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
}
```

## 获取帮助

如果问题仍然存在，请收集以下信息：

1. **平台和设备信息**
   - 操作系统版本
   - 设备型号
   - Expo CLI 版本

2. **错误日志**
   ```bash
   npx expo start --verbose
   ```

3. **package.json 依赖**
   ```bash
   cat package.json
   ```

4. **app.json 配置**
   ```bash
   cat app.json
   ```

## 相关资源

- [Expo SplashScreen 文档](https://docs.expo.dev/versions/latest/sdk/splash-screen/)
- [Expo Router 文档](https://docs.expo.dev/router/introduction/)
- [Expo 故障排除](https://docs.expo.dev/more/troubleshooting/)

## 快速修复命令（一键执行）

```bash
# 完整重置和重启
echo "🧹 Cleaning up..."
rm -rf node_modules .expo .expo-shared
echo "📦 Installing dependencies..."
npm install
echo "🚀 Starting Expo with cache cleared..."
npx expo start -c
```

## 下一步

1. 执行上述"立即执行的修复步骤"
2. 如果问题仍然存在，查看控制台日志
3. 根据日志信息参考"常见问题及解决方案"
4. 如果需要，尝试"替代方案"
5. 收集信息并获取帮助