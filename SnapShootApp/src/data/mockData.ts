// Mock data for the SnapShoot app

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  price: number;
  duration: number; // in hours
  image?: any;
  features: string[];
  popular: boolean;
}

export interface Partner {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  location: string;
  image?: any;
  portfolio: string[];
  verified: boolean;
  price: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  partnerId: string;
  userId: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  totalAmount: number;
  paidAmount: number;
  location: string;
  notes?: string;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discount: number;
  minAmount: number;
  validUntil: Date;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  city: string;
  walletBalance: number;
  joinDate: Date;
  verified: boolean;
  dateOfBirth?: Date; // Optional field for birthday
}

// Mock Services Data
export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Wedding Photography',
    subtitle: 'Capture your love story with elegance',
    description: 'Professional wedding photography with pre-wedding, ceremony, and reception coverage',
    category: 'wedding',
    price: 25000,
    duration: 8,
    features: ['Pre-wedding shoot', 'Ceremony coverage', 'Reception photography', '300+ edited photos', 'Same day highlights'],
    popular: true,
  },
  {
    id: '2',
    title: 'Corporate Event Photography',
    subtitle: 'Capture all your achievements with elegance',
    description: 'Professional corporate event photography for meetings, conferences, and company events',
    category: 'corporate',
    price: 15000,
    duration: 6,
    features: ['Event coverage', 'Team photos', 'Presentation shots', '200+ edited photos', 'Quick delivery'],
    popular: false,
  },
  {
    id: '3',
    title: 'Celebrity Photoshoot',
    subtitle: 'Star quality content creation',
    description: 'High-end photography services for celebrities and influencers',
    category: 'celebrity',
    price: 50000,
    duration: 4,
    features: ['Professional styling', 'Multiple outfit changes', 'Studio setup', '100+ edited photos', 'Social media ready'],
    popular: true,
  },
  {
    id: '4',
    title: 'Birthday Party Photography',
    subtitle: 'Memorable moments forever',
    description: 'Fun and vibrant birthday party photography for all ages',
    category: 'birthday',
    price: 8000,
    duration: 4,
    features: ['Party coverage', 'Candid moments', 'Group photos', '150+ edited photos', 'Fun props'],
    popular: false,
  },
  {
    id: '5',
    title: 'Brand Photoshoot',
    subtitle: 'Elevate your brand image',
    description: 'Professional brand photography for products, services, and marketing',
    category: 'brand',
    price: 20000,
    duration: 6,
    features: ['Product photography', 'Lifestyle shots', 'Marketing materials', '200+ edited photos', 'Commercial usage rights'],
    popular: true,
  },
  {
    id: '6',
    title: 'Fashion Photography',
    subtitle: 'Showcase your style',
    description: 'Professional fashion photography for models, designers, and brands',
    category: 'fashion',
    price: 30000,
    duration: 5,
    features: ['Fashion shoot', 'Multiple looks', 'Professional lighting', '100+ edited photos', 'Portfolio ready'],
    popular: false,
  },
];

// Mock Partners Data
export const mockPartners: Partner[] = [
  {
    id: '1',
    name: 'Akshaya K',
    specialty: 'Events & Weddings',
    rating: 4.8,
    reviewCount: 127,
    location: 'Hyderabad',
    portfolio: ['wedding1.jpg', 'wedding2.jpg', 'event1.jpg'],
    verified: true,
    price: 25000,
  },
  {
    id: '2',
    name: 'Rahul Sharma',
    specialty: 'Corporate Photography',
    rating: 4.6,
    reviewCount: 89,
    location: 'Hyderabad',
    portfolio: ['corp1.jpg', 'corp2.jpg', 'corp3.jpg'],
    verified: true,
    price: 15000,
  },
  {
    id: '3',
    name: 'Priya Mehta',
    specialty: 'Fashion & Celebrity',
    rating: 4.9,
    reviewCount: 203,
    location: 'Mumbai',
    portfolio: ['fashion1.jpg', 'celeb1.jpg', 'fashion2.jpg'],
    verified: true,
    price: 50000,
  },
  {
    id: '4',
    name: 'Arjun Singh',
    specialty: 'Brand Photography',
    rating: 4.7,
    reviewCount: 156,
    location: 'Delhi',
    portfolio: ['brand1.jpg', 'product1.jpg', 'brand2.jpg'],
    verified: true,
    price: 20000,
  },
];

// Mock Bookings Data
export const mockBookings: Booking[] = [
  {
    id: '1',
    serviceId: '1',
    partnerId: '1',
    userId: 'user1',
    date: new Date('2025-08-15'),
    status: 'confirmed',
    totalAmount: 25000,
    paidAmount: 5000,
    location: 'Taj Falaknuma Palace, Hyderabad',
    notes: 'Traditional Telugu wedding ceremony',
  },
  {
    id: '2',
    serviceId: '2',
    partnerId: '2',
    userId: 'user1',
    date: new Date('2025-08-10'),
    status: 'pending',
    totalAmount: 15000,
    paidAmount: 0,
    location: 'Hitec City Convention Centre',
    notes: 'Annual company meeting and awards ceremony',
  },
];

// Mock Promotions Data
export const mockPromotions: Promotion[] = [
  {
    id: '1',
    code: 'FLASH50',
    title: 'Flash Discount',
    description: 'Get ₹450 off on spends above ₹3000',
    discount: 450,
    minAmount: 3000,
    validUntil: new Date('2025-12-31'),
    active: true,
  },
  {
    id: '2',
    code: 'WEDDING25',
    title: 'Wedding Special',
    description: 'Get 25% off on wedding photography packages',
    discount: 25,
    minAmount: 20000,
    validUntil: new Date('2025-12-31'),
    active: true,
  },
  {
    id: '3',
    code: 'NEWUSER100',
    title: 'Welcome Bonus',
    description: 'Get ₹1000 off on your first booking',
    discount: 1000,
    minAmount: 5000,
    validUntil: new Date('2025-12-31'),
    active: true,
  },
];

// Mock User Data
export const mockUser: User = {
  id: 'user1',
  name: 'Vasi Bid',
  phone: '+91 99****44',
  email: 'vasi@example.com',
  city: 'Hyderabad',
  walletBalance: 0,
  joinDate: new Date('2025-07-01'),
  verified: false,
};

// Helper functions
export const getServicesByCategory = (category: string): Service[] => {
  return mockServices.filter(service => service.category === category);
};

export const getPopularServices = (): Service[] => {
  return mockServices.filter(service => service.popular);
};

export const getPartnerById = (id: string): Partner | undefined => {
  return mockPartners.find(partner => partner.id === id);
};

export const getServiceById = (id: string): Service | undefined => {
  return mockServices.find(service => service.id === id);
};

export const getActivePromotions = (): Promotion[] => {
  return mockPromotions.filter(promo => promo.active && promo.validUntil > new Date());
};

export const getUserBookings = (userId: string): Booking[] => {
  return mockBookings.filter(booking => booking.userId === userId);
}; 