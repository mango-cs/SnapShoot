# 🎬 Reel Setup Guide for SnapShoot App

This guide explains how to add and manage video reels in the "Discover with Vibe" section of your SnapShoot app using Firebase Storage.

## 🚀 Quick Start

### 1. First Time Setup

Run this command in your app to initialize sample reels:

```javascript
import { reelCommands } from './src/utils/reelSetup';
await reelCommands.init();
```

### 2. Add Your Real Reel URLs

Edit the file `src/utils/reelSetup.ts` and uncomment/modify the `yourReels` array:

```javascript
const yourReels = [
  {
    title: 'Your Wedding Reel',
    videoUrl: 'https://your-video-url.mp4',
    category: 'WEDDING',
    description: 'Beautiful wedding moments',
    thumbnailUrl: 'https://your-thumbnail-url.jpg' // optional
  },
  // Add more reels...
];
```

Then run:
```javascript
await reelCommands.addCustom();
```

## 📱 Available Categories

- `WEDDING` - Wedding photography and videography
- `PORTRAIT` - Portrait sessions
- `CORPORATE` - Corporate events
- `BIRTHDAY` - Birthday celebrations
- `EVENT` - General events
- `FEATURED` - Featured content

## 🛠️ Management Commands

### Add a Single Reel Quickly
```javascript
await reelCommands.add(
  'My Reel Title',
  'https://video-url.mp4',
  'WEDDING',
  'Description (optional)',
  'https://thumbnail-url.jpg' // optional
);
```

### Add Multiple Reels
```javascript
await reelCommands.addBulk([
  {
    title: 'Reel 1',
    videoUrl: 'https://video1.mp4',
    category: 'WEDDING'
  },
  {
    title: 'Reel 2',
    videoUrl: 'https://video2.mp4',
    category: 'PORTRAIT'
  }
]);
```

### List All Current Reels
```javascript
await reelCommands.list();
```

### Setup Sample Reels (for testing)
```javascript
await reelCommands.setupSample();
```

## 🎥 Video Requirements

### Supported Formats
- **Video**: MP4, WebM, MOV
- **Recommended**: MP4 with H.264 encoding
- **Aspect Ratio**: 9:16 (vertical/portrait) for best mobile experience
- **Resolution**: 720p to 1080p
- **Duration**: 15-60 seconds recommended

### Thumbnail Requirements
- **Format**: JPG, PNG, WebP
- **Aspect Ratio**: 3:4 (to match the 120x180px card size)
- **Size**: Recommended 300x400px or higher

## 🌐 Using External URLs

You can use videos from:

### 1. Firebase Storage (Recommended)
- Upload your videos to Firebase Storage
- Get the download URL
- Use the URL in your reel configuration

### 2. Other Cloud Storage
- Google Drive (public links)
- Vimeo (direct video URLs)
- YouTube (with proper API)
- AWS S3 (public URLs)
- Any CDN with direct video access

### 3. Example URLs for Testing
```javascript
// Sample video URLs you can use for testing:
'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
```

## 🔧 Implementation Details

### Where the Reels Appear
- **Home Screen**: "Discover with Vibe" section
- **Format**: Vertical cards (120x180px) 
- **Behavior**: 
  - Shows thumbnail by default
  - Play button overlay
  - Tap to play/pause
  - Auto-stop when finished

### Firebase Structure
```
/reels (collection)
  /{reelId} (document)
    - title: string
    - description: string
    - videoUrl: string
    - thumbnailUrl: string
    - category: string
    - order: number
    - isActive: boolean
    - createdAt: timestamp
    - updatedAt: timestamp
```

## 🚨 Troubleshooting

### Reels Not Loading
1. Check Firebase configuration in `src/services/firebase/config.ts`
2. Verify video URLs are accessible
3. Check browser console for errors
4. Ensure Firebase project has Firestore enabled

### Video Won't Play
1. Verify video format is supported (MP4 recommended)
2. Check if URL is publicly accessible
3. Ensure CORS is properly configured for external URLs
4. Try with sample URLs first

### Poor Performance
1. Optimize video file sizes
2. Use proper video compression
3. Consider using thumbnails
4. Limit number of reels (current limit: 4 in discover section)

## 📋 Step-by-Step Process

### For New Reel Links:

1. **Prepare Your Videos**
   - Upload to your preferred hosting service
   - Get direct video URLs
   - Create thumbnails (optional but recommended)

2. **Add to Firebase**
   ```javascript
   // Option 1: Edit reelSetup.ts and run addCustom()
   await reelCommands.addCustom();
   
   // Option 2: Add directly
   await reelCommands.add('Title', 'VideoURL', 'Category');
   ```

3. **Test in App**
   - Restart your app
   - Navigate to Home screen
   - Check "Discover with Vibe" section
   - Tap to play videos

4. **Update as Needed**
   - Use `reelCommands.list()` to see current reels
   - Remove unwanted reels from Firebase console
   - Add new reels using the commands

## 🎯 Best Practices

1. **Video Optimization**
   - Keep files under 50MB for good loading
   - Use vertical orientation (9:16 ratio)
   - Compress videos for web

2. **Thumbnail Strategy**
   - Always include thumbnails for faster loading
   - Use compelling first frames
   - Maintain consistent aspect ratio

3. **Content Management**
   - Use descriptive titles
   - Set appropriate categories
   - Order reels by priority (order field)
   - Keep active reels under 10 for performance

4. **Firebase Management**
   - Regularly clean up unused reels
   - Monitor storage usage
   - Use Firebase Security Rules to protect data

## 💡 Example Implementation

Here's a complete example of adding a wedding reel:

```javascript
// Add a wedding reel with all details
await reelCommands.add(
  'Sarah & John Wedding Highlights',
  'https://your-storage.com/wedding-sarah-john.mp4',
  'WEDDING',
  'Beautiful ceremony and reception moments captured in Bangalore',
  'https://your-storage.com/thumbnails/wedding-sarah-john.jpg'
);

// Verify it was added
await reelCommands.list();
```

## 🔄 Dynamic Updates

The best part: **No app store updates needed!** 

- Add new reels to Firebase
- Users see new content immediately
- Perfect for:
  - Seasonal promotions
  - Latest work showcases
  - Client testimonials
  - Service demonstrations

---

**🎉 Your "Discover with Vibe" section is now ready for dynamic video content!** 

Just provide your reel links and use the management commands to keep your content fresh and engaging. 