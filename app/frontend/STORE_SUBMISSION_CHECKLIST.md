# Store Submission Checklist

## ✅ Critical Issues Fixed

### 1. Export Performance 🔴
**Status:** ✅ FIXED

**Problem:** Large canvas exports could crash low-end devices

**Solution Implemented:**
- Created `src/utils/device.ts` for device capability detection
- Added RAM-based export resolution limits
- Free users capped at 1080p
- Pro users get device-appropriate resolution
- 4K export warnings on mid-range devices
- Export resolution automatically adjusted based on device RAM

**Files:**
- `src/utils/device.ts` (new)
- `src/utils/export.ts` (updated)

### 2. Sticker Asset Size 🔴
**Status:** ✅ DOCUMENTED

**Problem:** 200 stickers could make app 30-50MB

**Solution Implemented:**
- Created comprehensive compression guide
- WebP format recommendation (25-35% smaller)
- Image size guidelines per sticker type
- Automated compression script
- File size monitoring commands
- Target: < 15MB total sticker assets

**Files:**
- `assets/stickers/COMPRESSION_GUIDE.md` (new)

### 3. Undo/Redo Scope 🟡
**Status:** ✅ FIXED

**Problem:** History could cause memory leaks

**Solution Implemented:**
- Created `src/hooks/useHistory.ts` with proper state management
- Limited history stack to MAX_HISTORY_SIZE = 20 actions
- Only stores transforms and metadata, NOT full images
- Efficient undo/redo implementation
- Clear history function for cleanup

**Files:**
- `src/hooks/useHistory.ts` (new)
- `src/utils/export.ts` (updated with MAX_HISTORY_SIZE constant)

### 4. Pro Screen Expectations 🟡
**Status:** ✅ ENHANCED

**Problem:** Pro screen needs better visual presentation

**Solution Implemented:**
- Added blurred previews of premium stickers
- Added blurred previews of premium templates
- Clear lock badges on premium content
- Section headers with count badges
- Visual hierarchy improvements
- Added expo-blur dependency

**Files:**
- `app/pro.tsx` (enhanced)
- `package.json` (added expo-blur)

---

## 📋 Pre-Submission Checklist

### Performance
- [ ] Test export on low-end device (2GB RAM)
- [ ] Test export on mid-range device (4GB RAM)
- [ ] Test export on high-end device (6GB+ RAM)
- [ ] Verify 4K export works on supported devices
- [ ] Verify 4K export warning appears on mid-range devices
- [ ] Verify free users limited to 1080p
- [ ] Test memory usage during editing
- [ ] Test memory usage during export

### Assets
- [ ] Compress all sticker images
- [ ] Convert stickers to WebP format
- [ ] Verify total sticker size < 15MB
- [ ] Verify no individual sticker > 125KB
- [ ] Test sticker rendering on all devices
- [ ] Test sticker performance
- [ ] Add app icon (512x512)
- [ ] Add splash screen
- [ ] Add store screenshots (at least 2 for Android, 3 for iOS)

### Pro Features
- [ ] Test Pro upgrade flow
- [ ] Verify locked features show lock badge
- [ ] Verify Pro stickers locked for free users
- [ ] Verify Pro templates locked for free users
- [ ] Test Pro unlock after purchase
- [ ] Verify Pro features persist after app restart

### Undo/Redo
- [ ] Test undo functionality
- [ ] Test redo functionality
- [ ] Verify history limits to 20 actions
- [ ] Test memory doesn't leak with many actions
- [ ] Verify clear history works
- [ ] Test undo/redo with different item types

### Permissions
- [ ] Test photo library permission request
- [ ] Test camera permission request
- [ ] Test storage permission on Android
- [ ] Verify permission descriptions are user-friendly
- [ ] Test app behavior when permissions denied
- [ ] Test app behavior when permissions granted

### Export
- [ ] Test PNG export
- [ ] Test JPG export
- [ ] Test export to gallery
- [ ] Test share functionality
- [ ] Test export with stickers
- [ ] Test export with text
- [ ] Test export with multiple photos
- [ ] Verify export quality settings
- [ ] Test export on different aspect ratios

