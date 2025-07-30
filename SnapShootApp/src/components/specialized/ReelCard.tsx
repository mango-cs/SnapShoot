import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useTheme } from '../../contexts/ThemeContext';
import { Reel, CATEGORY_LABELS, CATEGORY_ICONS } from '../../services/firebase/reels';

const { width } = Dimensions.get('window');

interface ReelCardProps {
  reel: Reel;
  onPress?: (reel: Reel) => void;
  autoPlay?: boolean;
  muted?: boolean;
  style?: any;
}

export const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  onPress,
  autoPlay = false,
  muted = true,
  style,
}) => {
  const { theme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<Video>(null);

  const handlePress = () => {
    if (onPress) {
      onPress(reel);
    } else {
      togglePlay();
    }
  };

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        setShowThumbnail(false);
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
    setShowThumbnail(true);
  };

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        setIsPlaying(false);
        setShowThumbnail(true);
      }
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.videoContainer}>
        {/* Video Player */}
        <Video
          ref={videoRef}
          source={{ uri: reel.videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay={isPlaying && !showThumbnail}
          isLooping={false}
          isMuted={muted}
          onLoad={handleVideoLoad}
          onError={handleVideoError}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onLoadStart={() => setIsLoading(true)}
        />

        {/* Thumbnail Overlay */}
        {showThumbnail && reel.thumbnailUrl && !hasError && (
          <Image 
            source={{ uri: reel.thumbnailUrl }}
            style={styles.thumbnail}
            onError={() => setShowThumbnail(false)}
          />
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator 
              size="large" 
              color={theme.colors.brand.primary} 
            />
          </View>
        )}

        {/* Error State */}
        {hasError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorIcon}>📱</Text>
            <Text style={[styles.errorText, { color: theme.colors.text.tertiary }]}>
              Unable to load video
            </Text>
          </View>
        )}

        {/* Play Button Overlay */}
        {showThumbnail && !isLoading && !hasError && (
          <TouchableOpacity 
            style={styles.playButton}
            onPress={togglePlay}
          >
            <View style={[styles.playIcon, { backgroundColor: theme.colors.brand.primary }]}>
              <Text style={styles.playIconText}>▶</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Category Badge - Top Right Corner */}
        <View style={[styles.categoryBadgeTopRight, { backgroundColor: theme.colors.brand.primary }]}>
          <Text style={styles.categoryText}>
            {CATEGORY_LABELS[reel.category as keyof typeof CATEGORY_LABELS] || reel.category.charAt(0).toUpperCase() + reel.category.slice(1)}
          </Text>
        </View>

        {/* Content Overlay */}
        <View style={styles.contentOverlay}>
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.categoryIcon}>
                {CATEGORY_ICONS[reel.category as keyof typeof CATEGORY_ICONS] || '🎬'}
              </Text>
              <Text style={styles.title} numberOfLines={1}>
                {reel.title}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 180,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  thumbnail: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  errorIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 2,
  },
  playIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  playIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 2, // Center the play triangle
  },
  categoryBadgeTopRight: {
    position: 'absolute',
    top: 8,
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    minWidth: 45,
    maxWidth: 60,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  contentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 32,
  },
  titleContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    marginLeft: 4,
    flex: 1,
  },
  categoryIcon: {
    fontSize: 12,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ReelCard; 