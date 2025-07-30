import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { PrimaryButton } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

interface RouteParams {
  phoneNumber: string;
}

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { phoneNumber } = route.params as RouteParams;
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(90); // 1:30 minutes
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    // Start countdown timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const maskPhoneNumber = (phone: string): string => {
    // Format: +91 99**2**44 (show first 2, mask middle digits, show last 2)
    return `+91 ${phone.slice(0, 2)}**${phone.slice(4, 5)}**${phone.slice(-2)}`;
  };

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (value: string, index: number) => {
    if (value === '' && index > 0) {
      // Focus previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate OTP verification - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, accept any 6-digit OTP
      if (otpString === '123456' || otpString.length === 6) {
        // Navigate to main app
        navigation.navigate('Main' as never);
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;

    try {
      // Simulate resend OTP - replace with actual API call later
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTimer(90); // Reset timer
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      Alert.alert('Success', 'OTP sent successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP. Please try again.');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={[styles.backButtonText, { color: theme.colors.text.primary }]}>
            ←
          </Text>
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {t('auth.otpVerification')}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            {t('auth.enterOtp')}
          </Text>
          <Text style={[styles.phoneNumber, { color: theme.colors.brand.primary }]}>
            {maskPhoneNumber(phoneNumber)}
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[styles.otpInput, { 
                backgroundColor: theme.colors.background.secondary,
                borderColor: digit ? theme.colors.brand.primary : theme.colors.border.primary,
                color: theme.colors.text.primary,
              }]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(digit, index);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Text style={[styles.timerText, { color: theme.colors.text.secondary }]}>
            {timer > 0 ? `Resend OTP in ${formatTime(timer)}` : 'OTP expired'}
          </Text>
        </View>

        {/* Resend OTP */}
        <TouchableOpacity 
          style={styles.resendContainer}
          onPress={handleResendOTP}
          disabled={timer > 0}
        >
          <Text style={[styles.resendText, { 
            color: timer > 0 ? theme.colors.text.tertiary : theme.colors.text.accent 
          }]}>
            Resend OTP
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t('auth.verifyOtp')}
            onPress={handleVerifyOTP}
            loading={isLoading}
            disabled={otp.join('').length !== 6}
            size="large"
            fullWidth
          />
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
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 16,
    paddingRight: 16,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 40, // 2.5x bigger than normal (16 * 2.5 = 40)
    fontWeight: '500',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  otpInput: {
    width: 48,
    height: 58,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  timerText: {
    fontSize: 14,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  resendText: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
});

export default OTPVerificationScreen; 