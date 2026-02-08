# Sticker Asset Compression Guide

## Why Compression Matters

200 stickers can easily make the app size 30-50MB if not optimized. This is critical for:
- ✅ Faster app downloads
- ✅ Better user experience
- ✅ Meeting Play Store AAB size limits (~80MB)
- ✅ Lower storage usage on user devices

## Recommended Approach

### 1. Use WebP Format (Highly Recommended)

**Benefits:**
- 25-35% smaller than PNG
- Same image quality
- Supports transparency
- Supported on all modern devices

**Conversion:**
```bash
# Using ImageMagick
mogrify -format webp -quality 85 *.png

# Using ffmpeg
ffmpeg -i sticker.png -c:v libwebp -quality 85 sticker.webp
```

### 2. Image Size Guidelines

| Sticker Type | Max Size | Recommended | File Size Target |
|-------------|----------|------------|-----------------|
| Simple (emoji) | 128x128 | 96x96 | < 5KB |
| Medium (icons) | 256x256 | 192x192 | < 15KB |
| Complex (illustrations) | 512x512 | 384x384 | < 30KB |
| Detailed (artwork) | 1024x1024 | 512x512 | < 50KB |

### 3. Quality Settings

**WebP Quality:**
- **85** - Best balance of size/quality (recommended)
- **80** - Slightly smaller, minimal quality loss
- **90** - Better quality, larger file size

### 4. Automated Compression Script

```bash
#!/bin/bash
# compress_stickers.sh - Optimize all sticker assets

echo "Starting sticker compression..."

# Convert PNG to WebP with optimization
for category in emoji love travel birthday wedding; do
    echo "Processing category: $category"
    mkdir -p "assets/stickers/$category/webp"

    for file in assets/stickers/$category/*.png; do
        if [ -f "$file" ]; then
            filename=$(basename "$file" .png)
            echo "  Converting: $filename"
            ffmpeg -i "$file" \
                   -c:v libwebp \
                   -quality 85 \
                   -resize 384x384 \
                   "assets/stickers/$category/webp/${filename}.webp"
        fi
    done
done

echo "Compression complete!"
```

### 5. File Size Monitoring

```bash
# Check total size of stickers folder
du -sh assets/stickers/

# Check size per category
du -sh assets/stickers/*/

# Find largest files
find assets/stickers/ -type f -exec ls -lh {} \; | sort -k5 -h | tail -20
```

## Target File Sizes

| Metric | Target | Maximum |
|--------|--------|---------|
| Total sticker assets | < 15MB | < 25MB |
| Average per sticker | < 75KB | < 125KB |
| Per category | < 3MB | < 5MB |

## Compression Workflow

1. **Design** - Create stickers at high resolution (1024x1024)
2. **Resize** - Scale down to recommended size
3. **Convert** - Convert PNG to WebP
4. **Optimize** - Apply compression settings
5. **Test** - Verify visual quality
6. **Monitor** - Check file sizes

## Quality Checklist

Before releasing, verify:
- [ ] All stickers converted to WebP
- [ ] Total sticker size < 15MB
- [ ] No individual sticker > 125KB
- [ ] Visual quality acceptable
- [ ] Transparency preserved
- [ ] Tested on multiple devices

## Alternative: Lazy Loading

If compression isn't enough, consider:
1. Host stickers on CDN
2. Download on demand
3. Cache locally after first use
4. Show placeholders while loading

## Tools

### ImageMagick
```bash
brew install imagemagick  # macOS
sudo apt-get install imagemagick  # Linux
```

### FFmpeg
```bash
brew install ffmpeg  # macOS
sudo apt-get install ffmpeg  # Linux
```

### Online Tools
- [Squoosh](https://squoosh.app/) - Google's image optimizer
- [TinyPNG](https://tinypng.com/) - Online PNG compression
- [CloudConvert](https://cloudconvert.com/) - Format conversion

## Example Results

| Format | Size | Savings |
|--------|------|---------|
| PNG (original) | 50MB | - |
| PNG (optimized) | 35MB | 30% |
| WebP (85%) | 18MB | 64% |
| WebP (80%) | 15MB | 70% |

## Troubleshooting

### Issue: Artifacts/Blocky Images
- **Solution:** Increase quality to 90

### Issue: Transparency Lost
- **Solution:** Ensure WebP with alpha channel is used

### Issue: File Still Too Large
- **Solution:** Reduce image dimensions

### Issue: Slow Loading
- **Solution:** Consider CDN or lazy loading

---

**Remember:** Every MB saved = faster downloads and happier users! 🚀