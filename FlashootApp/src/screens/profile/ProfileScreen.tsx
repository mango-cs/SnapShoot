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
import { useUser, useWallet } from '../../contexts/AppDataContext';

const ProfileScreen: React.FC = () => {
  const { theme, toggleTheme, themeMode } = useTheme();
  const { user } = useUser();
  const { balance } = useWallet();

  const handleManageTheme = () => {
    Alert.alert(
      'Manage Theme',
      `Current theme: ${themeMode === 'dark' ? 'Dark' : 'Light'}\n\nWould you like to switch themes?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: `Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'}`, 
          onPress: toggleTheme 
        },
      ]
    );
  };

  const settingsOptions = [
    { 
      section: 'Your Bookings & Cancellations',
      items: [
        { title: 'Upcoming Booking', icon: '📅' },
        { title: 'Cancellation', icon: '❌' },
      ]
    },
    { 
      section: 'Location & Address',
      items: [
        { title: 'Manage Address', icon: '📍' },
        { title: 'Add New', icon: '➕' },
      ]
    },
    { 
      section: 'Wallet & History',
      items: [
        { title: 'Add Money', icon: '💰' },
        { title: 'Transaction History', icon: '📊' },
      ]
    },
    { 
      section: 'Help Center',
      items: [
        { title: 'FAQs', icon: '❓' },
        { title: 'Customer Support', icon: '🎧' },
      ]
    },
    { 
      section: 'Settings',
      items: [
        { title: 'Manage Account', icon: '👤' },
        { title: 'Manage Theme', icon: themeMode === 'dark' ? '🌙' : '☀️', action: handleManageTheme },
        { title: 'Delete Account', icon: '🗑️' },
      ]
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.brand.primary }]}>
              <Text style={[styles.avatarText, { color: theme.colors.text.inverse }]}>
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.userName, { color: theme.colors.text.primary }]}>
                {user.name}
              </Text>
              <Text style={[styles.memberSince, { color: theme.colors.text.secondary }]}>
                Member Since {user.joinDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </Text>
              {user.email && (
                <Text style={[styles.userContact, { color: theme.colors.text.secondary }]}>
                  📧 {user.email}
                </Text>
              )}
              <Text style={[styles.userContact, { color: theme.colors.text.secondary }]}>
                📱 {user.phone}
              </Text>
            </View>
          </View>
          
          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.editButton}>
              <Text style={[styles.editIcon, { color: theme.colors.text.secondary }]}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.supportButton}>
              <Text style={[styles.supportIcon, { color: theme.colors.text.secondary }]}>🎧</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={[styles.verifyButton, { backgroundColor: theme.colors.brand.primary }]}>
          <Text style={[styles.verifyButtonText, { color: theme.colors.text.inverse }]}>
            Verify Now
          </Text>
        </TouchableOpacity>

        {/* Wallet Card */}
        <View style={[styles.walletCard, { backgroundColor: theme.colors.brand.primary }]}>
          <View style={styles.walletContent}>
            <Text style={[styles.walletLabel, { color: theme.colors.text.inverse }]}>
              Cash Balance: Rs. {balance.toLocaleString()}.00
            </Text>
          </View>
          <View style={styles.walletActions}>
            <TouchableOpacity style={[styles.walletActionButton, { backgroundColor: theme.colors.text.inverse }]}>
              <Text style={[styles.walletActionText, { color: theme.colors.brand.primary }]}>➕ Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.walletActionButton, { backgroundColor: theme.colors.text.inverse }]}>
              <Text style={[styles.walletActionText, { color: theme.colors.brand.primary }]}>⇄ Transfer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsOptions.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.settingsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              {section.section}
            </Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex}
                style={[styles.settingsItem, { backgroundColor: theme.colors.background.secondary }]}
                onPress={item.action || (() => console.log(`${item.title} pressed`))}
              >
                <View style={styles.settingsItemContent}>
                  <Text style={styles.settingsIcon}>{item.icon}</Text>
                  <Text style={[styles.settingsItemText, { color: theme.colors.text.primary }]}>
                    {item.title}
                  </Text>
                </View>
                <Text style={[styles.settingsArrow, { color: theme.colors.text.tertiary }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={[styles.logoutButton, { borderColor: theme.colors.brand.primary }]}>
          <Text style={[styles.logoutButtonText, { color: theme.colors.brand.primary }]}>
            Logout
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: theme.colors.text.tertiary }]}>
            v4.0.4
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
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    marginBottom: 8,
  },
  userContact: {
    fontSize: 14,
    marginBottom: 2,
  },
  profileActions: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
  editIcon: {
    fontSize: 20,
  },
  supportButton: {
    padding: 8,
  },
  supportIcon: {
    fontSize: 20,
  },
  verifyButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  walletContent: {
    flex: 1,
  },
  walletLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  walletActions: {
    flexDirection: 'row',
  },
  walletActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  walletActionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingsItemText: {
    fontSize: 16,
    flex: 1,
  },
  settingsArrow: {
    fontSize: 20,
  },
  logoutButton: {
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 24,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  versionText: {
    fontSize: 14,
  },
});

export default ProfileScreen; 