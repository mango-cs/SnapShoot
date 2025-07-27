import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppData, useServices, usePromotions, useUser } from '../../contexts/AppDataContext';
import { PrimaryButton } from '../../components/ui/Button';
import { ServiceCard } from '../../components/ui/Card';

const HomeScreen: React.FC = () => {
  const { theme, toggleTheme, themeMode } = useTheme();
  const { selectedCity, setSelectedCity } = useAppData();
  const { user } = useUser();
  const { popularServices, getServicesByCategory } = useServices();
  const { activePromotions } = usePromotions();

  const handleLocationPress = () => {
    Alert.alert(
      'Select City',
      'Choose your city',
      [
        { text: 'Hyderabad', onPress: () => setSelectedCity('Hyderabad') },
        { text: 'Mumbai', onPress: () => setSelectedCity('Mumbai') },
        { text: 'Delhi', onPress: () => setSelectedCity('Delhi') },
        { text: 'Bangalore', onPress: () => setSelectedCity('Bangalore') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleActionPress = (action: string) => {
    Alert.alert('Action', `${action} feature coming soon!`);
  };

  const handleServicePress = (serviceId: string) => {
    Alert.alert('Service Selected', `Service ${serviceId} details coming soon!`);
  };

  const handleApplyCoupon = (code: string) => {
    Alert.alert('Coupon Applied', `${code} has been applied to your account!`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.text.primary }]}>
              Hi, {user.name.split(' ')[0]}
            </Text>
            <TouchableOpacity style={styles.locationContainer} onPress={handleLocationPress}>
              <Text style={[styles.location, { color: theme.colors.text.primary }]}>
                {selectedCity} ▸
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Theme Toggle Button */}
          <TouchableOpacity 
            onPress={toggleTheme}
            style={[styles.themeToggle, { backgroundColor: theme.colors.background.secondary }]}
          >
            <Text style={[styles.themeToggleText, { color: theme.colors.text.primary }]}>
              {themeMode === 'dark' ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Motivational Text */}
        <View style={styles.motivationContainer}>
          <Text style={[styles.motivationText, { color: theme.colors.text.primary }]}>
            You are just in the right place!
          </Text>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleActionPress('Book Now')}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>Book Now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleActionPress('Packages')}
          >
            <Text style={styles.actionIcon}>📅</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>Packages</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleActionPress('My Wallet')}
          >
            <Text style={styles.actionIcon}>💳</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>My Wallet</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleActionPress('Settings')}
          >
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={[styles.heroCard, { backgroundColor: theme.colors.background.secondary }]}>
          <Text style={[styles.heroTitle, { color: theme.colors.text.primary }]}>
            Reels Created and Delivered On The Spot
          </Text>
          <Text style={[styles.heroSubtitle, { color: theme.colors.text.secondary }]}>
            Professional photography and videography services
          </Text>
        </View>

        {/* Discover with Vibe Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Discover with Vibe
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {popularServices.slice(0, 4).map((service) => (
              <TouchableOpacity 
                key={service.id}
                style={[styles.vibeCard, { backgroundColor: theme.colors.background.secondary }]}
                onPress={() => handleServicePress(service.id)}
              >
                <View style={[styles.vibeCardImage, { backgroundColor: theme.colors.background.tertiary }]}>
                  <Text style={[styles.vibeCardEmoji, { color: theme.colors.text.secondary }]}>
                    {service.category === 'wedding' ? '💒' : 
                     service.category === 'celebrity' ? '⭐' : 
                     service.category === 'brand' ? '📸' : '🎂'}
                  </Text>
                </View>
                <Text style={[styles.vibeCardTitle, { color: theme.colors.text.primary }]}>
                  {service.title.replace(' Photography', '').replace(' Photoshoot', '')}
                </Text>
                <Text style={[styles.vibeCardPrice, { color: theme.colors.text.accent }]}>
                  ₹{service.price.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Instant Discounts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Instant Discounts 🔥
          </Text>
          {activePromotions.slice(0, 2).map((promo) => (
            <View key={promo.id} style={[styles.discountCard, { backgroundColor: theme.colors.brand.primary, marginBottom: 12 }]}>
              <View style={styles.discountContent}>
                <Text style={[styles.discountCode, { color: theme.colors.text.inverse }]}>
                  {promo.code}
                </Text>
                <Text style={[styles.discountOffer, { color: theme.colors.text.inverse }]}>
                  {promo.description}
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
        </View>

        {/* Featured Services */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Featured Services
          </Text>
          {getServicesByCategory('wedding').slice(0, 1).map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              description={`₹${service.price.toLocaleString()} • ${service.duration}hrs`}
              onPress={() => handleServicePress(service.id)}
              style={{ marginBottom: 12 }}
            />
          ))}
          {getServicesByCategory('corporate').slice(0, 1).map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              subtitle={service.subtitle}
              description={`₹${service.price.toLocaleString()} • ${service.duration}hrs`}
              onPress={() => handleServicePress(service.id)}
              style={{ marginBottom: 12 }}
            />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.text.tertiary }]}>
            Made with ❤️ in India!
          </Text>
          <Text style={[styles.footerSubtext, { color: theme.colors.text.tertiary }]}>
            A Product Of konchamkode
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  locationContainer: {
    marginTop: 4,
  },
  location: {
    fontSize: 16,
    fontWeight: '500',
  },
  themeToggle: {
    padding: 12,
    borderRadius: 25,
  },
  themeToggleText: {
    fontSize: 20,
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
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  actionCard: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  heroCard: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 16,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  horizontalScroll: {
    paddingVertical: 8,
  },
  vibeCard: {
    width: 120,
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  vibeCardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  vibeCardEmoji: {
    fontSize: 32,
  },
  vibeCardTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  vibeCardPrice: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  discountCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  discountContent: {
    flex: 1,
  },
  discountCode: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  discountOffer: {
    fontSize: 14,
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  serviceCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceEmoji: {
    fontSize: 24,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 14,
  },
  serviceArrow: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
  },
});

export default HomeScreen; 