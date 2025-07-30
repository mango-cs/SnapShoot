import { TranslationKeys } from './en';

export const te: TranslationKeys = {
  // Common
  common: {
    loading: 'లోడ్ అవుతోంది...',
    error: 'దోషం',
    success: 'విజయం',
    ok: 'సరే',
    cancel: 'రద్దు చేయండి',
    save: 'భద్రపరచండి',
    continue: 'కొనసాగించండి',
    back: 'వెనుకకు',
    close: 'మూసివేయండి',
    apply: 'దరఖాస్తు చేయండి',
    bookNow: 'ఇప్పుడే బుక్ చేయండి',
    contact: 'సంప్రదించండి',
    madeWithLove: 'భారతదేశంలో ❤️ తో తయారు చేయబడింది! 🇮🇳',
    version: 'స్నాప్‌షూట్ v1.0 • జ్ఞాపకాలను క్యాప్చర్ చేయడం, ఒక క్లిక్‌లో',
  },

  // Authentication
  auth: {
    welcome: 'స్నాప్‌షూట్‌కు స్వాగతం',
    getStarted: 'ప్రారంభించండి',
    phoneNumber: 'ఫోన్ నంబర్',
    enterPhone: 'మీ ఫోన్ నంబర్‌ను నమోదు చేయండి',
    otpVerification: 'OTP ధృవీకరణ',
    enterOtp: 'మీకు పంపబడిన 6 అంకెల కోడ్‌ను నమోదు చేయండి',
    verifyOtp: 'OTP ధృవీకరించండి',
    resendOtp: 'OTP మళ్లీ పంపండి',
    resendOtpIn: 'OTP మళ్లీ పంపండి',
    otpExpired: 'OTP గడువు ముగిసింది',
    invalidOtp: 'చెల్లని OTP. దయచేసి మళ్లీ ప్రయత్నించండి.',
    otpSent: 'OTP విజయవంతంగా పంపబడింది',
    failedToSendOtp: 'OTP పంపడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.',
    failedToVerifyOtp: 'OTP ధృవీకరణలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.',
    completeOtp: 'దయచేసి పూర్తి 6 అంకెల OTP ను నమోదు చేయండి',
  },

  // Home Screen
  home: {
    greeting: 'హలో',
    motivationalText: 'మీరు సరైన స్థలంలో ఉన్నారు! ✨',
    quickActions: {
      bookNow: 'ఇప్పుడే బుక్ చేయండి',
      packages: 'ప్యాకేజీలు',
      myWallet: 'నా వాలెట్',
      support: 'మద్దతు',
    },
    heroBanner: {
      title: 'రీల్స్ సృష్టించబడ్డాయి\nమరియు వెంటనే\nడెలివరీ చేయబడ్డాయి! 🎬',
    },
    features: {
      socialMedia: 'సోషల్ మీడియా కోసం ప్రత్యేకంగా రీల్స్‌లో నైపుణ్యం',
      bookInstantly: 'క్రమబద్ధమైన సెటప్‌తో తక్షణమే బుక్ చేయండి',
      realTimeCapture: 'వృత్తిపరమైన అవుట్‌పుట్‌తో రియల్ టైమ్ క్యాప్చర్',
      affordablePackages: 'నాణ్యతను రాజీ చేయకుండా సరసమైన ప్యాకేజీలు',
    },
    sections: {
      discoverWithVibe: 'వైబ్‌తో కనుగొనండి',
      instantDiscounts: 'తక్షణ తగ్గింపులు 🔥',
      popularServices: '🔥 ప్రముఖ సేవలు',
      recentBookings: '📋 ఇటీవలి బుకింగ్‌లు',
      topPhotographers: '👨‍🎨 మీ దగ్గరి అగ్రశ్రేణి ఫోటోగ్రాఫర్లు',
    },
    discounts: {
      flash50: {
        code: 'FLASH50',
        description: 'రూ.3000 కంటే ఎక్కువ ఖర్చుపై\n450 వరకు తగ్గింపు పొందండి',
        terms: 'ఒకసారి మాత్రమే వర్తిస్తుంది',
      },
      welcome100: {
        code: 'WELCOME100',
        description: 'మీ మొదటి బుకింగ్‌పై\n₹100 తగ్గింపు పొందండి',
        terms: 'కొత్త వినియోగదారులకు మాత్రమే చెల్లుతుంది',
      },
    },
    dobModal: {
      title: 'పుట్టిన తేదీని జోడించండి',
      description: 'మీ పుట్టినరోజున ప్రత్యేక ప్రయోజనాలు మరియు తగ్గింపులను అన్‌లాక్ చేయడానికి మీ పుట్టిన తేదీని జోడించండి.',
    },
    bookingStatus: {
      completed: 'పూర్తైంది',
      upcoming: 'రాబోయేది',
      pending: 'వేచి ఉంది',
      cancelled: 'రద్దు చేయబడింది',
    },
  },

  // Profile
  profile: {
    editProfile: 'ప్రొఫైల్‌ను సవరించండి',
    yourName: 'మీ పేరు*',
    email: 'ఇమెయిల్*',
    mobileNumber: 'మొబైల్ నంబర్*',
    dateOfBirth: 'పుట్టిన తేదీ*',
    gender: 'లింగం*',
    male: '♂ పురుషుడు',
    female: '♀ స్త్రీ',
    saveChanges: 'మార్పులను భద్రపరచండి',
    profileUpdated: 'ప్రొఫైల్ విజయవంతంగా అప్‌డేట్ చేయబడింది!',
    enterName: 'మీ పేరును నమోదు చేయండి',
    enterEmail: 'మీ ఇమెయిల్‌ను నమోదు చేయండి',
    enterMobile: 'మొబైల్ నంబర్‌ను నమోదు చేయండి',
    datePlaceholder: 'YYYY-MM-DD',
    nameRequired: 'పేరు అవసరం',
    emailRequired: 'ఇమెయిల్ అవసరం',
    dobRequired: 'పుట్టిన తేదీ అవసరం',
  },

  // Language
  language: {
    selectLanguage: 'భాషను ఎంచుకోండి',
    english: 'English',
    hindi: 'हिंदी',
    telugu: 'తెలుగు',
    tamil: 'தமிழ்',
    kannada: 'ಕನ್ನಡ',
  },

  // Cities
  cities: {
    selectCity: 'నగరాన్ని ఎంచుకోండి',
    hyderabad: 'హైదరాబాద్',
    bangalore: 'బెంగళూరు',
    chennai: 'చెన్నై',
    mumbai: 'ముంబై',
    vijayawada: 'విజయవాడ',
    warangal: 'వరంగల్',
  },

  // Services
  services: {
    weddingPhotography: 'వివాహ ఫోటోగ్రఫీ',
    birthdayShoot: 'పుట్టినరోజు షూట్',
    corporateEvents: 'కార్పొరేట్ ఈవెంట్స్',
    portraitPhotography: 'పోర్ట్రెయిట్ ఫోటోగ్రఫీ',
    eventPhotography: 'ఈవెంట్ ఫోటోగ్రఫీ',
    comingSoon: 'ఫీచర్ త్వరలో వస్తుంది!',
    serviceDetails: 'సేవా వివరాలు త్వరలో వస్తాయి!',
    photographerProfile: 'ఫోటోగ్రాఫర్ ప్రొఫైల్ త్వరలో వస్తుంది!',
  },

  // Navigation
  navigation: {
    home: 'హోమ్',
    explore: 'అన్వేషించండి',
    wallet: 'వాలెట్',
    profile: 'ప్రొఫైల్',
    bookings: 'బుకింగ్‌లు',
  },

  // Coupons
  coupons: {
    applied: 'మీ ఖాతాకు వర్తింపజేయబడింది!',
    couponApplied: 'కూపన్ వర్తింపజేయబడింది',
  },

  // Onboarding
  onboarding: {
    loadingExperience: 'అనుభవం లోడ్ అవుతోంది...',
    scenes: {
      wedding: {
        title: 'మీ ప్రత్యేక రోజును క్యాప్చర్ చేయండి',
        subtitle: 'ఆందోళన లేదు! మా రీల్ మేకర్లు దీన్ని చూసుకుంటారు. ప్రత్యేక సందర్భం కోసం అందమైన రీల్ చేయండి.',
      },
      corporate: {
        title: 'వృత్తిపరమైన కార్పొరేట్ ఈవెంట్స్',
        subtitle: 'మీ వ్యాపార ఈవెంట్లు మరియు సమావేశాలకు అధిక నాణ్యత ఫోటోగ్రఫీ మరియు వీడియోగ్రఫీ.',
      },
      celebrity: {
        title: 'సెలబ్రిటీ స్టైల్ షూట్స్',
        subtitle: 'మిమ్మల్ని ఎలా ప్రకాశవంతం చేయాలో తెలిసిన మా వృత్తిపరమైన ఫోటోగ్రాఫర్లతో ఆ పరిపూర్ణ షాట్ పొందండి.',
      },
    },
  },
}; 