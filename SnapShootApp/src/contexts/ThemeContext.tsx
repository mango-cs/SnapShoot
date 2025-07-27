import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { themes, darkTheme, lightTheme, Theme, ThemeMode } from '../theme/themes';

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  isLight: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  isLoading: boolean;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Storage key for theme preference
const THEME_STORAGE_KEY = '@snapshoot_theme_mode';

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: ThemeMode;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'dark',
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from storage on app start
  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  // Save theme to storage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveThemeToStorage(themeMode);
    }
  }, [themeMode, isLoading]);

  const loadThemeFromStorage = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setThemeMode(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemeToStorage = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
    }
  };

  const toggleTheme = () => {
    setThemeMode(current => current === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  // Get current theme object
  const theme = themes[themeMode];
  const isDark = themeMode === 'dark';
  const isLight = themeMode === 'light';

  const contextValue: ThemeContextType = {
    theme,
    themeMode,
    isDark,
    isLight,
    toggleTheme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StatusBar 
        style={isDark ? 'light' : 'dark'} 
        backgroundColor={theme.colors.background.primary}
      />
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

// Hook to get current theme colors
export const useThemeColors = () => {
  const { theme } = useTheme();
  return theme.colors;
};

// Hook to check if dark mode is active
export const useIsDarkMode = (): boolean => {
  const { isDark } = useTheme();
  return isDark;
};

// Export theme context for advanced usage
export { ThemeContext };
export default ThemeProvider; 