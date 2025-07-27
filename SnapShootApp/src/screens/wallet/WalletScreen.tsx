import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser, useWallet, usePromotions } from '../../contexts/AppDataContext';

const WalletScreen: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const { balance, updateBalance } = useWallet();
  const { activePromotions } = usePromotions();

  const handleAddMoney = () => {
    Alert.alert(
      'Add Money',
      'How much would you like to add?',
      [
        { text: '₹500', onPress: () => updateBalance(500) },
        { text: '₹1000', onPress: () => updateBalance(1000) },
        { text: '₹2000', onPress: () => updateBalance(2000) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleActionPress = (action: string) => {
    Alert.alert('Action', `${action} feature coming soon!`);
  };

  const handleApplyCoupon = (code: string) => {
    Alert.alert('Coupon Applied', `${code} has been applied to your account!`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.colors.text.primary }]}>
            Hi, {user.name.split(' ')[0]}
          </Text>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Cha-Ching! Your Money is Here!
          </Text>
        </View>

        {/* Wallet Card */}
        <View style={[styles.walletCard, { backgroundColor: theme.colors.brand.primary }]}>
          <View style={styles.walletContent}>
            <Text style={[styles.balanceLabel, { color: theme.colors.text.inverse }]}>
              Balance
            </Text>
            <Text style={[styles.balanceAmount, { color: theme.colors.text.inverse }]}>
              Rs. {balance.toLocaleString()}.00
            </Text>
            <Text style={[styles.expiryDate, { color: theme.colors.text.inverse }]}>
              Expiry: 01/2030
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={handleAddMoney}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>Add Money</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleActionPress('Statements')}
          >
            <Text style={styles.actionIcon}>⇄</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>Statements</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleActionPress('Invoice')}
          >
            <Text style={styles.actionIcon}>🧾</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>Invoice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: theme.colors.background.secondary }]}
            onPress={() => handleActionPress('Refer & Earn')}
          >
            <Text style={styles.actionIcon}>🎟️</Text>
            <Text style={[styles.actionLabel, { color: theme.colors.text.primary }]}>Refer & Earn</Text>
          </TouchableOpacity>
        </View>

        {/* Instant Discount */}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  walletCard: {
    padding: 20,
    borderRadius: 16,
    marginVertical: 20,
  },
  walletContent: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  expiryDate: {
    fontSize: 14,
    opacity: 0.8,
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
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
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
});

export default WalletScreen; 