import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/AppDataContext';
import { PrimaryButton } from '../../components/ui/Button';
import { useTranslation } from '../../hooks/useTranslation';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { user, updateUser } = useUser();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString().split('T')[0] : '',
    gender: 'Male', // Default selection
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }
    
    if (!formData.dateOfBirth) {
      Alert.alert('Error', 'Date of Birth is required');
      return;
    }

    // Update user data
    updateUser({
      name: formData.name.trim(),
      email: formData.email.trim(),
      dateOfBirth: new Date(formData.dateOfBirth),
    });

    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.backButton, { color: theme.colors.text.primary }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
            {t('profile.editProfile')}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <View style={[styles.profilePicture, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.profileInitials, { color: theme.colors.text.primary }]}>
              {getInitials(formData.name || user.name)}
            </Text>
          </View>
          <TouchableOpacity style={[styles.editIcon, { backgroundColor: theme.colors.text.primary }]}>
            <Text style={[styles.editIconText, { color: theme.colors.background.primary }]}>✏️</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Name */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>{t('profile.yourName')}</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border.primary,
              }]}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Enter your name"
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          {/* Email */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>{t('profile.email')}</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border.primary,
              }]}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter your email"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Mobile Number */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>Mobile Number*</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border.primary,
              }]}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter mobile number"
              placeholderTextColor={theme.colors.text.tertiary}
              keyboardType="phone-pad"
              editable={false} // Phone number shouldn't be editable after registration
            />
          </View>

          {/* Date of Birth */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>Date of Birth*</Text>
            <TextInput
              style={[styles.input, { 
                backgroundColor: theme.colors.background.secondary,
                color: theme.colors.text.primary,
                borderColor: theme.colors.border.primary,
              }]}
              value={formData.dateOfBirth}
              onChangeText={(value) => handleInputChange('dateOfBirth', value)}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>

          {/* Gender */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.colors.text.primary }]}>Gender*</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'Male' && { backgroundColor: theme.colors.brand.primary },
                  { borderColor: theme.colors.border.primary }
                ]}
                onPress={() => handleInputChange('gender', 'Male')}
              >
                <Text style={[
                  styles.genderButtonText,
                  { color: formData.gender === 'Male' ? theme.colors.text.inverse : theme.colors.text.primary }
                ]}>
                  ♂ Male
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'Female' && { backgroundColor: theme.colors.brand.primary },
                  { borderColor: theme.colors.border.primary }
                ]}
                onPress={() => handleInputChange('gender', 'Female')}
              >
                <Text style={[
                  styles.genderButtonText,
                  { color: formData.gender === 'Female' ? theme.colors.text.inverse : theme.colors.text.primary }
                ]}>
                  ♀ Female
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={t('profile.saveChanges')}
            onPress={handleSave}
            size="large"
            fullWidth
          />
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 24,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIconText: {
    fontSize: 14,
  },
  formContainer: {
    marginBottom: 40,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    marginBottom: 40,
  },
});

export default EditProfileScreen; 