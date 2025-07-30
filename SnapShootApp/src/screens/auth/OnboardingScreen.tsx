import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Animated,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { PrimaryButton } from '../../components/ui/Button';
import { getOnboardingImages } from '../../services/firebase';

const { width, height } = Dimensions.get('window');

// Local fallback images
const localImages = {
  wedding: require('../../../assets/images/onboarding/wedding-scene.jpg'),
  corporate: require('../../../assets/images/onboarding/corporate-scene.jpg'),
  celebrity: require('../../../assets/images/onboarding/celebrity-scene.jpg'),
};

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageKey: 'wedding' | 'corporate' | 'celebrity';
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Is it your Wedding Day?",
    subtitle: "Dont Worry! Our reelmakers have got it covered. Make a beautiful reel for the special occasion.",
    description: "",
    imageKey: 'wedding',
  },
  {
    id: 2,
    title: "Corporate Excellence",
    subtitle: "Capture all your achievements with elegance",
    description: "Professional photography for corporate events and brand showcases",
    imageKey: 'corporate',
  },
  {
    id: 3,
    title: "Celebrity Moments",
    subtitle: "Star quality content creation",
    description: "High-end photography and videography services for special occasions",
    imageKey: 'celebrity',
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [firebaseImages, setFirebaseImages] = useState<Record<string, string> | null>(null);
  const [imageLoadingError, setImageLoadingError] = useState<boolean>(false);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const dotAnimations = useRef(slides.map(() => new Animated.Value(0))).current;

  // Load Firebase images on component mount
  useEffect(() => {
    // Load Firebase images
    loadFirebaseImages();
  }, []);

  useEffect(() => {
    // Animate dots smoothly
    dotAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: currentSlide === index ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentSlide]);

  const loadFirebaseImages = async () => {
    try {
      console.log('Loading images from Firebase Storage...');
      const images = await getOnboardingImages();
      setFirebaseImages(images);
      setImageLoadingError(false);
      console.log('✅ Firebase images loaded successfully');
    } catch (error) {
      console.log('⚠️ Failed to load Firebase images, using local fallbacks:', error);
      setImageLoadingError(true);
      setFirebaseImages(null);
    } finally {
      setIsLoadingImages(false);
    }
  };

  const getImageSource = (imageKey: 'wedding' | 'corporate' | 'celebrity') => {
    // Use Firebase images if available, otherwise fallback to local images
    if (firebaseImages && !imageLoadingError) {
      return { uri: firebaseImages[imageKey] };
    }
    return localImages[imageKey];
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== currentSlide) {
      setCurrentSlide(slideIndex);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    navigation.navigate('Login' as never);
  };

  const handleSkip = () => {
    navigation.navigate('Main' as never);
  };

  if (isLoadingImages) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading experience...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            {/* Background Image - Full Screen */}
            <ImageBackground
              source={getImageSource(slide.imageKey)}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              {/* Subtle gradient overlay - from top with padding */}
              <View style={styles.gradientOverlay}>
                <View style={styles.bottomGradient} />
              </View>
              
              {/* Content positioned with proper spacing */}
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.subtitle}>{slide.subtitle}</Text>
                {slide.description && (
                  <Text style={styles.description}>{slide.description}</Text>
                )}
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      {/* Enhanced Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dotWrapper}
            onPress={() => goToSlide(index)}
          >
            <Animated.View
              style={[
                styles.dot,
                {
                  backgroundColor: dotAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(255, 255, 255, 0.4)', '#3B82F6'],
                  }),
                  transform: [{
                    scale: dotAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3],
                    }),
                  }],
                  shadowOpacity: dotAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.3],
                  }),
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Enhanced Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          onPress={handleNext}
          size="large"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 15, // Highest z-index to be above everything
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly stronger for better visibility
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height, // Full screen height
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'transparent',
    // Create gradient effect for content readability
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Stronger black for proper text readability
  },
  contentContainer: {
    position: 'absolute',
    bottom: 185, // Moved up from 140 to position text higher
    left: 0,
    right: 0,
    paddingHorizontal: 28,
    zIndex: 5, // Ensure content is above gradients
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'left',
    marginBottom: 12,
    color: '#FFFFFF',
    lineHeight: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    lineHeight: 24,
    color: 'rgba(255, 255, 255, 0.95)',
    paddingRight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.85)',
    paddingRight: 24,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Reduced by 15% from 24
    paddingTop: 14, // Reduced by 15% from 16
    zIndex: 10, // Above everything else
  },
  dotWrapper: {
    padding: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 28,
    paddingBottom: 44,
    zIndex: 10, // Above everything else
  },
});

export default OnboardingScreen; 