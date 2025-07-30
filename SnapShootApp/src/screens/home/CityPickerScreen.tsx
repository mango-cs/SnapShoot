import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAppData } from '../../contexts/AppDataContext';

interface City {
  id: string;
  name: string;
  landmark: string;
}

const cities: City[] = [
  { id: 'mumbai', name: 'Mumbai', landmark: '🏗️' },
  { id: 'hyderabad', name: 'Hyderabad', landmark: '🕌' },
  { id: 'bangalore', name: 'Bengaluru', landmark: '🏢' },
  { id: 'vijayawada', name: 'Vijayawada', landmark: '🏛️' },
  { id: 'visakhapatnam', name: 'Visakhapatnam', landmark: '🏛️' },
  { id: 'chennai', name: 'Chennai', landmark: '🏛️' },
];

const GAP = 16;                                       // space between cards
const CARD_WIDTH = (Dimensions.get('window').width - GAP * 3) / 2;
const CARD_HEIGHT = CARD_WIDTH * 0.75;              // Better proportion for our cards

const CityPickerScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { selectedCity, setSelectedCity } = useAppData();
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleCitySelect = (cityName: string) => {
    console.log('City selected:', cityName);
    console.log('Current selectedCity:', selectedCity);
    
    // Set the selected city
    setSelectedCity(cityName);
    
    // Add a subtle scale animation for visual feedback
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const getCityImage = (cityId: string) => {
    const cityImages: Record<string, any> = {
      'mumbai': require('../../../assets/images/cities/mumbai-skyline.png'),
      'hyderabad': require('../../../assets/images/cities/hyderabad-skyline.png'),
      'chennai': require('../../../assets/images/cities/chennai-skyline.png'),
      'bangalore': require('../../../assets/images/cities/bangalore-skyline.png'),
      'vijayawada': require('../../../assets/images/cities/vijayawada-skyline.png'),
      'visakhapatnam': require('../../../assets/images/cities/warangal-skyline.png'), // Using warangal image as temporary fallback
    };
    return cityImages[cityId];
  };

  const renderCityItem = ({ item }: { item: City }) => {
    const isSelected = item.name === selectedCity;
    
    return (
      <Pressable onPress={() => handleCitySelect(item.name)}>
        <Animated.View
          style={[
            { transform: [{ scale: isSelected ? scaleAnim : 1 }] }
          ]}
        >
          <View
            style={[
              styles.cityCard,
              { backgroundColor: theme.colors.background.secondary },
              isSelected && styles.cardSelected,
            ]}
          >
            {/* Selected indicator */}
            {isSelected && (
              <View style={[styles.selectedIndicator, { backgroundColor: '#3B82F6' }]}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
            )}
            
            {/* Skyline Image */}
            <Image
              source={getCityImage(item.id)}
              style={styles.skylineImage}
              resizeMode="contain"
              onError={(error) => console.log(`Error loading image for ${item.name}:`, error)}
            />
            
            {/* City Name Label */}
            <Text style={[
              styles.cityName, 
              { color: isSelected ? '#3B82F6' : theme.colors.text.primary }
            ]}>
              {item.name}
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButtonContainer}
        >
          <Text style={[styles.backButton, { color: theme.colors.text.primary }]}>←</Text>
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
          {selectedCity}
        </Text>
        
        <View style={styles.headerSpacer} />
      </View>

      {/* Cities Grid using FlatList */}
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderCityItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButtonContainer: {
    width: 40, // Fixed width for proper alignment
    alignItems: 'flex-start',
    paddingVertical: 2, // Add small vertical padding for better touch area
  },
  backButton: {
    fontSize: 38, // Slightly larger for better visibility
    fontWeight: '300', // Lighter weight for cleaner arrow
    lineHeight: 38, // Ensure proper vertical alignment
  },
  headerTitle: {
    fontSize: 22, // Slightly larger
    fontWeight: 'bold',
    flex: 1, // Take remaining space
    textAlign: 'center', // Center the text
    marginTop: 0, // Reset margin
  },
  headerSpacer: {
    width: 40, // Same width as arrow container for balance
  },
  flatListContainer: {
    paddingHorizontal: GAP,
    paddingBottom: 40,
    paddingTop: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: GAP,
  },
  cityCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: '#3B82F6', // SnapShoot brand blue
  },
  skylineImage: {
    width: '75%',
    height: '60%',
    marginBottom: 8,
  },
  cityName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CityPickerScreen; 