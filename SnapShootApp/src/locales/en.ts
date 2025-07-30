export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    ok: 'OK',
    cancel: 'Cancel',
    save: 'Save',
    continue: 'Continue',
    back: 'Back',
    close: 'Close',
    apply: 'Apply',
    bookNow: 'Book Now',
    contact: 'Contact',
    madeWithLove: 'Made with ❤️ in India! 🇮🇳',
    version: 'SnapShoot v1.0 • Capturing memories, one click at a time',
  },

  // Authentication
  auth: {
    welcome: 'Welcome to SnapShoot',
    getStarted: 'Get Started',
    phoneNumber: 'Phone Number',
    enterPhone: 'Enter your phone number',
    otpVerification: 'OTP Verification',
    enterOtp: 'Please enter 6-digit code sent to you at',
    verifyOtp: 'Verify OTP',
    resendOtp: 'Resend OTP',
    resendOtpIn: 'Resend OTP in',
    otpExpired: 'OTP expired',
    invalidOtp: 'Invalid OTP. Please try again.',
    otpSent: 'OTP sent successfully',
    failedToSendOtp: 'Failed to send OTP. Please try again.',
    failedToVerifyOtp: 'Failed to verify OTP. Please try again.',
    completeOtp: 'Please enter the complete 6-digit OTP',
  },

  // Home Screen
  home: {
    greeting: 'Hi',
    motivationalText: 'You are just in the right place! ✨',
    quickActions: {
      bookNow: 'Book Now',
      packages: 'Packages',
      myWallet: 'My Wallet',
      support: 'Support',
    },
    heroBanner: {
      title: 'Reels Created\nAnd Delivered\nOn The Spot! 🎬',
    },
    features: {
      socialMedia: 'Skilled in reels specifically for social media',
      bookInstantly: 'Book instantly with a streamlined setup',
      realTimeCapture: 'Real time capture with professional output',
      affordablePackages: 'Affordable packages without compromising quality',
    },
    sections: {
      discoverWithVibe: 'Discover with Vibe',
      instantDiscounts: 'Instant Discounts 🔥',
      popularServices: '🔥 Popular Services',
      recentBookings: '📋 Recent Bookings',
      topPhotographers: '👨‍🎨 Top Photographers Near You',
    },
    discounts: {
      flash50: {
        code: 'FLASH50',
        description: 'Get upto 450 off on spends above\nRs.3000',
        terms: 'Applicable for one time',
      },
      welcome100: {
        code: 'WELCOME100',
        description: 'Get ₹100 off on your first\nbooking',
        terms: 'Valid for new users only',
      },
    },
    dobModal: {
      title: 'Add Date of Birth',
      description: 'Add your DOB to unlock special benefits and discounts on your Birthday.',
    },
    bookingStatus: {
      completed: 'Completed',
      upcoming: 'Upcoming',
      pending: 'Pending',
      cancelled: 'Cancelled',
    },
  },

  // Profile
  profile: {
    editProfile: 'Edit Profile',
    yourName: 'Your name*',
    email: 'Email*',
    mobileNumber: 'Mobile Number*',
    dateOfBirth: 'Date of Birth*',
    gender: 'Gender*',
    male: '♂ Male',
    female: '♀ Female',
    saveChanges: 'Save Changes',
    profileUpdated: 'Profile updated successfully!',
    enterName: 'Enter your name',
    enterEmail: 'Enter your email',
    enterMobile: 'Enter mobile number',
    datePlaceholder: 'YYYY-MM-DD',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    dobRequired: 'Date of Birth is required',
  },

  // Language
  language: {
    selectLanguage: 'Select Language',
    english: 'English',
    hindi: 'हिंदी',
    telugu: 'తెలుగు',
    tamil: 'தமிழ்',
    kannada: 'ಕನ್ನಡ',
  },

  // Cities
  cities: {
    selectCity: 'Select City',
    hyderabad: 'Hyderabad',
    bangalore: 'Bangalore',
    chennai: 'Chennai',
    mumbai: 'Mumbai',
    vijayawada: 'Vijayawada',
    warangal: 'Warangal',
  },

  // Services
  services: {
    weddingPhotography: 'Wedding Photography',
    birthdayShoot: 'Birthday Shoot',
    corporateEvents: 'Corporate Events',
    portraitPhotography: 'Portrait Photography',
    eventPhotography: 'Event Photography',
    comingSoon: 'feature coming soon!',
    serviceDetails: 'Service details coming soon!',
    photographerProfile: 'Photographer profile coming soon!',
  },

  // Navigation
  navigation: {
    home: 'Home',
    explore: 'Explore',
    wallet: 'Wallet',
    profile: 'Profile',
    bookings: 'Bookings',
  },

  // Coupons
  coupons: {
    applied: 'has been applied to your account!',
    couponApplied: 'Coupon Applied',
  },

  // Onboarding
  onboarding: {
    loadingExperience: 'Loading experience...',
    scenes: {
      wedding: {
        title: 'Capture Your Special Day',
        subtitle: "Don't Worry! Our reelmakers have got it covered. Make a beautiful reel for the special occasion.",
      },
      corporate: {
        title: 'Professional Corporate Events',
        subtitle: 'High-quality photography and videography for your business events and meetings.',
      },
      celebrity: {
        title: 'Celebrity Style Shoots',
        subtitle: 'Get that perfect shot with our professional photographers who know how to make you shine.',
      },
    },
  },
};

export type TranslationKeys = typeof en; 