import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { PrimaryButton } from '../../components/ui/Button';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: any; // For now, we'll use placeholder
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Is it your Wedding Day?",
    subtitle: "Don't Worry! Our reelmakers...",
    description: "Connect with professional photographers and videographers for your special day",
    image: null, // Placeholder for wedding image
  },
  {
    id: 2,
    title: "Corporate Excellence",
    subtitle: "Capture Your Success",
    description: "Professional photography for corporate events, meetings, and brand showcases",
    image: null, // Placeholder for corporate image
  },
  {
    id: 3,
    title: "Celebrity Moments",
    subtitle: "Star Quality Content",
    description: "High-end photography and videography services for special occasions",
    image: null, // Placeholder for celebrity image
  },
];

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
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
    navigation.navigate('Login' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: theme.colors.text.secondary }]}>
          Skip
        </Text>
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
            {/* Background Image Placeholder */}
            <View style={[styles.imageContainer, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.imagePlaceholder, { color: theme.colors.text.tertiary }]}>
                📸 {slide.title} Image
              </Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                {slide.title}
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.text.accent }]}>
                {slide.subtitle}
              </Text>
              <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: currentSlide === index 
                  ? theme.colors.brand.primary 
                  : theme.colors.text.tertiary,
              },
            ]}
            onPress={() => goToSlide(index)}
          />
        ))}
      </View>

      {/* Get Started Button */}
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
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  imagePlaceholder: {
    fontSize: 24,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});

export default OnboardingScreen; 