import { storage } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

export interface UploadResult {
  url: string;
  path: string;
  name: string;
}

/**
 * Upload an image to Firebase Storage
 * @param file - File or Blob to upload
 * @param path - Storage path (e.g., 'onboarding/wedding-scene.jpg')
 * @returns Promise with download URL and metadata
 */
export const uploadImage = async (file: File | Blob, path: string): Promise<UploadResult> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    
    return {
      url,
      path: snapshot.ref.fullPath,
      name: snapshot.ref.name,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(`Failed to upload image: ${error}`);
  }
};

/**
 * Get download URL for an existing image
 * @param path - Storage path (e.g., 'onboarding/wedding-scene.jpg')
 * @returns Promise with download URL
 */
export const getImageURL = async (path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw new Error(`Failed to get image URL: ${error}`);
  }
};

/**
 * Delete an image from Firebase Storage
 * @param path - Storage path (e.g., 'onboarding/wedding-scene.jpg')
 * @returns Promise
 */
export const deleteImage = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error(`Failed to delete image: ${error}`);
  }
};

/**
 * List all images in a folder
 * @param folderPath - Folder path (e.g., 'onboarding/')
 * @returns Promise with array of image URLs and metadata
 */
export const listImages = async (folderPath: string): Promise<UploadResult[]> => {
  try {
    const folderRef = ref(storage, folderPath);
    const result = await listAll(folderRef);
    
    const images: UploadResult[] = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          url,
          path: itemRef.fullPath,
          name: itemRef.name,
        };
      })
    );
    
    return images;
  } catch (error) {
    console.error('Error listing images:', error);
    throw new Error(`Failed to list images: ${error}`);
  }
};

/**
 * Onboarding image paths - predefined for easy access
 */
export const ONBOARDING_IMAGES = {
  WEDDING: 'onboarding/wedding-scene.png',
  CORPORATE: 'onboarding/corporate-scene.png',
  CELEBRITY: 'onboarding/celebrity-scene.png',
} as const;

/**
 * Get all onboarding image URLs
 * @returns Promise with object containing all onboarding image URLs
 */
export const getOnboardingImages = async () => {
  try {
    const [weddingURL, corporateURL, celebrityURL] = await Promise.all([
      getImageURL(ONBOARDING_IMAGES.WEDDING),
      getImageURL(ONBOARDING_IMAGES.CORPORATE),
      getImageURL(ONBOARDING_IMAGES.CELEBRITY),
    ]);

    return {
      wedding: weddingURL,
      corporate: corporateURL,
      celebrity: celebrityURL,
    };
  } catch (error) {
    console.error('Error getting onboarding images:', error);
    throw new Error(`Failed to get onboarding images: ${error}`);
  }
}; 