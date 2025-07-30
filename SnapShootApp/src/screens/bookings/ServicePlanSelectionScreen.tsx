import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const SIDE_GUTTER  = 16;                       // left & right padding
const CARD_SPACING = 16;                       // gap between cards
const CARD_WIDTH   = width - SIDE_GUTTER * 2;  // visible card width

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

interface RouteParams {
  serviceType: 'wedding' | 'celebrity';
  serviceName: string;
}

const ServicePlanSelectionScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { serviceType, serviceName } = route.params as RouteParams;
  
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // Define pricing plans based on service type
  const getPlansForService = () => {
    if (serviceType === 'wedding') {
      return [
        {
          id: 'standard',
          name: 'Standard',
          price: 14999,
          description: 'Perfect for couples looking for a stunning, professionally crafted wedding shoot that won\'t break the bank.',
          features: [
            'Covers upto one event',
            'Include 3 Reels',
            'Shot on Iphone',
            'Interaction videos captured.',
            'RAW content provided upon request.',
            'Instant reel delivery.',
            'Flashoot logo mandatory.'
          ]
        },
        {
          id: 'silver',
          name: 'Silver',
          price: 24999,
          description: 'Enhanced package with professional equipment and extended coverage for your special day.',
          features: [
            'Covers upto two events',
            'Include 5 Reels',
            'Shot on Professional Camera',
            'Pre-wedding shoot included.',
            'Edited photos delivered within 7 days.',
            'Social media ready content.',
            'Custom highlight reel.'
          ]
        },
        {
          id: 'gold',
          name: 'Gold',
          price: 39999,
          description: 'Premium wedding photography with cinematic videography and comprehensive coverage.',
          features: [
            'Covers complete wedding day',
            'Include 8 Reels',
            'Cinematic 4K videography',
            'Drone footage included.',
            'Professional lighting setup.',
            'Same day highlights reel.',
            'Premium photo album included.'
          ]
        },
        {
          id: 'platinum',
          name: 'Platinum',
          price: 59999,
          description: 'Ultimate luxury package with full documentary-style coverage and premium deliverables.',
          features: [
            'Complete wedding documentation',
            'Include 12 Reels',
            'Multi-camera setup',
            'Live streaming option.',
            'Professional photo booth.',
            'Custom wedding film.',
            'Lifetime cloud storage.'
          ]
        }
      ];
    } else {
      return [
        {
          id: 'standard',
          name: 'Standard',
          price: 9999,
          description: 'Professional celebrity-style photoshoot perfect for social media and portfolios.',
          features: [
            'Single location shoot',
            'Include 2 Reels',
            'Professional lighting setup',
            'Basic retouching included',
            'Social media ready formats',
            'Same day preview delivery',
            'Female photographer available'
          ]
        },
        {
          id: 'silver',
          name: 'Silver',
          price: 18999,
          description: 'Enhanced celebrity photoshoot with multiple looks and professional styling.',
          features: [
            'Multi-location shoot',
            'Include 4 Reels',
            'Professional makeup artist',
            'Outfit styling consultation',
            'Advanced photo editing',
            'Behind-the-scenes content',
            'Female photographer priority'
          ]
        },
        {
          id: 'gold',
          name: 'Gold',
          price: 29999,
          description: 'Premium celebrity experience with videography and comprehensive coverage.',
          features: [
            'Studio + outdoor locations',
            'Include 6 Reels',
            'Videography included',
            'Professional hair & makeup',
            'Wardrobe selection assistance',
            'Custom video montage',
            'Dedicated female photographer'
          ]
        },
        {
          id: 'platinum',
          name: 'Platinum',
          price: 49999,
          description: 'Ultimate celebrity treatment with full production team and luxury experience.',
          features: [
            'Full day production',
            'Include 10 Reels',
            'Complete production team',
            'Luxury transportation',
            'Red carpet experience',
            'Professional portfolio book',
            'Celebrity female photographer'
          ]
        }
      ];
    }
  };

  const plans = getPlansForService();

  const handlePlanScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / (CARD_WIDTH + CARD_SPACING));
    setCurrentPlanIndex(Math.max(0, Math.min(index, plans.length - 1)));
  };

  const handleTalkToExpert = () => {
    Alert.alert(
      'Talk to Expert',
      `We'll connect you with our expert for ${serviceName} planning. They'll help you choose the perfect plan and answer all your questions.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', onPress: () => Alert.alert('Calling...', 'Feature coming soon!') },
        { text: 'Chat', onPress: () => Alert.alert('Opening Chat...', 'Feature coming soon!') }
      ]
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.greeting, { color: theme.colors.text.secondary }]}>
          Hi, boss
        </Text>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Choose the plan that suits you!
        </Text>
      </View>

      {/* Plans ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIDE_GUTTER }}
        onScroll={handlePlanScroll}
        scrollEventThrottle={16}
      >
        {plans.map((plan, index) => (
          <View
            key={plan.id}
            style={[
              styles.planCard,
              { backgroundColor: theme.colors.background.secondary }
            ]}
          >
            {/* Selected Indicator */}
            {index === currentPlanIndex && (
              <View style={[styles.selectedIndicator, { backgroundColor: '#007AFF' }]}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}

            {/* Plan Content */}
            <View style={styles.planHeader}>
              <Text style={[styles.planPrice, { color: theme.colors.text.primary }]}>
                ₹{plan.price.toLocaleString()}
              </Text>
              <Text style={[styles.gstText, { color: theme.colors.text.tertiary }]}>
                + GST
              </Text>
            </View>

            <Text style={[styles.planName, { color: theme.colors.text.primary }]}>
              {plan.name}
            </Text>

            <Text style={[styles.planDescription, { color: theme.colors.text.secondary }]}>
              {plan.description}
            </Text>

            {/* Features List */}
            <View style={styles.featuresContainer}>
              {plan.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.featureItem}>
                  <Text style={styles.featureBullet}>•</Text>
                  <Text style={[styles.featureText, { color: theme.colors.text.primary }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {plans.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentPlanIndex && styles.activeDot,
              index === currentPlanIndex && { backgroundColor: '#007AFF' }
            ]}
          />
        ))}
      </View>

      {/* Talk to Expert Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.expertButton, { backgroundColor: '#007AFF' }]}
          onPress={handleTalkToExpert}
        >
          <Text style={styles.expertButtonText}>Talk to an Expert</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  planCard: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,   // keep next card away
    borderRadius: 16,
    overflow: 'hidden',
    padding: 24,
    position: 'relative',
    minHeight: 400,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  gstText: {
    fontSize: 14,
    marginLeft: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  planDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  featuresContainer: {
    flex: 1,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureBullet: {
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  expertButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expertButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServicePlanSelectionScreen; 