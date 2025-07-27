import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../contexts/ThemeContext';

interface ServiceCardProps {
  title: string;
  subtitle: string;
  description?: string;
  image?: any;
  onPress?: () => void;
  style?: ViewStyle;
  size?: 'small' | 'medium' | 'large';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  image,
  onPress,
  style,
  size = 'medium',
}) => {
  const { theme } = useTheme();

  const cardStyle = [
    styles.card,
    styles[size],
    { backgroundColor: theme.colors.background.secondary },
    style,
  ];

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
      {image ? (
        <ImageBackground source={image} style={styles.imageBackground} imageStyle={styles.image}>
          <View style={[styles.overlay, { backgroundColor: theme.colors.background.overlay }]}>
            <View style={styles.content}>
              <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                {title}
              </Text>
              <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
                {subtitle}
              </Text>
              {description && (
                <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                  {description}
                </Text>
              )}
            </View>
            <View style={styles.arrow}>
              <Text style={[styles.arrowText, { color: theme.colors.text.accent }]}>➝</Text>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.contentContainer}>
          <View style={[styles.placeholderImage, { backgroundColor: theme.colors.background.tertiary }]}>
            <Text style={[styles.placeholderEmoji, { color: theme.colors.text.secondary }]}>
              {getEmojiForService(title)}
            </Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.title, { color: theme.colors.text.primary }]}>
              {title}
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
              {subtitle}
            </Text>
            {description && (
              <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
                {description}
              </Text>
            )}
          </View>
          <View style={styles.arrow}>
            <Text style={[styles.arrowText, { color: theme.colors.text.accent }]}>➝</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getEmojiForService = (title: string): string => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('wedding')) return '💒';
  if (lowerTitle.includes('corporate')) return '🏢';
  if (lowerTitle.includes('celebrity')) return '⭐';
  if (lowerTitle.includes('birthday')) return '🎂';
  if (lowerTitle.includes('brand')) return '📸';
  if (lowerTitle.includes('event')) return '🎉';
  return '📷';
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  small: {
    height: 120,
  },
  medium: {
    height: 160,
  },
  large: {
    height: 200,
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderRadius: 12,
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  placeholderEmoji: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ServiceCard; 