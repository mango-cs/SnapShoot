// Firebase configuration and app instance
export { default as firebaseApp, auth, storage, firestore } from './config';

// Storage utilities
export {
  uploadImage,
  getImageURL,
  deleteImage,
  listImages,
  getOnboardingImages,
  ONBOARDING_IMAGES,
  type UploadResult,
} from './storage';

// Upload helpers
export {
  uploadOnboardingImages,
  uploadSingleImage,
  validateOnboardingImages,
} from './upload-helper'; 