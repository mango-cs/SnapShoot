import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from './config';
import { Reel } from './reels';

/**
 * Simple Firebase Storage Reel Loader
 * Loads videos from reels/disover_the_vibe/ folder
 */

export interface StorageReel {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: string;
  order: number;
  filename: string;
}

/**
 * Get simple title from filename
 * birthday.mp4 -> Birthday
 * celebrity.mp4 -> Celebrity
 */
const getSimpleTitle = (filename: string): string => {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
};

/**
 * Get category from filename
 */
const getCategory = (filename: string): string => {
  const name = filename.toLowerCase();
  if (name.includes('wedding')) return 'wedding';
  if (name.includes('celebrity')) return 'celebrity';
  if (name.includes('corporate')) return 'corporate';
  if (name.includes('birthday') || name.includes('birth')) return 'party';
  if (name.includes('drone')) return 'event';
  if (name.includes('pet')) return 'portrait';
  return 'featured';
};

/**
 * Load reels from Firebase Storage reels/disover_the_vibe/ folder
 */
export const getStorageReels = async (): Promise<Reel[]> => {
  try {
    console.log('🔍 Loading reels from Firebase Storage...');
    
    const storageRef = ref(storage, 'reels/disover_the_vibe/');
    const result = await listAll(storageRef);
    
    console.log(`📁 Found ${result.items.length} files in reels/disover_the_vibe/`);
    
    if (result.items.length === 0) {
      console.log('📭 No videos found in reels/disover_the_vibe folder');
      return [];
    }

    const reels: Reel[] = [];
    
    for (let i = 0; i < result.items.length; i++) {
      const item = result.items[i];
      try {
        const videoUrl = await getDownloadURL(item);
        const filename = item.name;
        const title = getSimpleTitle(filename);
        const category = getCategory(filename);
        
        const reel: Reel = {
          id: `storage-${i}`,
          title: title,
          description: `${title} video`,
          videoUrl: videoUrl,
          thumbnailUrl: `https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=${encodeURIComponent(title)}`,
          category: category,
          order: i + 1,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        reels.push(reel);
        console.log(`✅ Added: ${title} (${filename})`);
        
      } catch (error) {
        console.error(`❌ Failed to process ${item.name}:`, error);
      }
    }
    
    console.log(`🎬 Successfully loaded ${reels.length} storage reels`);
    return reels;
    
  } catch (error) {
    console.error('❌ Failed to load storage reels:', error);
    return [];
  }
}; 