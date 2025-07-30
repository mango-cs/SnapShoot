import { 
  REEL_CATEGORIES, 
  CATEGORY_LABELS, 
  CATEGORY_ICONS,
  getActiveReels,
  getReelsByCategory,
  addReel,
  updateReel,
  deleteReel,
  createReelFromUrl,
  Reel 
} from './reels';

/**
 * 🎭 Vibe Manager - Specialized Firebase management for "Discover with Vibe" section
 * 
 * This module provides easy-to-use functions for managing vibe-specific content
 * in Firebase, allowing for dynamic updates without app deployments.
 */

// Refined vibe categories with metadata
export const VIBE_CATEGORIES = {
  [REEL_CATEGORIES.WEDDING]: {
    label: CATEGORY_LABELS[REEL_CATEGORIES.WEDDING],
    icon: CATEGORY_ICONS[REEL_CATEGORIES.WEDDING],
    color: '#FF6B6B', // Romantic pink-red
    description: 'Capture the magic of wedding moments',
    priority: 1,
  },
  [REEL_CATEGORIES.CELEBRITY]: {
    label: CATEGORY_LABELS[REEL_CATEGORIES.CELEBRITY],
    icon: CATEGORY_ICONS[REEL_CATEGORIES.CELEBRITY],
    color: '#FFD700', // Gold
    description: 'Glamorous celebrity-style photoshoots',
    priority: 2,
  },
  [REEL_CATEGORIES.CAR_DELIVERY]: {
    label: CATEGORY_LABELS[REEL_CATEGORIES.CAR_DELIVERY],
    icon: CATEGORY_ICONS[REEL_CATEGORIES.CAR_DELIVERY],
    color: '#32CD32', // Lime green
    description: 'Document exciting car delivery moments',
    priority: 3,
  },
  [REEL_CATEGORIES.BIRTH_VIDEO]: {
    label: CATEGORY_LABELS[REEL_CATEGORIES.BIRTH_VIDEO],
    icon: CATEGORY_ICONS[REEL_CATEGORIES.BIRTH_VIDEO],
    color: '#FFC0CB', // Pink
    description: 'Precious moments of new life',
    priority: 4,
  },
  [REEL_CATEGORIES.PARTY]: {
    label: CATEGORY_LABELS[REEL_CATEGORIES.PARTY],
    icon: CATEGORY_ICONS[REEL_CATEGORIES.PARTY],
    color: '#FF69B4', // Hot pink
    description: 'Fun party celebrations and events',
    priority: 5,
  },
  [REEL_CATEGORIES.CORPORATE]: {
    label: CATEGORY_LABELS[REEL_CATEGORIES.CORPORATE],
    icon: CATEGORY_ICONS[REEL_CATEGORIES.CORPORATE],
    color: '#45B7D1', // Corporate blue
    description: 'Professional corporate events and meetings',
    priority: 6,
  },
} as const;

/**
 * Get all reels organized by vibe category
 */
export const getReelsByVibe = async (): Promise<Record<string, Reel[]>> => {
  try {
    const allReels = await getActiveReels();
    const reelsByVibe: Record<string, Reel[]> = {};
    
    // Initialize all categories
    Object.keys(VIBE_CATEGORIES).forEach(category => {
      reelsByVibe[category] = [];
    });
    
    // Organize reels by category
    allReels.forEach(reel => {
      if (reelsByVibe[reel.category]) {
        reelsByVibe[reel.category].push(reel);
      }
    });
    
    return reelsByVibe;
  } catch (error) {
    console.error('Error fetching reels by vibe:', error);
    return {};
  }
};

/**
 * Get featured reels for the "Discover with Vibe" section (up to 6 reels)
 */
export const getFeaturedVibeReels = async (limit: number = 6): Promise<Reel[]> => {
  try {
    const allReels = await getActiveReels();
    
    // Get reels from priority categories first
    const priorityCategories = Object.entries(VIBE_CATEGORIES)
      .sort(([, a], [, b]) => a.priority - b.priority)
      .map(([category]) => category);
    
    const featuredReels: Reel[] = [];
    
    // Try to get at least one reel from each priority category
    for (const category of priorityCategories) {
      const categoryReels = allReels.filter(reel => reel.category === category);
      if (categoryReels.length > 0 && featuredReels.length < limit) {
        featuredReels.push(categoryReels[0]); // Take the first (highest order) reel
      }
    }
    
    // Fill remaining slots with any available reels
    const remainingReels = allReels.filter(reel => 
      !featuredReels.find(featured => featured.id === reel.id)
    );
    
    while (featuredReels.length < limit && remainingReels.length > 0) {
      featuredReels.push(remainingReels.shift()!);
    }
    
    return featuredReels;
  } catch (error) {
    console.error('Error fetching featured vibe reels:', error);
    return [];
  }
};

/**
 * Add a new vibe reel with category validation
 */
export const addVibeReel = async (
  title: string,
  videoUrl: string,
  category: keyof typeof VIBE_CATEGORIES,
  description?: string,
  thumbnailUrl?: string,
  order?: number
): Promise<string> => {
  if (!VIBE_CATEGORIES[category]) {
    throw new Error(`Invalid vibe category: ${category}`);
  }
  
  try {
    const reelId = await createReelFromUrl(
      title,
      videoUrl,
      category,
      order || 0,
      description,
      thumbnailUrl
    );
    
    console.log(`✅ Vibe reel "${title}" added to category "${VIBE_CATEGORIES[category].label}"`);
    return reelId;
  } catch (error) {
    console.error(`❌ Failed to add vibe reel "${title}":`, error);
    throw error;
  }
};

