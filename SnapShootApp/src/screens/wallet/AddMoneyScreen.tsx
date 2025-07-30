import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useWallet } from '../../contexts/AppDataContext';

const { width } = Dimensions.get('window');

const AddMoneyScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { balance } = useWallet();
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const presetAmounts = [500, 1000, 1500, 2000, 2500, 3000];

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setAmount(value.toString());
  };

  const handleAmountChange = (text: string) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, '');
    setAmount(numericText);
    setSelectedAmount(null); // Clear preset selection when typing
  };

  const handleTopUp = () => {
    if (!amount || parseInt(amount) < 10) {
      Alert.alert('Invalid Amount', 'Please enter an amount of at least ₹10');
      return;
    }

    if (!termsAccepted) {
      Alert.alert('Terms Required', 'Please accept the terms and conditions to proceed');
      return;
    }

    Alert.alert(
      'Add Money',
      `Add ₹${amount} to your wallet?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            // Here you would integrate with payment gateway
            Alert.alert('Success', 'Money added successfully!', [
              { text: 'OK', onPress: () => navigation.goBack() }
            ]);
          }
        },
      ]
    );
  };

  const handleTermsPress = () => {
    Alert.alert('Terms & Conditions', 'Terms and conditions would be displayed here.');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Text style={[styles.backIcon, { color: theme.colors.text.primary }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
            Add Money
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Greeting */}
          <Text style={[styles.greeting, { color: theme.colors.text.secondary }]}>
            Hi, boss
          </Text>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Let's add some ₹₹ to{'\n'}your wallet!
          </Text>

          {/* Balance Card */}
          <View style={[styles.balanceCard, { backgroundColor: theme.colors.brand.primary }]}>
            <View style={styles.balanceContent}>
              <View style={styles.balanceInfo}>
                <Text style={styles.walletIcon}>💳</Text>
                <Text style={[styles.balanceLabel, { color: theme.colors.text.inverse }]}>
                  Cash Balance
                </Text>
              </View>
              <Text style={[styles.balanceAmount, { color: theme.colors.text.inverse }]}>
                Rs.{balance.toLocaleString()}.00
              </Text>
            </View>
            {/* Decorative dashed lines */}
            <View style={styles.dashedLine1} />
            <View style={styles.dashedLine2} />
            <View style={styles.dashedLine3} />
          </View>

          {/* Amount Input Section */}
          <View style={styles.inputSection}>
            <Text style={[styles.questionText, { color: theme.colors.text.primary }]}>
              How much do you want to top up?
            </Text>
            <View style={[styles.inputContainer, { backgroundColor: theme.colors.background.secondary }]}>
              <Text style={[styles.currencySymbol, { color: theme.colors.text.secondary }]}>₹</Text>
              <TextInput
                style={[styles.amountInput, { color: theme.colors.text.primary }]}
                placeholder="Enter amount"
                placeholderTextColor={theme.colors.text.tertiary}
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>
          </View>

          {/* Preset Amounts */}
          <View style={styles.presetsSection}>
            <Text style={[styles.presetsTitle, { color: theme.colors.text.primary }]}>
              Other Nominal
            </Text>
            <View style={styles.presetsGrid}>
              {presetAmounts.map((preset) => (
                <TouchableOpacity
                  key={preset}
                  style={[
                    styles.presetButton,
                    { backgroundColor: theme.colors.background.secondary },
                    selectedAmount === preset && { backgroundColor: theme.colors.brand.primary }
                  ]}
                  onPress={() => handleAmountSelect(preset)}
                >
                  <Text style={[
                    styles.presetText,
                    { color: theme.colors.text.primary },
                    selectedAmount === preset && { color: theme.colors.text.inverse }
                  ]}>
                    Rs.{preset}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Terms and Conditions */}
          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View style={[styles.checkbox, termsAccepted && styles.checkedBox]}>
              {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.termsTextContainer}>
              <Text style={[styles.termsText, { color: theme.colors.text.secondary }]}>
                Top transaction policies and conditions{' '}
              </Text>
              <TouchableOpacity onPress={handleTermsPress}>
                <Text style={[styles.termsLink, { color: theme.colors.text.secondary }]}>
                  You may read about it here.
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.topUpButton,
            { backgroundColor: theme.colors.brand.primary },
            (!amount || !termsAccepted) && styles.disabledButton
          ]}
          onPress={handleTopUp}
          disabled={!amount || !termsAccepted}
        >
          <Text style={[styles.topUpButtonText, { color: theme.colors.text.inverse }]}>
            Top Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginTop: 8,
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
    marginBottom: 32,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  balanceContent: {
    zIndex: 2,
  },
  balanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  walletIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  dashedLine1: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  dashedLine2: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 80,
    height: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  dashedLine3: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    width: 100,
    height: 2,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 1,
  },
  inputSection: {
    marginBottom: 32,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 12,
  },
  amountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
  },
  presetsSection: {
    marginBottom: 40,
  },
  presetsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  presetButton: {
    width: '31%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  presetText: {
    fontSize: 16,
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkedBox: {
    backgroundColor: '#4CAF50',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsTextContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsText: {
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    fontSize: 14,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 16,
  },
  topUpButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  topUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddMoneyScreen; 