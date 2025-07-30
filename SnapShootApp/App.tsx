import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AppDataProvider } from './src/contexts/AppDataContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppDataProvider>
          <AppNavigator />
        </AppDataProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
