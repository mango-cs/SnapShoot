import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Service,
  Partner,
  Booking,
  Promotion,
  User,
  mockServices,
  mockPartners,
  mockBookings,
  mockPromotions,
  mockUser,
  getServicesByCategory,
  getPopularServices,
  getPartnerById,
  getServiceById,
  getActivePromotions,
  getUserBookings,
} from '../data/mockData';

// App data context interface
interface AppDataContextType {
  // Data
  services: Service[];
  partners: Partner[];
  bookings: Booking[];
  promotions: Promotion[];
  user: User;
  
  // Helper functions
  getServicesByCategory: (category: string) => Service[];
  getPopularServices: () => Service[];
  getPartnerById: (id: string) => Partner | undefined;
  getServiceById: (id: string) => Service | undefined;
  getActivePromotions: () => Promotion[];
  getUserBookings: (userId: string) => Booking[];
  
  // State management functions
  updateUser: (updates: Partial<User>) => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  updateWalletBalance: (amount: number) => void;
  
  // App state
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

// Create context
const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// App data provider props
interface AppDataProviderProps {
  children: ReactNode;
}

// App data provider component
export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  // State
  const [user, setUser] = useState<User>(mockUser);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('Hyderabad');
  
  // Static data (in real app, these would come from API)
  const services = mockServices;
  const partners = mockPartners;
  const promotions = mockPromotions;

  // State management functions
  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addBooking = (bookingData: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(), // Simple ID generation for demo
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, ...updates } : booking
      )
    );
  };

  const updateWalletBalance = (amount: number) => {
    setUser(prev => ({ 
      ...prev, 
      walletBalance: Math.max(0, prev.walletBalance + amount) 
    }));
  };

  // Context value
  const contextValue: AppDataContextType = {
    // Data
    services,
    partners,
    bookings,
    promotions,
    user,
    
    // Helper functions
    getServicesByCategory,
    getPopularServices,
    getPartnerById,
    getServiceById,
    getActivePromotions,
    getUserBookings,
    
    // State management functions
    updateUser,
    addBooking,
    updateBooking,
    updateWalletBalance,
    
    // App state
    isAuthenticated,
    setIsAuthenticated,
    selectedCity,
    setSelectedCity,
  };

  return (
    <AppDataContext.Provider value={contextValue}>
      {children}
    </AppDataContext.Provider>
  );
};

// Custom hook to use app data context
export const useAppData = (): AppDataContextType => {
  const context = useContext(AppDataContext);
  
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  
  return context;
};

// Specific hooks for common use cases
export const useUser = () => {
  const { user, updateUser } = useAppData();
  return { user, updateUser };
};

export const useBookings = () => {
  const { bookings, addBooking, updateBooking, getUserBookings, user } = useAppData();
  return { 
    bookings, 
    addBooking, 
    updateBooking, 
    userBookings: getUserBookings(user.id) 
  };
};

export const useServices = () => {
  const { services, getServicesByCategory, getPopularServices, getServiceById } = useAppData();
  return { 
    services, 
    getServicesByCategory, 
    getPopularServices, 
    getServiceById,
    popularServices: getPopularServices(),
  };
};

export const usePromotions = () => {
  const { promotions, getActivePromotions } = useAppData();
  return { 
    promotions, 
    getActivePromotions,
    activePromotions: getActivePromotions(),
  };
};

export const useWallet = () => {
  const { user, updateWalletBalance } = useAppData();
  return { 
    balance: user.walletBalance, 
    updateBalance: updateWalletBalance 
  };
};

// Export context for advanced usage
export { AppDataContext };
export default AppDataProvider; 