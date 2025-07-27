import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { PrimaryButton } from '../../components/ui/Button';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic Indian phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOTP = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Error', 'Please accept the Terms & Conditions and Privacy Policy');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate OTP sending - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to OTP verification
      navigation.navigate('OTPVerification', { phoneNumber } as never);
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={[styles.logo, { color: theme.colors.text.primary }]}>
              FLA⚡SHOOT
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>
              Enter your Mobile Number
            </Text>
            
            <View style={styles.phoneInputContainer}>
              <View style={[styles.countryCode, { 
                backgroundColor: theme.colors.background.secondary,
                borderColor: theme.colors.border.primary,
              }]}>
                <Text style={[styles.countryCodeText, { color: theme.colors.text.primary }]}>
                  +91
                </Text>
              </View>
              
              <TextInput
                style={[styles.phoneInput, { 
                  backgroundColor: theme.colors.background.secondary,
                  borderColor: theme.colors.border.primary,
                  color: theme.colors.text.primary,
                }]}
                placeholder="Mobile Number"
                placeholderTextColor={theme.colors.text.tertiary}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
                autoFocus
              />
            </View>

            {/* Terms & Conditions */}
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => setAcceptedTerms(!acceptedTerms)}
            >
              <View style={[styles.checkbox, { 
                borderColor: theme.colors.border.primary,
                backgroundColor: acceptedTerms ? theme.colors.brand.primary : 'transparent',
              }]}>
                {acceptedTerms && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={[styles.termsText, { color: theme.colors.text.secondary }]}>
                I agree to the{' '}
                <Text style={{ color: theme.colors.text.accent }}>Terms & Conditions</Text>
                {' '}and{' '}
                <Text style={{ color: theme.colors.text.accent }}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {/* Send OTP Button */}
            <PrimaryButton
              title="Send OTP"
              onPress={handleSendOTP}
              loading={isLoading}
              disabled={!phoneNumber.trim() || !acceptedTerms}
              size="large"
              fullWidth
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.colors.text.tertiary }]}>
              a product by konchamkode
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 60,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default LoginScreen; 