import { createReelFromUrl, REEL_CATEGORIES, getActiveReels, deleteReel } from './reels';

/**
 * Easy-to-use reel management functions
 * Use these functions to quickly add/manage reels in your Firebase
 */

// Helper function to add a reel from URL with minimal details
export const addReelQuick = async (
  title: string,
  videoUrl: string,
  category: keyof typeof REEL_CATEGORIES = 'FEATURED',
  description?: string,
  thumbnailUrl?: string
) => {
  try {
    const reelId = await createReelFromUrl(
      title,
      videoUrl,
      REEL_CATEGORIES[category],
      0, // Order will be set automatically
      description,
      thumbnailUrl
    );
    
    console.log(`✅ Reel "${title}" added successfully with ID: ${reelId}`);
    return reelId;
  } catch (error) {
    console.error(`❌ Failed to add reel "${title}":`, error);
    throw error;
  }
};

// Batch add multiple reels
export const addMultipleReels = async (reels: Array<{
  title: string;
  videoUrl: string;
  category?: keyof typeof REEL_CATEGORIES;
  description?: string;
  thumbnailUrl?: string;
}>) => {
  const results = [];
  
  for (const reel of reels) {
    try {
      const reelId = await addReelQuick(
        reel.title,
        reel.videoUrl,
        reel.category || 'FEATURED',
        reel.description,
        reel.thumbnailUrl
      );
      results.push({ success: true, reelId, title: reel.title });
    } catch (error) {
      results.push({ success: false, error, title: reel.title });
    }
  }
  
  return results;
};

// List all reels with their details
export const listAllReels = async () => {
  try {
    const reels = await getActiveReels();
    console.log('\n📱 Current Reels in Firebase:');
    console.log('================================');
    
    if (reels.length === 0) {
      console.log('No reels found. Use addReelQuick() to add some!');
      return [];
    }
    
    reels.forEach((reel, index) => {
      console.log(`${index + 1}. ${reel.title}`);
      console.log(`   Category: ${reel.category}`);
      console.log(`   Video URL: ${reel.videoUrl}`);
      if (reel.description) console.log(`   Description: ${reel.description}`);
      if (reel.thumbnailUrl) console.log(`   Thumbnail: ${reel.thumbnailUrl}`);
      console.log(`   ID: ${reel.id}`);
      console.log('   ---');
    });
    
    return reels;
  } catch (error) {
    console.error('Failed to list reels:', error);
    return [];
  }
};

// Remove a reel by ID
export const removeReel = async (reelId: string) => {
  try {
    await deleteReel(reelId);
    console.log(`✅ Reel with ID ${reelId} removed successfully`);
  } catch (error) {
    console.error(`❌ Failed to remove reel with ID ${reelId}:`, error);
    throw error;
  }
};

// Quick setup with sample reels (useful for testing)
export const setupSampleReels = async () => {
  console.log('🚀 Setting up sample reels...');
  
  const sampleReels = [
    {
      title: 'Wedding Highlights',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      category: 'WEDDING' as const,
      description: 'Beautiful wedding moments captured',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Wedding+💒',
    },
    {
      title: 'Celebrity Photoshoot',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      category: 'CELEBRITY' as const,
      description: 'Glamorous celebrity shoot session',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FFD700/FFFFFF?text=Celebrity+⭐',
    },
    {
      title: 'Corporate Event',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      category: 'CORPORATE' as const,
      description: 'Professional corporate coverage',
      thumbnailUrl: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Corporate+🏢',
    },
    {
      title: 'Party Celebration',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      category: 'PARTY' as const,
      description: 'Fun party moments captured',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FF69B4/FFFFFF?text=Party+🎉',
    },
    {
      title: 'Car Delivery Experience',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      category: 'CAR_DELIVERY' as const,
      description: 'Exciting car delivery documentation',
      thumbnailUrl: 'https://via.placeholder.com/300x400/32CD32/FFFFFF?text=Car+Delivery+🚗',
    },
    {
      title: 'Birth Video Documentation',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      category: 'BIRTH_VIDEO' as const,
      description: 'Precious moments of new life',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FFC0CB/FFFFFF?text=Birth+👶',
    },
  ];
  
  const results = await addMultipleReels(sampleReels);
  
  console.log('\n📊 Setup Results:');
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.title} - Added successfully`);
    } else {
      console.log(`❌ ${result.title} - Failed to add`);
    }
  });
  
  return results;
};

/**
 * USAGE EXAMPLES:
 * 
 * // Add a single reel quickly
 * await addReelQuick(
 *   'My Wedding Video',
 *   'https://your-video-url.mp4',
 *   'WEDDING',
 *   'Beautiful wedding highlights',
 *   'https://your-thumbnail-url.jpg'
 * );
 * 
 * // Add multiple reels at once
 * await addMultipleReels([
 *   {
 *     title: 'Video 1',
 *     videoUrl: 'https://video1.mp4',
 *     category: 'WEDDING'
 *   },
 *   {
 *     title: 'Video 2', 
 *     videoUrl: 'https://video2.mp4',
 *     category: 'PORTRAIT'
 *   }
 * ]);
 * 
 * // List all reels
 * await listAllReels();
 * 
 * // Setup sample reels for testing
 * await setupSampleReels();
 * 
 * // Remove a reel
 * await removeReel('reel-id-here');
 */

export default {
  addReelQuick,
  addMultipleReels,
  listAllReels,
  removeReel,
  setupSampleReels,
}; 