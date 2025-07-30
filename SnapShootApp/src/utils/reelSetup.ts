/**
 * Reel Setup Utility
 * 
 * This file demonstrates how to add reel links to your Firebase.
 * Replace the sample URLs with your actual reel links.
 */

import { addReelQuick, addMultipleReels, setupSampleReels, listAllReels } from '../services/firebase/reelManager';

/**
 * Add your real reel links here
 * Replace these URLs with your actual video links
 */
export const addYourReels = async () => {
  console.log('🎬 Adding your custom reels...');
  
  // Example: Add single reel
  // await addReelQuick(
  //   'Your Reel Title',
  //   'https://your-video-url.mp4',
  //   'WEDDING', // or 'PORTRAIT', 'CORPORATE', 'BIRTHDAY', 'EVENT', 'FEATURED'
  //   'Your reel description',
  //   'https://your-thumbnail-url.jpg' // optional
  // );

  // Example: Add multiple reels at once
  const yourReels: Array<{
    title: string;
    videoUrl: string;
    category: 'WEDDING' | 'PORTRAIT' | 'CORPORATE' | 'BIRTHDAY' | 'EVENT' | 'FEATURED';
    description: string;
    thumbnailUrl?: string;
  }> = [
    // Uncomment and replace with your real URLs:
    /*
    {
      title: 'Wedding Reel 1',
      videoUrl: 'https://your-wedding-video-1.mp4',
      category: 'WEDDING' as const,
      description: 'Beautiful wedding ceremony highlights',
      thumbnailUrl: 'https://your-thumbnail-1.jpg'
    },
    {
      title: 'Portrait Reel 1', 
      videoUrl: 'https://your-portrait-video-1.mp4',
      category: 'PORTRAIT' as const,
      description: 'Professional portrait session',
      thumbnailUrl: 'https://your-thumbnail-2.jpg'
    },
    {
      title: 'Corporate Event Reel',
      videoUrl: 'https://your-corporate-video.mp4', 
      category: 'CORPORATE' as const,
      description: 'Corporate event coverage',
      thumbnailUrl: 'https://your-thumbnail-3.jpg'
    },
    {
      title: 'Birthday Party Reel',
      videoUrl: 'https://your-birthday-video.mp4',
      category: 'BIRTHDAY' as const, 
      description: 'Fun birthday celebration moments',
      thumbnailUrl: 'https://your-thumbnail-4.jpg'
    }
    */
  ];

  if (yourReels.length > 0) {
    const results = await addMultipleReels(yourReels);
    console.log('✅ Your reels have been added to Firebase!');
    return results;
  } else {
    console.log('ℹ️ No custom reels defined. Add your URLs in the yourReels array above.');
    return [];
  }
};

/**
 * Initialize reels for the first time
 * This will set up sample reels for testing
 */
export const initializeReels = async () => {
  try {
    console.log('🚀 Initializing reels for your app...');
    
    // Check if there are already reels
    const existingReels = await listAllReels();
    
    if (existingReels.length > 0) {
      console.log('✅ Reels already exist in Firebase!');
      return existingReels;
    }
    
    // Setup sample reels if none exist
    console.log('📱 No reels found. Setting up sample reels...');
    await setupSampleReels();
    
    console.log('🎉 Sample reels have been added to your Firebase!');
    console.log('🔧 Replace these with your real reel URLs using addYourReels()');
    
    return await listAllReels();
    
  } catch (error) {
    console.error('❌ Failed to initialize reels:', error);
    throw error;
  }
};

/**
 * Quick commands for managing reels
 */
export const reelCommands = {
  // List all current reels
  list: listAllReels,
  
  // Setup sample reels (for testing)
  setupSample: setupSampleReels,
  
  // Add your custom reels
  addCustom: addYourReels,
  
  // Initialize reels (first-time setup)
  init: initializeReels,
  
  // Quick add a single reel
  add: addReelQuick,
  
  // Add multiple reels
  addBulk: addMultipleReels,
};

/**
 * USAGE INSTRUCTIONS:
 * 
 * 1. First time setup:
 *    Run: await reelCommands.init()
 * 
 * 2. Add your real reel URLs:
 *    - Edit the 'yourReels' array above with your video URLs
 *    - Run: await reelCommands.addCustom()
 * 
 * 3. List all reels:
 *    Run: await reelCommands.list()
 * 
 * 4. Add a single reel quickly:
 *    Run: await reelCommands.add('Title', 'https://video.mp4', 'WEDDING')
 * 
 * 5. To use in your app component:
 *    import { reelCommands } from '../utils/reelSetup';
 *    
 *    // In a useEffect or button press:
 *    await reelCommands.init(); // First time only
 */

export default reelCommands; 