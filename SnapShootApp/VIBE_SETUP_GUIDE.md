# 🎭 Vibe Categories Setup Guide

## 📋 Overview
This guide helps you set up and manage the "Discover with Vibe" section, which displays dynamic video content from Firebase Storage and Firestore.

## 🎯 Refined Vibe Categories

Your app now supports these refined vibe categories:

| Category | Icon | Description | Priority |
|----------|------|-------------|----------|
| **Wedding** | 💒 | Capture the magic of wedding moments | 1 |
| **Celebrity** | ⭐ | Glamorous celebrity-style photoshoots | 2 |
| **Car Delivery** | 🚗 | Document exciting car delivery moments | 3 |
| **Birth Video** | 👶 | Precious moments of new life | 4 |
| **Party** | 🎉 | Fun party celebrations and events | 5 |
| **Corporate** | 🏢 | Professional corporate events and meetings | 6 |

## 🔥 Firebase Setup Status

### ✅ What's Already Configured:
- **Firebase Config**: Properly set up in `src/services/firebase/config.ts`
- **Firestore Database**: Connected for storing reel metadata
- **Firebase Storage**: Available for hosting videos and thumbnails
- **Real-time Fetching**: HomeScreen dynamically loads reels
- **Category Management**: Enhanced system with icons, labels, and priorities

### 🔧 Firebase Structure:
```
Firestore Collection: /reels
├── {reelId} (document)
│   ├── title: string
│   ├── description: string
│   ├── videoUrl: string (Firebase Storage or external URL)
│   ├── thumbnailUrl: string (Firebase Storage or external URL)
│   ├── category: string (wedding|celebrity|car_delivery|birth_video|party|corporate)
│   ├── order: number (for display ordering)
│   ├── isActive: boolean
│   ├── createdAt: timestamp
│   └── updatedAt: timestamp

Firebase Storage:
├── /reels/videos/
│   └── {reelId}.mp4
└── /reels/thumbnails/
    └── {reelId}.jpg
```

## 🚀 Quick Setup Commands

### Method 1: Setup Sample Reels (Recommended for Testing)
```javascript
// Run this in your app console or development environment
import { setupVibeReels } from './src/services/firebase/vibeManager';
await setupVibeReels();
```

### Method 2: Add Individual Reels
```javascript
import { addVibeReel } from './src/services/firebase/vibeManager';

// Add a wedding reel
await addVibeReel(
  'Beautiful Wedding Ceremony',
  'https://your-video-url.mp4',
  'wedding',
  'Magical wedding moments captured in stunning detail',
  'https://your-thumbnail-url.jpg',
  1 // order priority
);

// Add a celebrity reel
await addVibeReel(
  'Celebrity Red Carpet Shoot',
  'https://your-celebrity-video.mp4',
  'celebrity',
  'Glamorous celebrity photoshoot session',
  'https://your-celebrity-thumbnail.jpg',
  2
);
```

### Method 3: Batch Add Multiple Reels
```javascript
import { addMultipleReels } from './src/services/firebase/reelManager';

await addMultipleReels([
  {
    title: 'Wedding Highlights',
    videoUrl: 'https://video1.mp4',
    category: 'WEDDING',
    description: 'Beautiful wedding moments',
    thumbnailUrl: 'https://thumb1.jpg'
  },
  {
    title: 'Car Delivery Joy',
    videoUrl: 'https://video2.mp4',
    category: 'CAR_DELIVERY',
    description: 'Exciting car delivery moment',
    thumbnailUrl: 'https://thumb2.jpg'
  }
]);
```

## ✅ Validate Your Setup

### Check Firebase Connection
```javascript
import { validateVibeSetup } from './src/services/firebase/vibeManager';

const status = await validateVibeSetup();
console.log('Setup Status:', status);

// Returns:
// {
//   isSetup: boolean,
//   categoryCounts: { wedding: 2, celebrity: 1, ... },
//   totalReels: 6,
//   missingCategories: ['Birth Video', 'Car Delivery'],
//   recommendations: ['Add more wedding content for variety', ...]
// }
```

### View All Reels by Category
```javascript
import { getReelsByVibe } from './src/services/firebase/vibeManager';

const reelsByCategory = await getReelsByVibe();
console.log('Reels by Category:', reelsByCategory);
```

