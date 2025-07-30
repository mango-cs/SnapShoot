import { uploadImage, ONBOARDING_IMAGES } from './storage';

/**
 * Upload local onboarding images to Firebase Storage
 * This is a utility function for development to migrate local assets to Firebase
 * Note: This requires the images to be accessible as Files/Blobs
 */
export const uploadOnboardingImages = async () => {
  console.log('Starting upload of onboarding images to Firebase Storage...');
  
  try {
    // Note: In a real React Native app, you would need to:
    // 1. Convert your local assets to File/Blob objects
    // 2. Or use a different approach like uploading via web interface
    
    console.log('⚠️  Manual Upload Required:');
    console.log('Since these are local assets, you need to manually upload them to Firebase Storage:');
    console.log('');
    console.log('1. Go to Firebase Console > Storage');
    console.log('2. Create an "onboarding" folder');
    console.log('3. Upload these files with exact names:');
    console.log('   - wedding-scene.jpg');
    console.log('   - corporate-scene.jpg');
    console.log('   - celebrity-scene.jpg');
    console.log('');
    console.log('Local file locations:');
    console.log('   - assets/images/onboarding/wedding-scene.jpg');
    console.log('   - assets/images/onboarding/corporate-scene.jpg');
    console.log('   - assets/images/onboarding/celebrity-scene.jpg');
    
    return {
      success: false,
      message: 'Manual upload required - see console for instructions'
    };
  } catch (error) {
    console.error('Error in upload process:', error);
    throw error;
  }
};

/**
 * Upload a single image from a URL or File
 * This can be used for uploading from web interface or external URLs
 */
export const uploadSingleImage = async (
  source: File | Blob | string, 
  storagePath: string,
  fileName: string
): Promise<{ url: string; path: string }> => {
  try {
    let fileToUpload: File | Blob;
    
    if (typeof source === 'string') {
      // If source is a URL, fetch it as a blob
      const response = await fetch(source);
      fileToUpload = await response.blob();
    } else {
      fileToUpload = source;
    }
    
    const result = await uploadImage(fileToUpload, `${storagePath}/${fileName}`);
    console.log(`✅ Uploaded ${fileName} successfully:`, result.url);
    
    return {
      url: result.url,
      path: result.path
    };
  } catch (error) {
    console.error(`❌ Failed to upload ${fileName}:`, error);
    throw error;
  }
};

/**
 * Validate that all onboarding images are uploaded and accessible
 */
export const validateOnboardingImages = async () => {
  console.log('Validating onboarding images in Firebase Storage...');
  
  try {
    const { getOnboardingImages } = await import('./storage');
    const images = await getOnboardingImages();
    
    console.log('✅ All onboarding images are accessible:');
    console.log('Wedding:', images.wedding);
    console.log('Corporate:', images.corporate);
    console.log('Celebrity:', images.celebrity);
    
    return {
      success: true,
      images
    };
  } catch (error) {
    console.error('❌ Some onboarding images are missing or inaccessible:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}; 