### UI/UX
- [ ] Test on multiple screen sizes
- [ ] Test on Android (different API levels)
- [ ] Test on iOS (different versions)
- [ ] Verify bottom tab navigation works
- [ ] Test all screens navigate correctly
- [ ] Verify text is readable
- [ ] Test accessibility features
- [ ] Verify no layout issues

### Data Persistence
- [ ] Test saving collages
- [ ] Test loading saved collages
- [ ] Test deleting collages
- [ ] Verify data persists after app restart
- [ ] Test recent templates tracking
- [ ] Test Pro status persistence

### Edge Cases
- [ ] Test with no photos added
- [ ] Test with maximum photos
- [ ] Test with very large images
- [ ] Test with very small images
- [ ] Test with different aspect ratios
- [ ] Test with network disabled
- [ ] Test with low storage space
- [ ] Test rapid button presses

### Store Requirements

#### Play Store (Android)
- [ ] App bundle (AAB) size < 150MB (ideally < 80MB)
- [ ] Target SDK 34 or higher
- [ ] All permissions justified
- [ ] Privacy policy URL
- [ ] Content rating questionnaire
- [ ] Store listing complete
- [ ] Screenshots (at least 2)
- [ ] Feature graphic (1024x500)
- [ ] App icon (512x512)
- [ ] Short description (80 chars)
- [ ] Full description (4000 chars)

#### App Store (iOS)
- [ ] App size < 200MB (ideally < 100MB)
- [ ] iOS 13+ support
- [ ] App privacy details
- [ ] App store screenshots (at least 3)
- [ ] App preview videos (optional)
- [ ] App icon (1024x1024)
-   [ ] Promotional text (170 chars)
- [ ] Description (4000 chars)
- [ ] Keywords (100 chars)
- [ ] Category selection
- [ ] Age rating

### Legal & Compliance
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Data collection disclosure
- [ ] Third-party licenses
- [ ] COPPA compliance (if applicable)
- [ ] GDPR compliance (if applicable)

---

## 🔧 Configuration Files to Review

### app.json
- [ ] App name and bundle identifier correct
- [ ] Version number updated
- [ ] Build number incremented
- [ ] Permissions properly configured
- [ ] Plugins configured

### package.json
- [ ] Dependencies updated
- [ ] No unused dependencies
- [ ] Expo SDK version correct
- [ ] Scripts working

### tsconfig.json
- [ ] Path aliases configured
- [ ] Strict mode enabled
- [ ] No type errors

---

## 📱 Testing Devices

### Android
- [ ] Low-end (2GB RAM, Android 8-10)
- [ ] Mid-range (4GB RAM, Android 11-13)
- [ ] High-end (6GB+ RAM, Android 14)
- [ ] Tablet (if supporting tablets)

### iOS
- [ ] iPhone 8/SE (older device)
- [ ] iPhone 12/13 (mid-range)
- [ ] iPhone 14/15 (latest)
- [ ] iPad (if supporting tablets)

---

## 🚨 Common Issues to Avoid

### Memory Issues
- Don't store full images in history
- Limit cache size
- Clear unused resources
- Test with many items on canvas

### Performance Issues
- Optimize image loading
- Use lazy loading for lists
- Debounce rapid actions
- Avoid unnecessary re-renders

### Crashes
- Handle all async errors
- Provide error messages
- Graceful degradation
- Test edge cases

### Store Rejections
- Follow all guidelines
- Get permissions right
- Don't use restricted APIs
- Provide accurate screenshots

---

## 📊 Performance Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| App size (AAB) | < 50MB | < 80MB |
| App size (IPA) | < 80MB | < 100MB |
| Export time (1080p) | < 5s | < 10s |
| Export time (4K) | < 15s | < 30s |
| Memory usage | < 150MB | < 250MB |
| App launch time | < 2s | < 4s |
| Sticker assets | < 15MB | < 25MB |

---

## ✨ Final Notes

1. **Test thoroughly** - Don't skip real device testing
2. **Monitor reviews** - Respond to user feedback quickly
3. **Update regularly** - Fix bugs and add features
4. **Analyze metrics** - Use Firebase Analytics or similar
5. **Prepare for support** - Have a plan for user questions

---

**Good luck with your store submission! 🚀**