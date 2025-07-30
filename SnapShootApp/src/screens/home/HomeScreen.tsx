import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage, languageLabels } from '../../contexts/LanguageContext';
import { useAppData, useServices, usePromotions, useUser } from '../../contexts/AppDataContext';
import { PrimaryButton } from '../../components/ui/Button';
import { ServiceCard } from '../../components/ui/Card';
import { LanguageModal } from '../../components/ui/LanguageModal';
import { useTranslation } from '../../hooks/useTranslation';
import { ReelCard } from '../../components/specialized/ReelCard';
import { getActiveReels, Reel } from '../../services/firebase/reels';
import { getStorageReels } from '../../services/firebase/storageReels';
import { ReelViewerScreen } from '../shared/ReelViewerScreen';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { selectedCity, setSelectedCity } = useAppData();
  const { user } = useUser();
  const { popularServices, getServicesByCategory } = useServices();
  const { activePromotions } = usePromotions();
  const { t } = useTranslation();
  
  const [showDOBModal, setShowDOBModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [reels, setReels] = useState<Reel[]>([]);
  const [isLoadingReels, setIsLoadingReels] = useState(true);
  const [showReelViewer, setShowReelViewer] = useState(false);
  const [selectedReelIndex, setSelectedReelIndex] = useState(0);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);

  // Mock data for missing sections
  const discountOffers = [
    { id: 'FLASH50', code: 'FLASH50', type: 'flash' },
    { id: 'WELCOME100', code: 'WELCOME100', type: 'welcome' },
  ];

  const topPhotographers = [
    { id: '1', name: 'Rajesh Kumar', rating: 4.8, specialization: 'Wedding', distance: '2.3 km', image: '👨‍🎨' },
    { id: '2', name: 'Priya Sharma', rating: 4.9, specialization: 'Portrait', distance: '1.8 km', image: '👩‍🎨' },
    { id: '3', name: 'Arjun Reddy', rating: 4.7, specialization: 'Events', distance: '3.1 km', image: '👨‍💼' },
  ];

  const partnersOfWeek = [
    { id: '1', name: 'Kruthivarsh Koduru', specialty: 'PR Events', image: '👨‍💼', bgColor: '#8B1538' },
    { id: '2', name: 'Aditi Sharma', specialty: 'Wedding Photography', image: '👩‍🎨', bgColor: '#B91C1C' },
    { id: '3', name: 'Vikram Singh', specialty: 'Corporate Events', image: '👨‍💻', bgColor: '#7C2D12' },
    { id: '4', name: 'Sneha Patel', specialty: 'Fashion Photography', image: '👩‍🎤', bgColor: '#9F1239' },
  ];

  const recentBookings = [
    { id: '1', service: 'Wedding Photography', date: '2024-01-15', status: 'Completed', photographer: 'Rajesh Kumar' },
    { id: '2', service: 'Birthday Shoot', date: '2024-01-20', status: 'Upcoming', photographer: 'Priya Sharma' },
  ];



  useEffect(() => {
    if (!user.dateOfBirth) {
      setTimeout(() => {
        setShowDOBModal(true);
      }, 1000);
    }
  }, [user.dateOfBirth]);

  // Fetch reels from Firebase (try user videos first, then samples)
  useEffect(() => {
    const fetchReels = async () => {
      try {
        setIsLoadingReels(true);
        console.log('🔄 Loading reels...');
        
        // First: Try to load user's videos from Firebase Storage
        console.log('📁 Checking for your uploaded videos...');
        const storageReels = await getStorageReels();
        
        if (storageReels.length > 0) {
          setReels(storageReels.slice(0, 6));
          console.log(`✅ Loaded ${storageReels.length} of your videos!`);
          return;
        }
        
        // Fallback: Load from Firestore (sample reels)
        console.log('📁 No uploaded videos found, checking sample reels...');
        const { getActiveReels } = await import('../../services/firebase/reels');
        const firestoreReels = await getActiveReels();
        
        if (firestoreReels.length > 0) {
          setReels(firestoreReels.slice(0, 6));
          console.log(`✅ Loaded ${firestoreReels.length} sample reels`);
        } else {
          // Final fallback: Create sample reels
          console.log('📁 No reels found anywhere, creating samples...');
          const { setupSampleReels } = await import('../../services/firebase/reelManager');
          await setupSampleReels();
          const newSampleReels = await getActiveReels();
          setReels(newSampleReels.slice(0, 6));
          console.log(`✅ Created and loaded ${newSampleReels.length} sample reels`);
        }
        
      } catch (error) {
        console.error('❌ Failed to fetch reels:', error);
        setReels([]);
      } finally {
        setIsLoadingReels(false);
        console.log('🏁 Reel loading completed');
      }
    };

    fetchReels();
  }, []);

  const handleLocationPress = () => {
    navigation.navigate('CitySelection' as never);
  };

  const handleActionPress = (action: string) => {
    Alert.alert('Action', `${action} feature coming soon!`);
  };

  const handleServicePress = (serviceId: string) => {
    // Map service IDs to navigation parameters
    let serviceType: 'wedding' | 'celebrity';
    let serviceName: string;
    
    if (serviceId.includes('wedding') || serviceId === '1') {
      serviceType = 'wedding';
      serviceName = 'Wedding Photography';
    } else if (serviceId.includes('celebrity') || serviceId === '3') {
      serviceType = 'celebrity';
      serviceName = 'Celebrity Photoshoot';
    } else {
      Alert.alert('Service Selected', `Service ${serviceId} details coming soon!`);
      return;
    }
    
    (navigation as any).navigate('ServicePlanSelection', {
      serviceType,
      serviceName,
    });
  };

  const handleReelPress = (reel: Reel) => {
    const reelIndex = reels.findIndex(r => r.id === reel.id);
    setSelectedReelIndex(reelIndex >= 0 ? reelIndex : 0);
    setShowReelViewer(true);
  };

  const handleReelScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const reelCardWidth = 132; // 120 width + 12 margin
    const index = Math.round(scrollX / reelCardWidth);
    setCurrentReelIndex(Math.max(0, Math.min(index, reels.length - 1)));
  };

  const handleDiscountScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const discountCardWidth = 320; // Approximate width of discount card + margin
    const index = Math.round(scrollX / discountCardWidth);
    setCurrentDiscountIndex(Math.max(0, Math.min(index, discountOffers.length - 1)));
  };

  const handlePartnerScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const partnerCardWidth = 280; // Partner card width + margin
    const index = Math.round(scrollX / partnerCardWidth);
    setCurrentPartnerIndex(Math.max(0, Math.min(index, partnersOfWeek.length - 1)));
  };



  const handlePhotographerPress = (photographerId: string) => {
    Alert.alert('Photographer', `Photographer profile coming soon!`);
  };



  const handleApplyCoupon = (code: string) => {
    Alert.alert('Coupon Applied', `${code} has been applied to your account!`);
  };

  const handleContinueDOB = () => {
    setShowDOBModal(false);
    navigation.navigate('EditProfile' as never);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.text.primary }]}>
              {t('home.greeting')}, {user.name.split(' ')[0]}!
            </Text>
            <TouchableOpacity style={styles.locationContainer} onPress={handleLocationPress}>
              <Text style={[styles.location, { color: theme.colors.text.primary }]}>
                📍 {selectedCity} ▸
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Language Toggle Button */}
          <TouchableOpacity 
            onPress={toggleLanguage}
            onLongPress={() => setShowLanguageModal(true)}
            style={[styles.languageToggle, { backgroundColor: theme.colors.background.secondary }]}
          >
            <Text style={[styles.languageToggleText, { color: theme.colors.text.primary }]}>
              🌐
            </Text>
            <Text style={[styles.languageLabel, { color: theme.colors.text.secondary }]}>
              {languageLabels[language]}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Motivational Text */}
        <View style={styles.motivationContainer}>
          <Text style={[styles.motivationText, { color: theme.colors.text.primary }]}>
            {t('home.motivationalText')}
          </Text>
        </View>

        {/* Quick Actions - Horizontal Row of Circles */}
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('Book Now')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: theme.colors.brand.primary }]}>
              <Text style={styles.actionIcon}>📸</Text>
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>{t('home.quickActions.bookNow')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('Packages')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={styles.actionIcon}>📦</Text>
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>{t('home.quickActions.packages')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('My Wallet')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={styles.actionIcon}>💰</Text>
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>{t('home.quickActions.myWallet')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleActionPress('Support')}
          >
            <View style={[styles.actionIconCircle, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={styles.actionIcon}>🎧</Text>
            </View>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>{t('home.quickActions.support')}</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Banner Carousel - All Feature Cards */}
        <View style={styles.featuresSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.featureCarousel}
            contentContainerStyle={styles.featureCarouselContent}
          >
            {/* Reels Created And Delivered On The Spot Card */}
            <View style={[styles.featureHeroBanner, { backgroundColor: theme.colors.brand.primary }]}>
              <View style={styles.featureHeroBannerContent}>
                <View style={styles.featureHeroBannerText}>
                  <Text style={styles.featureHeroBannerTitle}>
                    Reels Created And Delivered On The Spot
                  </Text>
                </View>
                <View style={styles.featureHeroBannerImagePlaceholder}>
                  <Text style={styles.featurePlaceholderText}>📱{'\n'}Live{'\n'}Capture</Text>
                </View>
              </View>
            </View>

            {/* Skilled In Reels Card */}
            <View style={[styles.featureHeroBanner, { backgroundColor: '#FF6B6B' }]}>
              <View style={styles.featureHeroBannerContent}>
                <View style={styles.featureHeroBannerText}>
                  <Text style={styles.featureHeroBannerTitle}>
                    Skilled In Reels
                  </Text>
                </View>
                <View style={styles.featureHeroBannerImagePlaceholder}>
                  <Text style={styles.featurePlaceholderText}>🎬{'\n'}Reel{'\n'}Skills</Text>
                </View>
              </View>
            </View>

            {/* Book Instantly Card */}
            <View style={[styles.featureHeroBanner, { backgroundColor: '#4ECDC4' }]}>
              <View style={styles.featureHeroBannerContent}>
                <View style={styles.featureHeroBannerText}>
                  <Text style={styles.featureHeroBannerTitle}>
                    Book Instantly
                  </Text>
                </View>
                <View style={styles.featureHeroBannerImagePlaceholder}>
                  <Text style={styles.featurePlaceholderText}>⚡{'\n'}Quick{'\n'}Book</Text>
                </View>
              </View>
            </View>

            {/* Real Time Capture Card */}
            <View style={[styles.featureHeroBanner, { backgroundColor: '#45B7D1' }]}>
              <View style={styles.featureHeroBannerContent}>
                <View style={styles.featureHeroBannerText}>
                  <Text style={styles.featureHeroBannerTitle}>
                    Real Time Capture
                  </Text>
                </View>
                <View style={styles.featureHeroBannerImagePlaceholder}>
                  <Text style={styles.featurePlaceholderText}>📹{'\n'}Live{'\n'}Record</Text>
                </View>
              </View>
            </View>

            {/* Affordable Packages Card */}
            <View style={[styles.featureHeroBanner, { backgroundColor: '#96CEB4' }]}>
              <View style={styles.featureHeroBannerContent}>
                <View style={styles.featureHeroBannerText}>
                  <Text style={styles.featureHeroBannerTitle}>
                    Affordable Packages
                  </Text>
                </View>
                <View style={styles.featureHeroBannerImagePlaceholder}>
                  <Text style={styles.featurePlaceholderText}>💰{'\n'}Great{'\n'}Price</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        




        {/* Discover with Vibe Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            {t('home.sections.discoverWithVibe')}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            onScroll={handleReelScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={132}
            snapToAlignment="start"
          >
            {isLoadingReels ? (
              // Loading state with placeholders
              Array.from({ length: 4 }).map((_, index) => (
                <View key={`loading-${index}`} style={styles.reelCard}>
                  <View style={styles.reelImagePlaceholder}>
                    <ActivityIndicator 
                      size="large" 
                      color={theme.colors.brand.primary} 
                    />
                    <Text style={[styles.reelPlaceholderText, { color: theme.colors.text.tertiary }]}>
                      Loading...
                    </Text>
                  </View>
                </View>
              ))
            ) : reels.length > 0 ? (
              // Display actual reels from Firebase
              reels.map((reel) => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  onPress={handleReelPress}
                  muted={true}
                  autoPlay={false}
                />
              ))
            ) : (
              // Fallback when no reels are available
              <View style={styles.reelCard}>
                <View style={styles.reelImagePlaceholder}>
                  <Text style={[styles.reelPlaceholderText, { color: theme.colors.text.tertiary }]}>
                    📱 No reels{'\n'}available
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
          
          {/* Reels Dots Indicator - Only show when reels are loaded and available */}
          {!isLoadingReels && reels.length > 1 && (
            <View style={styles.discountDotIndicators}>
              {reels.map((_, index) => (
                <View 
                  key={index}
                  style={[
                    styles.discountDot, 
                    index === currentReelIndex && styles.activeDiscountDot,
                    index === currentReelIndex && { backgroundColor: theme.colors.brand.primary }
                  ]} 
                />
              ))}
            </View>
          )}
        </View>

        {/* Instant Discounts Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            {t('home.sections.instantDiscounts')}
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            onScroll={handleDiscountScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={320}
            snapToAlignment="start"
          >
            <TouchableOpacity 
              style={[styles.instantDiscountCard, { backgroundColor: theme.colors.brand.primary }]}
              onPress={() => handleApplyCoupon('FLASH50')}
            >
              <View style={styles.discountSideLabel}>
                <Text style={styles.discountSideLabelText}>DISCOUNT</Text>
              </View>
              <View style={styles.discountMainContent}>
                <Text style={styles.discountCode}>{t('home.discounts.flash50.code')}</Text>
                <Text style={styles.discountDescription}>
                  {t('home.discounts.flash50.description')}
                </Text>
                <Text style={styles.discountTerms}>{t('home.discounts.flash50.terms')}</Text>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>{t('common.apply')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.instantDiscountCard, { backgroundColor: theme.colors.brand.primary }]}
              onPress={() => handleApplyCoupon('WELCOME100')}
            >
              <View style={styles.discountSideLabel}>
                <Text style={styles.discountSideLabelText}>DISCOUNT</Text>
              </View>
              <View style={styles.discountMainContent}>
                <Text style={styles.discountCode}>{t('home.discounts.welcome100.code')}</Text>
                <Text style={styles.discountDescription}>
                  {t('home.discounts.welcome100.description')}
                </Text>
                <Text style={styles.discountTerms}>{t('home.discounts.welcome100.terms')}</Text>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>{t('common.apply')}</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </ScrollView>
          
          {/* Discount Dots Indicator */}
          {discountOffers.length > 1 && (
            <View style={styles.discountDotIndicators}>
              {discountOffers.map((_, index) => (
                <View 
                  key={index}
                  style={[
                    styles.discountDot, 
                    index === currentDiscountIndex && styles.activeDiscountDot,
                    index === currentDiscountIndex && { backgroundColor: theme.colors.brand.primary }
                  ]} 
                />
              ))}
            </View>
          )}
        </View>

        {/* Popular Services */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            {t('home.sections.popularServices')}
          </Text>
          {popularServices.slice(0, 2).map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={[styles.popularServiceCard, { backgroundColor: theme.colors.background.secondary }]}
              onPress={() => handleServicePress(service.id)}
            >
              <View style={styles.popularServiceImage}>
                {service.id === '1' ? (
                  <Image 
                    source={require('../../../assets/images/services/wedding-photography.jpg')}
                    style={styles.serviceImage}
                    resizeMode="cover"
                  />
                ) : service.id === '3' ? (
                  <>
                    <Image 
                      source={require('../../../assets/images/services/celebrity-photoshoot.jpg')}
                      style={styles.serviceImage}
                      resizeMode="cover"
                    />
                    {/* Female Photographer Badge */}
                    <View style={[styles.photographerBadge, { backgroundColor: theme.colors.brand.primary }]}>
                      <Text style={styles.photographerBadgeText}>Female Photographer</Text>
                    </View>
                  </>
                ) : (
                  <Text style={[styles.placeholderText, { color: theme.colors.text.tertiary }]}>
                    📸 Service Image
                  </Text>
                )}
              </View>
              <View style={styles.popularServiceContent}>
                <Text style={[styles.popularServiceTitle, { color: theme.colors.text.primary }]}>
                  {service.title}
                </Text>
                <Text style={[styles.popularServiceDescription, { color: theme.colors.text.secondary }]}>
                  {service.description}
                </Text>
                <View style={styles.popularServiceFooter}>
                  <Text style={[styles.popularServicePrice, { color: theme.colors.brand.primary }]}>
                    ₹{service.price}
                  </Text>
                  <View style={[styles.bookNowButton, { backgroundColor: theme.colors.brand.primary }]}>
                    <Text style={styles.bookNowText}>{t('common.bookNow')}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Partners of the Week */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Partners of the week!
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.horizontalScroll}
            onScroll={handlePartnerScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={280}
            snapToAlignment="start"
          >
            {partnersOfWeek.map((partner) => (
              <TouchableOpacity 
                key={partner.id}
                style={[styles.partnerCard, { backgroundColor: partner.bgColor }]}
                onPress={() => Alert.alert('Partner Profile', `${partner.name} - ${partner.specialty}`)}
              >
                <View style={styles.partnerImageContainer}>
                  <Text style={styles.partnerImage}>{partner.image}</Text>
                </View>
                <View style={styles.partnerInfo}>
                  <Text style={styles.partnerName}>{partner.name}</Text>
                  <Text style={styles.partnerSpecialty}>{partner.specialty}</Text>
                </View>
                <View style={styles.lightningIcon}>
                  <Text style={styles.lightningText}>⚡</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          {/* Partner Dots Indicator */}
          {partnersOfWeek.length > 1 && (
            <View style={styles.partnerDotIndicators}>
              {partnersOfWeek.map((_, index) => (
                <View 
                  key={index}
                  style={[
                    styles.partnerDot, 
                    index === currentPartnerIndex && styles.activePartnerDot,
                    index === currentPartnerIndex && { backgroundColor: theme.colors.brand.primary }
                  ]} 
                />
              ))}
            </View>
          )}
        </View>

        {/* Recent Bookings */}
        {recentBookings.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              {t('home.sections.recentBookings')}
            </Text>
            {recentBookings.map((booking) => (
              <View 
                key={booking.id}
                style={[styles.bookingCard, { backgroundColor: theme.colors.background.secondary }]}
              >
                <View style={styles.bookingInfo}>
                  <Text style={[styles.bookingService, { color: theme.colors.text.primary }]}>
                    {booking.service}
                  </Text>
                  <Text style={[styles.bookingDate, { color: theme.colors.text.secondary }]}>
                    📅 {booking.date} • {booking.photographer}
                  </Text>
                </View>
                <View style={[
                  styles.bookingStatus, 
                  { backgroundColor: booking.status === 'Completed' ? '#4CAF50' : '#FF9800' }
                ]}>
                  <Text style={styles.bookingStatusText}>{booking.status}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Top Photographers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            {t('home.sections.topPhotographers')}
          </Text>
          {topPhotographers.map((photographer) => (
            <TouchableOpacity 
              key={photographer.id}
              style={[styles.photographerCard, { backgroundColor: theme.colors.background.secondary }]}
              onPress={() => handlePhotographerPress(photographer.id)}
            >
              <View style={styles.photographerAvatar}>
                <Text style={styles.photographerAvatarText}>{photographer.image}</Text>
              </View>
              <View style={styles.photographerInfo}>
                <Text style={[styles.photographerName, { color: theme.colors.text.primary }]}>
                  {photographer.name}
                </Text>
                <Text style={[styles.photographerSpec, { color: theme.colors.text.secondary }]}>
                  {photographer.specialization} • {photographer.distance}
                </Text>
                <View style={styles.photographerRating}>
                  <Text style={styles.ratingText}>⭐ {photographer.rating}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.contactButton, { borderColor: theme.colors.brand.primary }]}>
                <Text style={[styles.contactButtonText, { color: theme.colors.brand.primary }]}>
                  {t('common.contact')}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.madeWithLoveText, { color: theme.colors.text.primary }]}>
            {t('common.madeWithLove')}
          </Text>
          <Text style={[styles.footerSubtext, { color: theme.colors.text.tertiary }]}>
            {t('common.version')}
          </Text>
        </View>

      </ScrollView>

      {/* DOB Modal */}
      <Modal
        visible={showDOBModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background.primary }]}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowDOBModal(false)}
            >
              <Text style={[styles.modalCloseText, { color: theme.colors.text.secondary }]}>✕</Text>
            </TouchableOpacity>
            
            <View style={styles.modalIconContainer}>
              <Text style={styles.modalIcon}>🗓️🎁</Text>
            </View>
            
            <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
              {t('home.dobModal.title')}
            </Text>
            
            <Text style={[styles.modalDescription, { color: theme.colors.text.secondary }]}>
              {t('home.dobModal.description')}
            </Text>
            
            <PrimaryButton
              title={t('common.continue')}
              onPress={handleContinueDOB}
              size="large"
              fullWidth
            />
          </View>
        </View>
      </Modal>

      {/* Language Selection Modal */}
      <LanguageModal 
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      {/* Reel Viewer Modal */}
      <Modal
        visible={showReelViewer}
        transparent={false}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {reels.length > 0 && (
          <ReelViewerScreen
            reels={reels}
            initialIndex={selectedReelIndex}
            onClose={() => setShowReelViewer(false)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageToggle: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 60,
  },
  languageToggleText: {
    fontSize: 16,
    marginBottom: 2,
  },
  languageLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  motivationContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  motivationText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  heroBanner: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
  },
  heroBannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  heroBannerText: {
    flex: 1,
    marginRight: 20,
  },
  heroBannerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    lineHeight: 32,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  heroBannerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  heroBannerImagePlaceholder: {
    width: 100,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 16,
  },

  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  horizontalScroll: {
    paddingVertical: 8,
  },
  reelCard: {
    width: 120,
    height: 180,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  reelImagePlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reelPlaceholderText: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 16,
  },
  reelOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
  },
  reelTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  instantDiscountCard: {
    width: width - 60,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  discountSideLabel: {
    width: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountSideLabelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    transform: [{ rotate: '-90deg' }],
    textAlign: 'center',
  },
  discountMainContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  discountCode: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  discountDescription: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 18,
  },
  discountTerms: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginBottom: 8,
  },
  applyButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  discountDotIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  discountDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDiscountDot: {
    transform: [{ scale: 1.3 }],
  },
  popularServiceCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  popularServiceImage: {
    height: 184,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  photographerBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 4,
  },
  photographerBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  partnerCard: {
    width: 260,
    height: 160,
    borderRadius: 16,
    marginRight: 20,
    padding: 20,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  partnerImageContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerImage: {
    fontSize: 30,
  },
  partnerInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  partnerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  partnerSpecialty: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
  },
  lightningIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightningText: {
    fontSize: 16,
    color: '#FFD700',
  },
  partnerDotIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  partnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activePartnerDot: {
    transform: [{ scale: 1.3 }],
  },
  popularServiceContent: {
    padding: 16,
  },
  popularServiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  popularServiceDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  popularServiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularServicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookNowButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  bookingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  bookingDate: {
    fontSize: 12,
  },
  bookingStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookingStatusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  photographerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  photographerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  photographerAvatarText: {
    fontSize: 24,
  },
  photographerInfo: {
    flex: 1,
  },
  photographerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  photographerSpec: {
    fontSize: 12,
    marginBottom: 4,
  },
  photographerRating: {
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 12,
    color: '#FFD700',
  },
  contactButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  madeWithLoveText: {
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 8,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    lineHeight: 28,
    fontFamily: 'System',
    // Adding handwriting-style emphasis
    transform: [{ rotate: '-1deg' }],
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  modalCloseText: {
    fontSize: 24,
  },
  modalIconContainer: {
    marginBottom: 16,
  },
  modalIcon: {
    fontSize: 48,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresSection: {
    marginVertical: 20,
  },
  featureCarousel: {
    paddingHorizontal: 16,
  },
  featureCarouselContent: {
    paddingRight: 16,
  },
  featureHeroBanner: {
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginRight: 16,
    width: 300,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  featureHeroBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featureHeroBannerText: {
    flex: 1,
    marginRight: 16,
  },
  featureHeroBannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  featureHeroBannerImagePlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featurePlaceholderText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  // Legacy styles (keeping for backward compatibility)
  featureCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 180,
    height: 100,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default HomeScreen; 