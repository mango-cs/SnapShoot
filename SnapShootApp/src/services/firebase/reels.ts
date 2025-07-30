import { collection, doc, getDocs, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { firestore as db, storage } from './config';

// Reel data structure
export interface Reel {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnailUrl?: string;
  category: string;
  duration?: number; // in seconds
  order: number; // for display ordering
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Reel categories - Refined for better vibe representation
export const REEL_CATEGORIES = {
  WEDDING: 'wedding',
  CELEBRITY: 'celebrity',
  CAR_DELIVERY: 'car_delivery',
  BIRTH_VIDEO: 'birth_video', 
  PARTY: 'party',
  CORPORATE: 'corporate',
  PORTRAIT: 'portrait',
  EVENT: 'event',
  FEATURED: 'featured',
} as const;

// Category display names for UI
export const CATEGORY_LABELS = {
  [REEL_CATEGORIES.WEDDING]: 'Wedding',
  [REEL_CATEGORIES.CELEBRITY]: 'Celebrity',
  [REEL_CATEGORIES.CAR_DELIVERY]: 'Car Delivery',
  [REEL_CATEGORIES.BIRTH_VIDEO]: 'Birth Video',
  [REEL_CATEGORIES.PARTY]: 'Party',
  [REEL_CATEGORIES.CORPORATE]: 'Corporate',
  [REEL_CATEGORIES.PORTRAIT]: 'Portrait',
  [REEL_CATEGORIES.EVENT]: 'Event',
  [REEL_CATEGORIES.FEATURED]: 'Featured',
} as const;

// Category icons/emojis for visual representation
export const CATEGORY_ICONS = {
  [REEL_CATEGORIES.WEDDING]: '💒',
  [REEL_CATEGORIES.CELEBRITY]: '⭐',
  [REEL_CATEGORIES.CAR_DELIVERY]: '🚗',
  [REEL_CATEGORIES.BIRTH_VIDEO]: '👶',
  [REEL_CATEGORIES.PARTY]: '🎉',
  [REEL_CATEGORIES.CORPORATE]: '🏢',
  [REEL_CATEGORIES.PORTRAIT]: '📸',
  [REEL_CATEGORIES.EVENT]: '🎪',
  [REEL_CATEGORIES.FEATURED]: '🌟',
} as const;

// Collection name
const REELS_COLLECTION = 'reels';

/**
 * Fetch all active reels ordered by display order
 */
export const getActiveReels = async (): Promise<Reel[]> => {
  try {
    const reelsRef = collection(db, REELS_COLLECTION);
    const snapshot = await getDocs(reelsRef);
    
    const reels = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      } as Reel))
      .filter(reel => reel.isActive)
      .sort((a, b) => a.order - b.order);
      
    return reels;
  } catch (error) {
    console.error('Error fetching reels:', error);
    return [];
  }
};

/**
 * Fetch reels by category
 */
export const getReelsByCategory = async (category: string): Promise<Reel[]> => {
  try {
    const allReels = await getActiveReels();
    return allReels.filter(reel => reel.category === category);
  } catch (error) {
    console.error('Error fetching reels by category:', error);
    return [];
  }
};

/**
 * Add a new reel
 */
