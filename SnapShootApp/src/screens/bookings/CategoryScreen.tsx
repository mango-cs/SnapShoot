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
import { useServices } from '../../contexts/AppDataContext';

const CategoryScreen: React.FC = () => {
  const { theme } = useTheme();
  const { services, getServicesByCategory } = useServices();

  // Get unique categories with their details
  const getCategories = () => {
    const categoryMap = new Map();
    
    services.forEach(service => {
      if (!categoryMap.has(service.category)) {
        categoryMap.set(service.category, {
          id: service.category,
          name: getCategoryName(service.category),
          icon: getCategoryIcon(service.category),
          serviceCount: getServicesByCategory(service.category).length,
          minPrice: Math.min(...getServicesByCategory(service.category).map(s => s.price)),
          services: getServicesByCategory(service.category)
        });
      }
    });
    
    return Array.from(categoryMap.values());
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'wedding': return 'Wedding';
      case 'corporate': return 'Corporate';
      case 'celebrity': return 'Celebrity';
      case 'birthday': return 'Birthday';
      case 'brand': return 'Brand';
      case 'fashion': return 'Fashion';
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wedding': return '💒';
      case 'corporate': return '🏢';
      case 'celebrity': return '⭐';
      case 'birthday': return '🎂';
      case 'brand': return '📸';
      case 'fashion': return '👗';
      default: return '📷';
    }
  };

  const handleCategoryPress = (category: any) => {
    Alert.alert(
      `${category.name} Photography`,
      `Explore ${category.serviceCount} services starting from ₹${category.minPrice.toLocaleString()}`,
      [
        { text: 'View Services', onPress: () => console.log(`Navigate to ${category.name}`) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const categories = getCategories();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            📸 Categories
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Choose your photography style
          </Text>
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryCard, 
                { backgroundColor: theme.colors.background.secondary },
                index % 2 === 0 ? styles.cardLeft : styles.cardRight
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={[styles.categoryIcon, { backgroundColor: theme.colors.background.tertiary }]}>
                <Text style={styles.categoryEmoji}>{category.icon}</Text>
              </View>
              
              <View style={styles.categoryInfo}>
                <Text style={[styles.categoryName, { color: theme.colors.text.primary }]}>
                  {category.name}
                </Text>
                <Text style={[styles.serviceCount, { color: theme.colors.text.secondary }]}>
                  {category.serviceCount} service{category.serviceCount !== 1 ? 's' : ''}
                </Text>
                <Text style={[styles.startingPrice, { color: theme.colors.text.accent }]}>
                  From ₹{category.minPrice.toLocaleString()}
                </Text>
              </View>

              <View style={[styles.arrowContainer, { backgroundColor: theme.colors.brand.primary }]}>
                <Text style={[styles.arrow, { color: theme.colors.text.inverse }]}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Services Section */}
        <View style={styles.popularSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            🔥 Popular Right Now
          </Text>
          
          {services.filter(service => service.popular).slice(0, 3).map((service) => (
            <TouchableOpacity 
              key={service.id}
              style={[styles.popularCard, { backgroundColor: theme.colors.background.secondary }]}
              onPress={() => Alert.alert('Service Details', `${service.title} - ₹${service.price.toLocaleString()}`)}
            >
              <View style={[styles.popularIcon, { backgroundColor: theme.colors.background.tertiary }]}>
                <Text style={styles.popularEmoji}>{getCategoryIcon(service.category)}</Text>
              </View>
              
              <View style={styles.popularInfo}>
                <Text style={[styles.popularTitle, { color: theme.colors.text.primary }]}>
                  {service.title}
                </Text>
                <Text style={[styles.popularSubtitle, { color: theme.colors.text.secondary }]}>
                  {service.subtitle}
                </Text>
                <View style={styles.popularFooter}>
                  <Text style={[styles.popularPrice, { color: theme.colors.text.accent }]}>
                    ₹{service.price.toLocaleString()}
                  </Text>
                  <Text style={[styles.popularDuration, { color: theme.colors.text.tertiary }]}>
                    {service.duration}hrs
                  </Text>
                </View>
              </View>
              
              <View style={styles.popularBadge}>
                <Text style={[styles.popularText, { color: theme.colors.brand.primary }]}>
                  HOT
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.text.tertiary }]}>
            🎯 Find the perfect photography service for your needs
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Match HomeScreen container padding
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 40, // Match HomeScreen header padding for consistent 60px total
    paddingBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  cardLeft: {
    marginRight: '2%',
  },
  cardRight: {
    marginLeft: '2%',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceCount: {
    fontSize: 14,
    marginBottom: 4,
  },
  startingPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  arrowContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  popularSection: {
    marginTop: 8,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  popularCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  popularIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  popularEmoji: {
    fontSize: 24,
  },
  popularInfo: {
    flex: 1,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  popularSubtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  popularFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularDuration: {
    fontSize: 12,
  },
  popularBadge: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default CategoryScreen; 