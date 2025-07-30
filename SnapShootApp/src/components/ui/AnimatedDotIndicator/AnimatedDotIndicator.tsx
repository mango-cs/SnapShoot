import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';

interface AnimatedDotIndicatorProps {
  isActive: boolean;
  onPress: () => void;
  animationSource?: any; // Lottie animation source
  size?: number;
}

const AnimatedDotIndicator: React.FC<AnimatedDotIndicatorProps> = ({
  isActive,
  onPress,
  animationSource,
  size = 8,
}) => {
  const animatedValue = useRef(new Animated.Value(isActive ? 1 : 0)).current;
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  const handlePress = () => {
    onPress();
    
    // Play Lottie animation when pressed
    if (animationSource && lottieRef.current) {
      lottieRef.current.play();
    }
  };

  const dotColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.5)', '#FFFFFF'],
  });

  const dotScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {animationSource ? (
        // Render Lottie animation if provided
        <View style={[styles.animationContainer, { width: size * 2, height: size * 2 }]}>
          <LottieView
            ref={lottieRef}
            source={animationSource}
            style={styles.lottieAnimation}
            loop={false}
            autoPlay={false}
          />
          {/* Fallback dot overlay for visual feedback */}
          <Animated.View
            style={[
              styles.dotOverlay,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: dotColor,
                transform: [{ scale: dotScale }],
              },
            ]}
          />
        </View>
      ) : (
        // Fallback to regular animated dot
        <Animated.View
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: dotColor,
              transform: [{ scale: dotScale }],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    padding: 4,
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  dotOverlay: {
    position: 'absolute',
  },
  dot: {
    // Base dot styles will be applied inline
  },
});

export default AnimatedDotIndicator; 