export const addReel = async (reel: Omit<Reel, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const newReelRef = doc(collection(db, REELS_COLLECTION));
    await setDoc(newReelRef, {
      ...reel,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newReelRef.id;
  } catch (error) {
    console.error('Error adding reel:', error);
    throw error;
  }
};

/**
 * Update an existing reel
 */
export const updateReel = async (reelId: string, updates: Partial<Omit<Reel, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> => {
  try {
    const reelRef = doc(db, REELS_COLLECTION, reelId);
    await updateDoc(reelRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating reel:', error);
    throw error;
  }
};

/**
 * Delete a reel
 */
export const deleteReel = async (reelId: string): Promise<void> => {
  try {
    const reelRef = doc(db, REELS_COLLECTION, reelId);
    await deleteDoc(reelRef);
  } catch (error) {
    console.error('Error deleting reel:', error);
    throw error;
  }
};

/**
 * Upload video to Firebase Storage and get URL
 */
export const uploadReelVideo = async (
  videoUri: string, 
  reelId: string, 
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // Create a reference to the video file
    const videoRef = ref(storage, `reels/videos/${reelId}.mp4`);
    
    // Convert URI to blob (for web) or use URI directly (for mobile)
    const response = await fetch(videoUri);
    const blob = await response.blob();
    
    // Upload the file
    const snapshot = await uploadBytes(videoRef, blob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

/**
 * Upload thumbnail to Firebase Storage and get URL
 */
export const uploadReelThumbnail = async (
  thumbnailUri: string,
  reelId: string
): Promise<string> => {
  try {
    const thumbnailRef = ref(storage, `reels/thumbnails/${reelId}.jpg`);
    
    const response = await fetch(thumbnailUri);
    const blob = await response.blob();
    
    const snapshot = await uploadBytes(thumbnailRef, blob);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    throw error;
  }
};

/**
 * Delete video from Firebase Storage
 */
export const deleteReelVideo = async (reelId: string): Promise<void> => {
  try {
    const videoRef = ref(storage, `reels/videos/${reelId}.mp4`);
    await deleteObject(videoRef);
  } catch (error) {
    console.error('Error deleting video:', error);
    // Don't throw error as the file might not exist
  }
};

/**
 * Delete thumbnail from Firebase Storage
 */
export const deleteReelThumbnail = async (reelId: string): Promise<void> => {
  try {
    const thumbnailRef = ref(storage, `reels/thumbnails/${reelId}.jpg`);
    await deleteObject(thumbnailRef);
  } catch (error) {
    console.error('Error deleting thumbnail:', error);
    // Don't throw error as the file might not exist
  }
};

/**
 * Helper function to create a reel from a URL
 * This is useful for quickly adding reels from external URLs
 */
export const createReelFromUrl = async (
  title: string,
  videoUrl: string,
  category: string,
  order: number = 0,
  description?: string,
  thumbnailUrl?: string
): Promise<string> => {
  try {
    const reel: Omit<Reel, 'id' | 'createdAt' | 'updatedAt'> = {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      order,
      isActive: true,
    };
    
    return await addReel(reel);
  } catch (error) {
    console.error('Error creating reel from URL:', error);
    throw error;
  }
};

// Default/sample reels for initial setup with refined categories
export const SAMPLE_REELS = [
  {
    title: 'Wedding Magic',
    description: 'Beautiful wedding moments captured',
    category: REEL_CATEGORIES.WEDDING,
    order: 1,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Wedding+💒',
  },
  {
    title: 'Celebrity Shoot',
    description: 'Glamorous celebrity photoshoot',
    category: REEL_CATEGORIES.CELEBRITY,
    order: 2,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://via.placeholder.com/300x400/FFD700/FFFFFF?text=Celebrity+⭐',
  },
  {
    title: 'Corporate Events',
    description: 'Professional corporate coverage',
    category: REEL_CATEGORIES.CORPORATE,
    order: 3,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://via.placeholder.com/300x400/45B7D1/FFFFFF?text=Corporate+🏢',
  },
  {
    title: 'Party Highlights',
    description: 'Fun party celebrations captured',
    category: REEL_CATEGORIES.PARTY,
    order: 4,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://via.placeholder.com/300x400/FF69B4/FFFFFF?text=Party+🎉',
  },
  {
    title: 'Car Delivery Moments',
    description: 'Exciting car delivery documentation',
    category: REEL_CATEGORIES.CAR_DELIVERY,
    order: 5,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnailUrl: 'https://via.placeholder.com/300x400/32CD32/FFFFFF?text=Car+Delivery+🚗',
  },
  {
    title: 'Birth Video',
    description: 'Precious moments of new life',
    category: REEL_CATEGORIES.BIRTH_VIDEO,
    order: 6,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://via.placeholder.com/300x400/FFC0CB/FFFFFF?text=Birth+👶',
  },
];

/**
 * Initialize sample reels (run once to setup initial data)
 */
export const initializeSampleReels = async (): Promise<void> => {
  try {
    console.log('Initializing sample reels...');
    
    for (const sampleReel of SAMPLE_REELS) {
      await createReelFromUrl(
        sampleReel.title,
        sampleReel.videoUrl,
        sampleReel.category,
        sampleReel.order,
        sampleReel.description,
        sampleReel.thumbnailUrl
      );
    }
    
    console.log('Sample reels initialized successfully!');
  } catch (error) {
    console.error('Error initializing sample reels:', error);
  }
}; 