/**
 * Update vibe reel order for category prioritization
 */
export const updateVibeReelOrder = async (reelId: string, newOrder: number): Promise<void> => {
  try {
    await updateReel(reelId, { order: newOrder });
    console.log(`✅ Updated reel order to ${newOrder}`);
  } catch (error) {
    console.error('❌ Failed to update reel order:', error);
    throw error;
  }
};

/**
 * Get vibe category information
 */
export const getVibeCategoryInfo = (category: string) => {
  return VIBE_CATEGORIES[category as keyof typeof VIBE_CATEGORIES] || null;
};

/**
 * Check Firebase setup and validate vibe reels
 */
export const validateVibeSetup = async (): Promise<{
  isSetup: boolean;
  categoryCounts: Record<string, number>;
  totalReels: number;
  missingCategories: string[];
  recommendations: string[];
}> => {
  try {
    console.log('🔍 Validating Firebase vibe setup...');
    
    const reelsByVibe = await getReelsByVibe();
    const categoryCounts: Record<string, number> = {};
    const missingCategories: string[] = [];
    const recommendations: string[] = [];
    let totalReels = 0;
    
    // Check each vibe category
    Object.entries(VIBE_CATEGORIES).forEach(([category, info]) => {
      const count = reelsByVibe[category]?.length || 0;
      categoryCounts[category] = count;
      totalReels += count;
      
      if (count === 0) {
        missingCategories.push(`${info.icon} ${info.label}`);
        recommendations.push(`Add ${info.label.toLowerCase()} content: ${info.description}`);
      } else if (count < 2) {
        recommendations.push(`Consider adding more ${info.label.toLowerCase()} content for variety`);
      }
    });
    
    const isSetup = totalReels > 0 && missingCategories.length < Object.keys(VIBE_CATEGORIES).length;
    
    // General recommendations
    if (totalReels < 6) {
      recommendations.push('Add more reels to ensure good variety in the "Discover with Vibe" section');
    }
    
    console.log('\n📊 Vibe Setup Status:');
    console.log(`Total Reels: ${totalReels}`);
    console.log(`Categories with content: ${Object.keys(VIBE_CATEGORIES).length - missingCategories.length}/${Object.keys(VIBE_CATEGORIES).length}`);
    
    if (missingCategories.length > 0) {
      console.log(`Missing categories: ${missingCategories.join(', ')}`);
    }
    
    return {
      isSetup,
      categoryCounts,
      totalReels,
      missingCategories,
      recommendations,
    };
  } catch (error) {
    console.error('❌ Failed to validate vibe setup:', error);
    return {
      isSetup: false,
      categoryCounts: {},
      totalReels: 0,
      missingCategories: Object.values(VIBE_CATEGORIES).map(v => `${v.icon} ${v.label}`),
      recommendations: ['Fix Firebase connection and try again'],
    };
  }
};

/**
 * Quick setup with sample vibe reels
 */
export const setupVibeReels = async (): Promise<void> => {
  console.log('🚀 Setting up vibe reels...');
  
  const vibeReels = [
    {
      title: 'Magical Wedding Moments',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      category: REEL_CATEGORIES.WEDDING,
      description: 'Beautiful wedding ceremony highlights',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Wedding+💒',
      order: 1,
    },
    {
      title: 'Celebrity Style Shoot',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      category: REEL_CATEGORIES.CELEBRITY,
      description: 'Glamorous celebrity photoshoot session',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FFD700/FFFFFF?text=Celebrity+⭐',
      order: 2,
    },
    {
      title: 'Dream Car Delivery',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      category: REEL_CATEGORIES.CAR_DELIVERY,
      description: 'Capturing the excitement of car delivery',
      thumbnailUrl: 'https://via.placeholder.com/300x400/32CD32/FFFFFF?text=Car+Delivery+🚗',
      order: 3,
    },
    {
      title: 'Precious Birth Video',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      category: REEL_CATEGORIES.BIRTH_VIDEO,
      description: 'Documenting precious first moments',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FFC0CB/FFFFFF?text=Birth+👶',
      order: 4,
    },
    {
      title: 'Epic Party Highlights',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      category: REEL_CATEGORIES.PARTY,
      description: 'Fun party celebration moments',
      thumbnailUrl: 'https://via.placeholder.com/300x400/FF69B4/FFFFFF?text=Party+🎉',
      order: 5,
    },
    {
      title: 'Corporate Excellence',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      category: REEL_CATEGORIES.CORPORATE,
      description: 'Professional corporate event coverage',
      thumbnailUrl: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Corporate+🏢',
      order: 6,
    },
  ];
  
  try {
    for (const reel of vibeReels) {
      await addVibeReel(
        reel.title,
        reel.videoUrl,
        reel.category as keyof typeof VIBE_CATEGORIES,
        reel.description,
        reel.thumbnailUrl,
        reel.order
      );
    }
    
    console.log('✅ Vibe reels setup completed successfully!');
    await validateVibeSetup(); // Show validation results
  } catch (error) {
    console.error('❌ Failed to setup vibe reels:', error);
  }
};

export default {
  getReelsByVibe,
  getFeaturedVibeReels,
  addVibeReel,
  updateVibeReelOrder,
  getVibeCategoryInfo,
  validateVibeSetup,
  setupVibeReels,
  VIBE_CATEGORIES,
}; 