## 🎥 Video Requirements

### Supported Formats:
- **Video**: MP4, MOV, AVI (MP4 recommended)
- **Duration**: 15-60 seconds (optimal for mobile viewing)
- **Resolution**: 720p or higher
- **Aspect Ratio**: 9:16 (vertical) or 16:9 (horizontal)

### Thumbnail Requirements:
- **Format**: JPG, PNG, WebP
- **Aspect Ratio**: 3:4 (to match 120x180px card size)
- **Size**: 300x400px or higher

## 🌐 Content Sources

### Option 1: Firebase Storage (Recommended)
```javascript
// Upload video to Firebase Storage first, then use the download URL
import { uploadReelVideo, uploadReelThumbnail } from './src/services/firebase/reels';

const videoUrl = await uploadReelVideo(videoFile, 'unique-reel-id');
const thumbnailUrl = await uploadReelThumbnail(thumbnailFile, 'unique-reel-id');

await addVibeReel(
  'My Amazing Video',
  videoUrl,
  'wedding',
  'Description here',
  thumbnailUrl
);
```

### Option 2: External URLs
You can use videos from:
- **Vimeo**: Direct video URLs
- **YouTube**: With proper API integration
- **AWS S3**: Public URLs
- **Google Drive**: Public share links
- **Any CDN**: With direct video access

### Option 3: Sample URLs for Testing
```javascript
const testUrls = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
];
```

## 🔧 Management Functions

### Update Reel Order
```javascript
import { updateVibeReelOrder } from './src/services/firebase/vibeManager';
await updateVibeReelOrder('reel-id', 5); // Set new order priority
```

### Get Category Information
```javascript
import { getVibeCategoryInfo } from './src/services/firebase/vibeManager';
const info = getVibeCategoryInfo('wedding');
// Returns: { label: 'Wedding', icon: '💒', color: '#FF6B6B', description: '...', priority: 1 }
```

### Remove a Reel
```javascript
import { removeReel } from './src/services/firebase/reelManager';
await removeReel('reel-id');
```

## 🎨 UI Features

### Enhanced Category Display:
- **Icons**: Each category has a unique emoji icon
- **Colors**: Category-specific color coding
- **Labels**: User-friendly category names
- **Priority**: Automatic ordering by importance

### "Discover with Vibe" Section:
- Shows up to 6 featured reels
- Prioritizes content from different categories
- Automatic fallback if no content available
- Loading states with placeholders
- Error handling with user-friendly messages

## 🚨 Troubleshooting

### No Reels Showing Up
1. **Check Firebase Connection**:
   ```javascript
   import { validateVibeSetup } from './src/services/firebase/vibeManager';
   await validateVibeSetup();
   ```

2. **Verify Firestore Rules**:
   ```javascript
   // Firestore rules should allow read access
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /reels/{document} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. **Check Video URLs**: Ensure all video URLs are accessible

### Videos Not Playing
1. **Format**: Ensure videos are in MP4 format
2. **CORS**: Check if external URLs allow cross-origin requests
3. **Size**: Large videos may take time to load

### Performance Issues
1. **Optimize Videos**: Compress videos for mobile
2. **Thumbnail Loading**: Ensure thumbnails load quickly
3. **Limit Reels**: Don't exceed 10 reels per category

## 📊 Best Practices

### Content Strategy:
- **Variety**: Aim for 2-3 reels per category
- **Quality**: Use high-quality, engaging content
- **Duration**: Keep videos under 60 seconds
- **Rotation**: Update content regularly

### Technical Best Practices:
- **Caching**: Videos are cached after first view
- **Fallbacks**: Always provide thumbnail fallbacks
- **Error Handling**: Graceful degradation when content fails
- **Performance**: Monitor loading times

## 🎉 Next Steps

1. **Run the setup**: `await setupVibeReels()`
2. **Validate setup**: `await validateVibeSetup()`
3. **Add your content**: Replace sample videos with real content
4. **Test thoroughly**: Check all categories and error states
5. **Monitor performance**: Watch for loading issues

---

**🚀 Your "Discover with Vibe" section is now ready to showcase dynamic, category-organized content that can be updated without app deployments!** 