# 🔥 Firebase Storage Setup for SnapShoot App

## 📋 Overview
This guide will help you set up Firebase Storage for your SnapShoot app to host onboarding images in the cloud instead of local assets.

## 🚀 Step 1: Create Firebase Project

1. **Go to Firebase Console**
   - Visit [Firebase Console](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project"
   - Enter project name: `snapshoot-app` (or your preferred name)
   - Enable Google Analytics (optional)
   - Click "Create project"

## ⚙️ Step 2: Configure Firebase for Web

1. **Add Web App**
   - In your Firebase project dashboard
   - Click "Add app" → Web (</> icon)
   - App nickname: `SnapShoot React Native`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

2. **Copy Configuration**
   - Copy the Firebase configuration object
   - It looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key-here",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

## 🔧 Step 3: Update App Configuration

1. **Edit Firebase Config**
   - Open `src/services/firebase/config.ts`
   - Replace the placeholder values with your Firebase config:

   ```typescript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project-id.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id",
     measurementId: "your-measurement-id" // Optional
   };
   ```

## 📁 Step 4: Set Up Firebase Storage

1. **Enable Storage**
   - In Firebase Console, go to "Storage"
   - Click "Get started"
   - Choose "Start in test mode" (for now)
   - Select storage location (choose closest to your users)
   - Click "Done"

2. **Configure Storage Rules** (Optional - for production)
   - In Storage → Rules tab
   - Update rules for production security:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /onboarding/{allPaths=**} {
         allow read: if true; // Public read for onboarding images
         allow write: if request.auth != null; // Authenticated write
       }
     }
   }
   ```

## 📸 Step 5: Upload Onboarding Images

1. **Create Folder Structure**
   - In Firebase Console → Storage
   - Click "Create folder"
   - Name it: `onboarding`

2. **Upload Images**
   Upload these files to the `onboarding` folder with **exact names**:
   
   **From your local directory:**
   - `assets/images/onboarding/wedding-scene.jpg` → Upload as `wedding-scene.jpg`
   - `assets/images/onboarding/corporate-scene.jpg` → Upload as `corporate-scene.jpg`
   - `assets/images/onboarding/celebrity-scene.jpg` → Upload as `celebrity-scene.jpg`

   **Important:** File names must match exactly!

3. **Verify Upload**
   - All 3 images should be in `onboarding/` folder
   - URLs should look like: `https://firebasestorage.googleapis.com/v0/b/your-project.appspot.com/o/onboarding%2Fwedding-scene.jpg?alt=media&token=...`

## ✅ Step 6: Test the Setup

1. **Run the App**
   ```bash
   npm start
   ```

2. **Check Console Logs**
   - Look for: `"Loading images from Firebase Storage..."`
   - Success: `"✅ Firebase images loaded successfully"`
   - Error: `"⚠️ Failed to load Firebase images, using local fallbacks"`

3. **Debug Info**
   - In development mode, you'll see a debug indicator:
   - `🔥 Firebase Images` = Firebase working
   - `📱 Local Images` = Using fallback

## 🔍 Troubleshooting

### ❌ "Failed to load Firebase images"

**Check:**
1. **Config file** - Are Firebase credentials correct?
2. **Storage rules** - Are images publicly readable?
3. **File names** - Do they match exactly?
4. **Network** - Is internet connection working?

**Debug Steps:**
```javascript
// Test in browser console or add to app temporarily
import { validateOnboardingImages } from './src/services/firebase';
validateOnboardingImages().then(console.log);
```

### ❌ CORS Errors

If you see CORS errors in web development:
1. Firebase Storage should handle CORS automatically
2. Try accessing URLs directly in browser
3. Check Firebase Storage security rules

### ❌ Images Not Loading

1. **Verify URLs:** Check if image URLs are accessible in browser
2. **Check permissions:** Ensure storage rules allow public read
3. **File paths:** Confirm exact file names in Firebase Console

## 🎯 Benefits After Setup

✅ **Smaller app bundle** - Images loaded on demand  
✅ **Easy updates** - Change images without app updates  
✅ **CDN delivery** - Fast global loading  
✅ **Automatic fallback** - Local images if Firebase fails  

## 📱 Production Considerations

1. **Security Rules** - Restrict write access to authenticated users
2. **Image Optimization** - Use WebP format for better performance
3. **Caching Strategy** - Images cached automatically after first load
4. **Monitoring** - Set up Firebase Analytics for usage tracking

## 🆘 Need Help?

- **Firebase Docs:** [Firebase Storage Web Guide](https://firebase.google.com/docs/storage/web/start)
- **React Native Firebase:** [RNFB Storage](https://rnfirebase.io/storage/usage)
- **Troubleshooting:** Check browser/metro console for detailed error messages

---

**🎉 Once complete, your onboarding images will load from Firebase Storage with automatic fallback to local assets!** 