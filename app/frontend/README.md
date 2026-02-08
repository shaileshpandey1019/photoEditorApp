# 📸 Photo Collage Maker

A complete, production-ready Photo Collage Maker mobile app built with Expo and React Native.

## ✨ Features

### Core Features
- **20+ Professional Templates** - Grid, Creative, Minimal, and Artistic layouts
- **Multiple Aspect Ratios** - 1:1, 4:5, 9:16, and Freeform
- **Offline-First Architecture** - 100% local, no backend required
- **Photo Management** - Add, replace, and remove photos from collages
- **Export to Gallery** - Save your creations in high quality
- **Storage System** - Save and manage your collages locally

### Premium Features (Pro)
- Export without watermark
- 200+ premium stickers (5 categories)
- Ultra HD export (4K resolution)
- Advanced text styles (premium fonts, colors, effects)
- Transparent backgrounds
- Unlimited creations
- Priority support
- Premium templates

### Screens
1. **Home** - Featured templates, quick actions, recent templates
2. **Templates** - Browse all 20+ templates with aspect ratio filters
3. **Create** - Collage editor with photo management, stickers, and text
4. **My Creations** - Gallery of saved collages
5. **Pro** - Premium upgrade screen

### Advanced Features
- **Advanced Canvas** - Multi-layer rendering with transform controls
- **Gesture Support** - Drag, pinch-zoom, and rotate on canvas items
- **Snap Guides** - Visual alignment helpers for precise positioning
- **Sticker Picker** - Browse and add from 200 stickers across 5 categories
- **Text Tool** - Advanced text editor with fonts, colors, and shadows
- **Bottom Tab Navigation** - Easy navigation between screens

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator, or a physical device with Expo Go

### Installation

```bash
# Navigate to the project directory
cd app/frontend

# Install dependencies
yarn install

# Start the development server
yarn start
```

### Running on Device

1. Install the **Expo Go** app on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code displayed in the terminal

3. The app will load instantly on your device

### Building APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build Android APK
eas build --platform android --profile preview
```

## 📁 Project Structure

```
app/frontend/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # Home screen
│   ├── templates.tsx            # Templates browser
│   ├── create.tsx               # Collage editor
│   ├── my-creations.tsx         # Gallery screen
│   └── pro.tsx                  # Pro upgrade screen
│
├── src/
│   ├── components/
│   │   ├── Canvas/              # Canvas components
│   │   │   ├── CollageCanvas.tsx # Main collage editor
│   │   │   ├── TransformableItem.tsx # Draggable/resizable items
│   │   │   └── SnapGuides.tsx   # Alignment guides
│   │   ├── UI/                  # Reusable UI components
│   │   │   ├── Button.tsx       # Multi-variant button
│   │   │   ├── ProBadge.tsx     # Premium badge
│   │   │   ├── BottomSheet.tsx  # Animated modal
│   │   │   └── EmptyState.tsx   # Empty state component
│   │   ├── Navigation/          # Navigation components
│   │   │   └── TabBar.tsx       # Bottom tab navigation
│   │   ├── StickerPicker/       # Sticker selection
│   │   │   └── StickerPicker.tsx
│   │   └── TextTool/            # Text editing
│   │       └── TextTool.tsx     # Advanced text editor
│   │
│   ├── data/
│   │   ├── templates.ts         # 20+ template definitions
│   │   └── stickers.ts          # 200 sticker definitions
│   │
│   ├── hooks/
│   │   ├── useStorage.ts        # AsyncStorage management
│   │   └── useProFeatures.ts    # Pro feature gating
│   │
│   ├── utils/
│   │   ├── export.ts            # Export utilities
│   │   └── gestures.ts          # Gesture helpers
│   │
│   └── theme/
│       └── index.ts             # Design system
│
├── assets/
│   └── stickers/                # Sticker assets
│       ├── README.md            # Sticker guide
│       ├── emoji/
│       ├── love/
│       ├── travel/
│       ├── birthday/
│       └── wedding/
│
├── package.json
├── app.json
├── tsconfig.json
├── babel.config.js
└── README.md
```

## 🎨 Design System

The app uses a comprehensive design system built on an 8pt grid:

### Colors
- **Primary**: Indigo (#6366F1)
- **Accent**: Pink, Purple, Teal, Orange, Yellow
- **Neutral**: 50-900 scale
- **Semantic**: Success, Warning, Error, Info

### Typography
- 8pt scale (12px - 48px)
- 4 font weights (Regular, Medium, Semibold, Bold)
- Consistent line heights

### Spacing
- 8pt grid system (4px - 96px)

### Components
**UI Components**
- Button (4 variants, 3 sizes)
- ProBadge (3 sizes)
- BottomSheet (animated)
- EmptyState

**Canvas Components**
- CollageCanvas (main editor)
- TransformableItem (draggable/resizable)
- SnapGuides (alignment)

**Navigation**
- TabBar (bottom navigation)

**Editor Tools**
- StickerPicker (sticker selection)
- TextTool (advanced text editor)

## 📦 Tech Stack

- **Framework**: Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router 6
- **State Management**: React Hooks
- **Storage**: AsyncStorage (offline-first)
- **Gestures**: react-native-gesture-handler
- **Animation**: react-native-reanimated
- **Image**: expo-image-picker, expo-media-library
- **Export**: react-native-view-shot
- **UI**: expo-linear-gradient

## 🔧 Configuration

### Adding Stickers

1. Place PNG files in `assets/stickers/[category]/`
2. Follow naming convention: `category-name.png`
3. Update `src/data/stickers.ts` if adding new stickers

See `assets/stickers/README.md` for detailed instructions.

### Adding Templates

1. Define template in `src/data/templates.ts`
2. Specify frames with percentage-based positioning
3. Set aspect ratio and category
4. Mark as premium if needed

### Customizing Theme

Edit `src/theme/index.ts` to customize:
- Colors
- Typography
- Spacing
- Border radius
- Shadows

## 📱 Permissions

The app requests the following permissions:

### iOS
- Photo Library Access
- Photo Library Add Access
- Camera Access

### Android
- Read External Storage
- Write External Storage
- Camera
- Read Media Images

Permissions are requested when needed with user-friendly descriptions.

## 💰 Monetization

The app includes a complete Pro feature system:

### Pro Features
1. Export without watermark
2. Premium stickers (160 stickers, 8 free per category)
3. Ultra HD export (4K resolution)
4. Advanced text styles (premium fonts, colors, effects)
5. Transparent backgrounds
6. Unlimited creations
7. Priority support
8. Premium templates

### Integration
To add real payments:
1. Install RevenueCat or similar
2. Configure products in stores
3. Update `useProFeatures.ts` hook
4. Test purchase flow
5. Submit to stores

## 📄 License

This project is provided as-is for educational and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📞 Support

For questions or support, please refer to the documentation or open an issue.

---

**Built with ❤️ using Expo, React Native, and modern best practices.**