import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface AnimatedDotIndicatorProps {
  isActive: boolean;
  onPress: () => void;
  animationSource?: any; // Lottie animation source
}

export const AnimatedDotIndicator: React.FC<AnimatedDotIndicatorProps> = ({
  isActive,
  onPress,
  animationSource,
}) => {
  const { theme } = useTheme();
  const animationRef = useRef<LottieView>(null);

  const handlePress = () => {
    // Play animation on press
    if (animationRef.current && animationSource) {
      animationRef.current.play();
    }
    onPress();
  };

  useEffect(() => {
    // Auto-play animation when becomes active
    if (isActive && animationRef.current && animationSource) {
      animationRef.current.play();
    }
  }, [isActive, animationSource]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      activeOpacity={0.7}
    >
      {animationSource ? (
        <View style={styles.animationContainer}>
          <LottieView
            ref={animationRef}
            source={animationSource}
            style={[
              styles.animation,
              {
                opacity: isActive ? 1 : 0.5,
              },
            ]}
            autoPlay={false}
            loop={false}
            speed={1.2}
            colorFilters={[
              {
                keypath: '*',
                color: isActive ? theme.colors.brand.primary : theme.colors.text.tertiary,
              },
            ]}
          />
        </View>
      ) : (
        // Fallback to regular dot if no animation provided
        <View
          style={[
            styles.dot,
            {
              backgroundColor: isActive
                ? theme.colors.brand.primary
                : theme.colors.text.tertiary,
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8, // Touchable area
  },
  animationContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 20,
    height: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
}); 