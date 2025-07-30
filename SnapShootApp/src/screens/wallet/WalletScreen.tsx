import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser, useWallet, usePromotions } from '../../contexts/AppDataContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Spacing constants
const H_PADDING = 16;
const V_SECTION = 24;
const CARD_RADIUS = 16;

const WalletScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const { balance, updateBalance } = useWallet();
  const { activePromotions } = usePromotions();
  const navigation = useNavigation();
  const [currentDiscountIndex, setCurrentDiscountIndex] = useState(0);

  const handleAddMoney = () => {
    (navigation as any).navigate('AddMoney');
  };

  const handleActionPress = (action: string) => {
    if (action === 'Refer & Earn') {
      (navigation as any).navigate('Referral');
    } else {
      Alert.alert('Action', `${action} feature coming soon!`);
    }
  };

  const handleApplyCoupon = (code: string) => {
    Alert.alert('Coupon Applied', `${code} has been applied to your account!`);
  };

  const handleDiscountScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const couponWidth = width - H_PADDING * 2;
    const index = Math.round(scrollX / (couponWidth + 16));
    setCurrentDiscountIndex(Math.max(0, Math.min(index, activePromotions.length - 1)));
  };

  const quickActions = [
    { key: 'add', icon: '➕', label: 'Add Money', onPress: handleAddMoney },
    { key: 'statements', icon: '⇄', label: 'Statements', onPress: () => handleActionPress('Statements') },
    { key: 'invoice', icon: '🧾', label: 'Invoice', onPress: () => handleActionPress('Invoice') },
    { key: 'refer', icon: '🎟️', label: 'Refer and Earn', onPress: () => handleActionPress('Refer & Earn') },
  ];

  const couponWidth = width - H_PADDING * 2;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingHorizontal: H_PADDING }}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting Block */}
        <View style={[styles.header, { marginTop: V_SECTION }]}>
          <Text style={[styles.greeting, { color: theme.colors.text.secondary }]}>
            Hi, boss
          </Text>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Cha-Ching!
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.primary }]}>
            Your Money is Here!
          </Text>
        </View>

        {/* Balance Card */}
        <View style={[styles.balanceCard, { backgroundColor: theme.colors.brand.primary }]}>
          <ImageBackground
            source={{ uri: 'https://via.placeholder.com/400x200/FF0000/FF0000' }}
            style={styles.cardBackground}
            imageStyle={{ borderRadius: CARD_RADIUS }}
          >
            <View style={styles.balanceContent}>
              <Text style={[styles.balanceLabel, { color: theme.colors.text.inverse }]}>
                Balance
              </Text>
              <Text style={[styles.balanceAmount, { color: theme.colors.text.inverse }]}>
                Rs. {balance.toLocaleString()}.00
              </Text>
              <View style={styles.expiryContainer}>
                <Text style={[styles.expiryLabel, { color: theme.colors.text.inverse }]}>
                  Expiry
                </Text>
                <Text style={[styles.expiryDate, { color: theme.colors.text.inverse }]}>
                  01/2030
                </Text>
              </View>
            </View>
            {/* Decorative circles */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />
          </ImageBackground>
        </View>

        {/* Quick Actions Row */}
        <View style={[styles.actionsRow, { marginTop: V_SECTION }]}>
          {quickActions.map((action) => (
            <TouchableOpacity 
              key={action.key} 
              style={styles.actionBtn} 
              onPress={action.onPress}
            >
              <View style={[styles.actionIconContainer, { backgroundColor: '#1a1a1a' }]}>
                <Text style={[styles.actionIcon, { color: theme.colors.brand.primary }]}>
                  {action.icon}
                </Text>
              </View>
              <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Instant Discounts Carousel */}
        <View style={[styles.section, { marginTop: V_SECTION }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Instant Discounts 🔥
          </Text>
          
          <ScrollView
            horizontal
            pagingEnabled
            snapToInterval={couponWidth + 16}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 0 }}
            onScroll={handleDiscountScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
          >
            {activePromotions.map((promo, index) => (
              <View key={promo.id} style={[styles.discountCard, { 
                backgroundColor: theme.colors.brand.primary,
                width: couponWidth,
                marginRight: index < activePromotions.length - 1 ? 16 : 0
              }]}>
                <View style={styles.discountLeft}>
                  <Text style={styles.discountVerticalText}>DISCOUNT</Text>
                </View>
                <View style={styles.discountContent}>
                  <Text style={[styles.discountCode, { color: theme.colors.text.inverse }]}>
                    {promo.code}
                  </Text>
                  <Text style={[styles.discountOffer, { color: theme.colors.text.inverse }]}>
                    Get up to 450 off on spends above Rs.3000
                  </Text>
                  <Text style={[styles.discountTerms, { color: theme.colors.text.inverse }]}>
                    One-time use
                  </Text>
                </View>
                <TouchableOpacity 
                  style={[styles.applyButton, { backgroundColor: theme.colors.text.inverse }]}
                  onPress={() => handleApplyCoupon(promo.code)}
                >
                  <Text style={[styles.applyButtonText, { color: theme.colors.brand.primary }]}>
                    APPLY
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Dot Indicators */}
          <View style={styles.dotIndicators}>
            {activePromotions.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentDiscountIndex ? styles.activeDot : styles.inactiveDot
                ]}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  balanceCard: {
    width: '100%',
    height: width * 0.532, // Reduced by 5% (0.56 * 0.95 = 0.532)
    borderRadius: CARD_RADIUS,
    marginTop: V_SECTION,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  balanceContent: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 'auto',
  },
  expiryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiryLabel: {
    fontSize: 14,
    fontWeight: '400',
  },
  expiryDate: {
    fontSize: 14,
    fontWeight: '400',
  },
  circle1: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle2: {
    position: 'absolute',
    bottom: -30,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 14,
  },
  section: {
    marginBottom: V_SECTION,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  discountCard: {
    flexDirection: 'row',
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    height: 120,
  },
  discountLeft: {
    width: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  discountVerticalText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    transform: [{ rotate: '-90deg' }],
    letterSpacing: 1,
  },
  discountContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  discountCode: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  discountOffer: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  discountTerms: {
    fontSize: 12,
    opacity: 0.8,
  },
  applyButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    margin: 16,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  dotIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#FF0000',
  },
  inactiveDot: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
});

export default WalletScreen; 