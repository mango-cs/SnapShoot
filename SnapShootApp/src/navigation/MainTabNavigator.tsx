import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import LottieView from 'lottie-react-native';

// Import screen components (we'll create these next)
import HomeScreen from '../screens/home/HomeScreen';
import CategoryScreen from '../screens/bookings/CategoryScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Wallet: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

// Custom Tab Icon Component
interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
  icon?: string;
  lottieSource?: any;
  iconSize?: number; // Custom size for specific icons
}

const TabIcon: React.FC<TabIconProps> = ({ focused, color, icon, lottieSource, iconSize }) => {
  const lottieRef = React.useRef<LottieView>(null);
  const prevFocused = React.useRef(focused);
  const playCount = React.useRef(0);

  React.useEffect(() => {
    // Play animation when tab becomes focused (when pressed)
    if (focused && !prevFocused.current && lottieSource && lottieRef.current) {
      playCount.current = 0; // Reset play count
      lottieRef.current.play();
    }
    prevFocused.current = focused;
  }, [focused, lottieSource]);

  const handleAnimationFinish = () => {
    playCount.current += 1;
    if (playCount.current < 2 && lottieRef.current) {
      // Play again if we haven't reached 2 plays yet
      lottieRef.current.play();
    }
  };

  // Use custom icon size if provided, otherwise use default
  const iconStyle = iconSize ? { width: iconSize, height: iconSize } : styles.lottieIcon;

  return (
    <View style={styles.tabIcon}>
      {lottieSource ? (
        <LottieView
          ref={lottieRef}
          source={lottieSource}
          style={iconStyle}
          autoPlay={false}
          loop={false}
          onAnimationFinish={handleAnimationFinish}
        />
      ) : (
        <Text style={[styles.tabIconText, { color }]}>{icon}</Text>
      )}
    </View>
  );
};

const MainTabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: theme.colors.primary.black,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.brand.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused} 
              color={color} 
              size={size} 
              lottieSource={require('../assets/animations/home-indicator.json')}
              iconSize={28} // Standard size for consistency
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused} 
              color={color} 
              size={size} 
              lottieSource={require('../assets/animations/explore-indicator.json')}
              iconSize={31} // Enlarged by 10% for better visibility
            />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused} 
              color={color} 
              size={size} 
              lottieSource={require('../assets/animations/wallet-indicator.json')}
              iconSize={28} // Standard size for consistency
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon 
              focused={focused} 
              color={color} 
              size={size} 
              lottieSource={require('../assets/animations/profile-indicator.json')}
              iconSize={32} // Slightly larger for profile but still centered
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 4,
    position: 'relative',
    width: 40,
    height: 40,
  },
  tabIconText: {
    fontSize: 24,
  },
  lottieIcon: {
    width: 28,
    height: 28,
  },

});

export default MainTabNavigator; 