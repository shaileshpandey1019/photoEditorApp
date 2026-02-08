# 启动画面问题修复 - 测试步骤

## 已完成的修复

我已经将所有文件简化到最基本的版本，以排除问题：

### 1. 简化的 `_layout.tsx`
- 移除了所有复杂的组件和 hooks
- 只保留基本的 Tabs 导航
- 添加了控制台日志用于调试

### 2. 简化的 `index.tsx`
- 移除了所有复杂的 UI 组件
- 只显示简单的标题和副标题
- 添加了控制台日志

### 3. 简化的其他页面
- templates.tsx
- create.tsx
- my-creations.tsx
- pro.tsx

全部简化为最基本的版本

## 立即执行的测试步骤

### 步骤 1：停止所有正在运行的 Expo 进程

```bash
# 查找并杀死所有 Expo 进程
pkill -f "expo"

# 或者手动停止（按 Ctrl+C）
```

### 步骤 2：清除所有缓存

```bash
cd /Users/shailesh/Dev/Temporary/photo\ editor/app/frontend

# 清除 Metro 缓存
rm -rf .expo .expo-shared

# 清除 node_modules（如果需要）
rm -rf node_modules

# 重新安装依赖
npm install
```

### 步骤 3：启动 Expo 开发服务器

```bash
cd /Users/shailesh/Dev/Temporary/photo\ editor/app/frontend

# 使用新端口启动
npx expo start --port 8082 --clear
```

### 步骤 4：在设备或模拟器上打开应用

**Android:**
- 按 `a` 键
- 或者扫描二维码

**iOS:**
- 按 `i` 键
- 或者扫描二维码

## 检查点

### ✅ 如果应用正常启动

你应该看到：
1. 启动画面短暂显示
2. 然后显示白色背景
3. 显示 "Photo Collage Maker" 标题
4. 显示 "Welcome to the app!" 副标题
5. 控制台输出：
   ```
   RootLayout rendering...
   HomeScreen rendering...
   ```

### ❌ 如果仍然卡在启动画面

请执行以下操作：

#### 1. 查看控制台日志

在终端中查看是否有任何错误消息：
- 红色错误消息
- 警告消息
- 任何异常输出

#### 2. 检查设备日志

**Android:**
```bash
adb logcat | grep Expo
```

**iOS:**
在 Xcode 中查看日志输出

#### 3. 尝试 Web 版本

```bash
# 按 w 键在浏览器中打开
# 如果 Web 版本正常，说明是移动端特定问题
```

#### 4. 检查 app.json 配置

```bash
cat app.json
```

确保以下配置正确：
```json
{
  "expo": {
    "name": "Photo Collage Maker",
    "slug": "photo-collage-maker",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

## 常见问题解决

### 问题 1：Metro bundler 缓存问题

**解决方案：**
```bash
# 完全清除 Metro 缓存
watchman watch-del-all
rm -rf node_modules/.cache
rm -rf .expo .expo-shared
npx expo start --clear
```

### 问题 2：端口被占用

**解决方案：**
```bash
# 使用不同的端口
npx expo start --port 8082 --clear

# 或者杀死占用端口的进程
lsof -ti:8081 | xargs kill -9
```

### 问题 3：启动画面图片损坏

**解决方案：**
```bash
# 检查图片文件是否存在
ls -la assets/splash.png

# 如果损坏，创建一个简单的占位符
# 使用任何图像编辑器创建 1024x1024 的白色 PNG 图片
# 保存为 assets/splash.png
```

### 问题 4：依赖版本冲突

**解决方案：**
```bash
# 检查依赖
npm list

# 修复依赖
npx expo install --fix

# 如果还有问题，完全重新安装
rm -rf node_modules
rm package-lock.json
npm install
```

## 下一步

### ✅ 如果简化版本正常工作

我们可以逐步添加功能：
1. 先添加主题系统
2. 然后添加 UI 组件
3. 最后添加完整的功能

### ❌ 如果简化版本仍然不工作

问题可能在于：
1. Expo SDK 版本问题
2. React Native 版本问题
3. 设备特定问题

请提供以下信息：
1. 控制台完整的错误日志
2. 设备型号和操作系统版本
3. Expo CLI 版本：`npx expo --version`
4. React Native 版本：查看 package.json

## 快速诊断命令

```bash
# 检查 Expo 版本
npx expo --version

# 检查依赖
npm list expo expo-router react-native

# 检查端口占用
lsof -i :8081

# 检查进程
ps aux | grep expo

# 检查文件
ls -la app/_layout.tsx app/index.tsx
```

## 联系支持

如果问题仍然存在，请收集：
1. 完整的控制台输出
2. 设备信息
3. package.json 内容
4. app.json 内容

然后再次联系我。

---

## 重要提示

**现在请执行以下操作：**

1. 停止所有 Expo 进程
2. 清除缓存：`rm -rf .expo .expo-shared`
3. 启动：`npx expo start --port 8082 --clear`
4. 在设备上打开应用
5. 告诉我结果！