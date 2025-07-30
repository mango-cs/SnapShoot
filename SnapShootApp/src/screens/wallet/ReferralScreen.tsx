import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Clipboard,
  Share,
  Linking,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const GRID_GUTTER = 24;
const ITEM_SIZE = (width - 16 * 2 - GRID_GUTTER * 2) / 3; // 3 columns

// Pill styling constants
const PILL_BG = '#32343a';   // grey pill background
const PILL_RAD = 14;         // rounded corners
const PILL_HPAD = 20;

const ReferralScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [referralCode] = useState('YCYKSN8A');
  const [copyPressed, setCopyPressed] = useState(false);

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Hero fade-in and slide-up animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCopyCode = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await Clipboard.setString(referralCode);
    
    // Show feedback animation
    setCopyPressed(true);
    setTimeout(() => setCopyPressed(false), 1000);
    
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleGoBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleShare = async (platform: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const referralLink = `https://snapshoot.app/ref/${referralCode}`;
    const message = `🎉 Join SnapShoot and save money! Use my referral code: ${referralCode}\n\nGet Rs.100 cashback when you add Rs.250+ for your first booking.\n\n${referralLink}`;
    
    try {
      switch (platform) {
        case 'whatsapp':
          // Open WhatsApp with pre-filled message
          const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
          const canOpenWhatsApp = await Linking.canOpenURL(whatsappUrl);
          if (canOpenWhatsApp) {
            await Linking.openURL(whatsappUrl);
          } else {
            // Fallback to native share
            await Share.share({
              message: message,
              title: 'Share SnapShoot Referral'
            });
          }
          break;
          
        case 'facebook':
          // Facebook doesn't support direct text sharing, use native share
          await Share.share({
            message: message,
            url: referralLink,
            title: 'Join SnapShoot - Photography Made Easy'
          });
          break;
          
        case 'sms':
          // Open SMS app with pre-filled message
          const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
          await Linking.openURL(smsUrl);
          break;
          
        case 'instagram':
          // Instagram Stories sharing with link sticker
          try {
            // Copy link for easy pasting
            await Clipboard.setString(referralLink);
            // Try to open Instagram to stories camera
            const instagramUrl = 'instagram://story-camera';
            const canOpenIG = await Linking.canOpenURL(instagramUrl);
            if (canOpenIG) {
              await Linking.openURL(instagramUrl);
              // Show helpful instructions
              setTimeout(() => {
                Alert.alert(
                  'Instagram Ready! 📸',
                  `Referral link copied to clipboard!\n\nTo share:\n• Add a story photo/video\n• Tap the sticker icon\n• Add "Link" sticker\n• Paste: ${referralLink}`,
                  [{ text: 'Got it!' }]
                );
              }, 1000);
            } else {
              // Use native share as fallback
              await Share.share({
                message: message,
                title: 'SnapShoot Referral'
              });
            }
          } catch {
            // Final fallback to native share
            await Share.share({
              message: message,
              title: 'SnapShoot Referral'
            });
          }
          break;
          
        case 'email':
          // Open email app with pre-filled content
          const emailUrl = `mailto:?subject=${encodeURIComponent('Join SnapShoot - Photography Made Easy!')}&body=${encodeURIComponent(message)}`;
          const canOpenEmail = await Linking.canOpenURL(emailUrl);
          if (canOpenEmail) {
            await Linking.openURL(emailUrl);
          } else {
            // Fallback to native share
            await Share.share({
              message: message,
              title: 'Join SnapShoot'
            });
          }
          break;
          
        case 'copylink':
          // Copy the referral link
          await Clipboard.setString(referralLink);
          Alert.alert('Link Copied! 🔗', `Referral link copied to clipboard:\n${referralLink}`);
          break;
          
        default:
          // Use native share for any other platform
          await Share.share({
            message: message,
            url: referralLink,
            title: 'Join SnapShoot'
          });
      }
    } catch (error) {
      console.log('Share error:', error);
      // Fallback to native share if specific platform fails
      try {
        await Share.share({
          message: message,
          title: 'SnapShoot Referral'
        });
      } catch (shareError) {
        Alert.alert('Sharing Error', 'Unable to share at this time. Please try copying the link instead.');
      }
    }
  };

  const shareOptions = [
    { key: 'whatsapp', icon: 'WA', label: 'WhatsApp', color: '#25D366' },
    { key: 'facebook', icon: 'f', label: 'Facebook', color: '#1877F2' },
    { key: 'copylink', icon: '🔗', label: 'Copy Link', color: '#666666' },
    { key: 'sms', icon: '💬', label: 'SMS', color: '#34C759' },
    { key: 'instagram', icon: 'IG', label: 'Instagram', color: '#E4405F' },
    { key: 'email', icon: '@', label: 'Email', color: '#FF3B30' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: insets.bottom + 24 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header - Left Aligned */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={[styles.backIcon, { color: theme.colors.text.primary }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
            Referral Program
          </Text>
        </View>

        {/* Hero Section with Animation */}
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.card}>
            {/* Gift Box Illustration */}
            <View style={styles.illustrationContainer}>
              <View style={styles.decorativeCircle1} />
              <View style={styles.decorativeCircle2} />
              <View style={styles.decorativeCircle3} />
              <View style={styles.giftBox}>
                <View style={styles.giftBoxBase} />
                <View style={styles.giftBoxRibbon} />
                <View style={styles.giftBoxBow} />
              </View>
            </View>

            {/* Title */}
            <Text style={[styles.titleText, { color: theme.colors.text.primary }]}>
              Invite Friends, Get Cashback
            </Text>

            {/* Subtitle */}
            <Text style={styles.subtitleText}>
              Get Rs.100 cashback for every friend who registers and adds at least Rs.250 for their first purchase using your referral code!
            </Text>

            {/* Share Label */}
            <Text style={[styles.shareLabel, { color: theme.colors.text.primary }]}>
              Share your referral code
            </Text>

            {/* Referral Code Pill with Feedback */}
            <View style={[
              styles.codeRow,
              copyPressed && { backgroundColor: '#3a3c42' }
            ]}>
              <Text style={styles.codeText}>{referralCode}</Text>
              <TouchableOpacity onPress={handleCopyCode} style={styles.copyBtn}>
                <Text style={styles.copyLabel}>
                  {copyPressed ? 'Copied!' : 'Copy'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Refer Via Section */}
          <Text style={[styles.referViaTitle, { color: theme.colors.text.primary }]}>
            Refer via
          </Text>
        </Animated.View>

        {/* Share Grid */}
        <View style={styles.shareGrid}>
          {shareOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[styles.shareItem, { width: ITEM_SIZE }]}
              onPress={() => handleShare(option.key)}
            >
              <View style={[styles.shareIcon, { backgroundColor: option.color }]}>
                <Text style={[
                  styles.shareIconText,
                  { fontSize: option.icon.length > 1 ? 14 : 18 }
                ]}>
                  {option.icon}
                </Text>
              </View>
              <Text style={styles.shareOptionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 32,
    width: '100%',
  },
  card: {
    backgroundColor: '#1E1E1E',   // medium-dark grey
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  illustrationContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: 20,
    right: 30,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFA500',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFD700',
  },
  decorativeCircle3: {
    position: 'absolute',
    bottom: 40,
    right: 15,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#90EE90',
  },
  giftBox: {
    width: 100,
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftBoxBase: {
    width: 80,
    height: 60,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
  },
  giftBoxRibbon: {
    width: 80,
    height: 12,
    backgroundColor: '#FFD700',
    position: 'absolute',
    bottom: 24,
  },
  giftBoxBow: {
    width: 30,
    height: 15,
    backgroundColor: '#90EE90',
    borderRadius: 15,
    position: 'absolute',
    top: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
  },
  subtitleText: {
    fontSize: 15,
    color: '#A0A0A0',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 22,
  },
  shareLabel: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: PILL_BG,
    borderRadius: PILL_RAD,
    paddingVertical: 12,
    paddingHorizontal: PILL_HPAD,
    marginTop: 16,
    minWidth: '80%',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  codeText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 1.1,
    fontWeight: '600',
  },
  copyBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: PILL_RAD - 4,
    backgroundColor: '#007AFF',      // iOS blue
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  referViaTitle: {
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: 28,
  },
  shareGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: GRID_GUTTER,
    marginTop: 20,
  },
  shareItem: {
    alignItems: 'center',
    marginBottom: GRID_GUTTER,
  },
  shareIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  shareIconText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  shareOptionLabel: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default ReferralScreen; 