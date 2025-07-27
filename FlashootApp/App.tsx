import React from 'react';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AppDataProvider } from './src/contexts/AppDataContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AppDataProvider>
        <AppNavigator />
      </AppDataProvider>
    </ThemeProvider>
  );
}
