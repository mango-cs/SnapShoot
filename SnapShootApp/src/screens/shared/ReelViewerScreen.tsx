import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  PanResponder,
  Animated,
  Platform,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useTheme } from '../../contexts/ThemeContext';
import { Reel } from '../../services/firebase/reels';

const { width, height } = Dimensions.get('window');

interface ReelViewerScreenProps {
  reels: Reel[];
  initialIndex: number;
  onClose: () => void;
}

export const ReelViewerScreen: React.FC<ReelViewerScreenProps> = ({
  reels,
  initialIndex,
  onClose,
}) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<Video>(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentReel = reels[currentIndex];

  // Memoize animation control to prevent useInsertionEffect warnings
  const startProgressAnimation = useCallback(() => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 15000, // 15 seconds per reel
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && currentIndex < reels.length - 1) {
        goToNext();
      }
    });
  }, [currentIndex, reels.length]);

  const stopProgressAnimation = useCallback(() => {
    progressAnim.stopAnimation();
  }, []);

  // Auto-progress animation
  useEffect(() => {
    if (isPlaying) {
      startProgressAnimation();
    } else {
      stopProgressAnimation();
    }

    return () => {
      stopProgressAnimation();
    };
  }, [currentIndex, isPlaying, startProgressAnimation, stopProgressAnimation]);

  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
    }
  };

  const handleVideoProgress = (status: any) => {
    if (status.isLoaded && status.durationMillis) {
      const progressValue = status.positionMillis / status.durationMillis;
      setProgress(progressValue);
    }
    
    if (status.didJustFinish) {
      goToNext();
    }
  };

  // Pan responder for tap zones
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderGrant: (evt) => {
      const { locationX } = evt.nativeEvent;
      const tapZoneWidth = width / 3;
      
      if (locationX < tapZoneWidth) {
        // Left zone - previous reel
        goToPrevious();
      } else if (locationX > width - tapZoneWidth) {
        // Right zone - next reel
        goToNext();
      } else {
        // Middle zone - toggle play/pause
        togglePlayPause();
      }
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Video player - Full screen */}
      <Video
        ref={videoRef}
        source={{ uri: currentReel.videoUrl }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isPlaying}
        isLooping={false}
        isMuted={false}
        onPlaybackStatusUpdate={handleVideoProgress}
      />

      {/* Progress bars at top */}
      <View style={styles.progressContainer}>
        {reels.map((_, index) => (
          <View key={index} style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: index === currentIndex 
                    ? progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      })
                    : index < currentIndex ? '100%' : '0%',
                  backgroundColor: '#FFFFFF',
                }
              ]}
            />
          </View>
        ))}
      </View>

      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>

      {/* Tap zones overlay */}
      <View style={styles.tapZonesContainer} {...panResponder.panHandlers}>
        {/* Left tap zone */}
        <View style={styles.leftTapZone} />
        
        {/* Middle tap zone */}
        <View style={styles.middleTapZone} />
        
        {/* Right tap zone */}
        <View style={styles.rightTapZone} />
      </View>

      {/* Content overlay - Moved to bottom */}
      <View style={styles.contentOverlay}>
        <View style={styles.reelInfo}>
          <Text style={styles.reelTitle}>{currentReel.title}</Text>
          {currentReel.description && (
            <Text style={styles.reelDescription}>{currentReel.description}</Text>
          )}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {currentReel.category.charAt(0).toUpperCase() + currentReel.category.slice(1)}
            </Text>
          </View>
        </View>
      </View>

      {/* Play/Pause indicator */}
      {!isPlaying && (
        <View style={styles.playPauseIndicator}>
          <Text style={styles.playPauseIcon}>▶</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  progressContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 20 : 15,
    left: 10,
    right: 10,
    flexDirection: 'row',
    zIndex: 1000,
    gap: 4,
  },
  progressBarBackground: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 1,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    right: 20,
    zIndex: 1001,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tapZonesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 998,
  },
  leftTapZone: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  middleTapZone: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  rightTapZone: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentOverlay: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20, // Account for safe area on iOS
    left: 20,
    right: 20,
    zIndex: 999,
  },
  reelInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reelTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reelDescription: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  playPauseIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  playPauseIcon: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 2,
  },
});

export default ReelViewerScreen; 