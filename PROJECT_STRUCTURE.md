# 📁 SnapShoot App - Project Structure

## 🏗️ Main Directory Structure

```
snapshoot-app/
├── 📱 src/
│   ├── 🧩 components/          # Reusable UI components
│   ├── 📄 screens/            # Application screens
│   ├── 🧭 navigation/         # Navigation configuration
│   ├── 🎨 theme/             # Design system & styling
│   ├── 🔧 services/          # API calls & external services
│   ├── 📦 store/             # State management
│   ├── 🛠️ utils/             # Helper functions
│   ├── 🔌 hooks/             # Custom React hooks
│   ├── 📊 types/             # TypeScript type definitions
│   └── 📚 constants/         # App constants
├── 📋 assets/
│   ├── 🖼️ images/           # Static images
│   ├── 🎵 sounds/           # Audio files
│   ├── 🎬 animations/       # Lottie animations
│   └── 🔤 fonts/           # Custom fonts
├── 📝 docs/                  # Documentation
├── 🧪 __tests__/            # Test files
├── 📱 ios/                  # iOS specific code
├── 🤖 android/              # Android specific code
└── 📊 scripts/              # Build & deployment scripts
```

## 🧩 Components Structure

```
src/components/
├── 🎨 ui/                    # Basic UI components
│   ├── Button/
│   │   ├── PrimaryButton.tsx
│   │   ├── SecondaryButton.tsx
│   │   ├── IconButton.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── TextInput.tsx
│   │   ├── PhoneInput.tsx
│   │   ├── OTPInput.tsx
│   │   └── index.ts
│   ├── Card/
│   │   ├── ServiceCard.tsx
│   │   ├── PartnerCard.tsx
│   │   ├── WalletCard.tsx
│   │   └── index.ts
│   └── Typography/
│       ├── Heading.tsx
│       ├── Text.tsx
│       └── index.ts
├── 🔧 form/                  # Form-specific components
│   ├── FormInput.tsx
│   ├── FormCheckbox.tsx
│   ├── FormDatePicker.tsx
│   └── FormValidation.tsx
├── 🧭 navigation/            # Navigation components
│   ├── BottomTabBar.tsx
│   ├── HeaderBar.tsx
│   ├── BackButton.tsx
│   └── TabIcon.tsx
├── 📱 layout/               # Layout components
│   ├── Container.tsx
│   ├── SafeArea.tsx
│   ├── ScrollContainer.tsx
│   └── KeyboardAvoidingView.tsx
├── 🔄 feedback/             # Feedback components
│   ├── LoadingSpinner.tsx
│   ├── Toast.tsx
│   ├── Modal.tsx
│   ├── EmptyState.tsx
│   └── ErrorBoundary.tsx
└── 🎯 specialized/          # Feature-specific components
    ├── BookingCard.tsx
    ├── PartnerCarousel.tsx
    ├── ServiceGrid.tsx
    ├── WalletBalance.tsx
    └── LocationPicker.tsx
```

## 📄 Screens Structure

```
src/screens/
├── 🔐 auth/                 # Authentication screens
│   ├── SplashScreen.tsx
│   ├── OnboardingScreen.tsx
│   ├── LoginScreen.tsx
│   └── OTPVerificationScreen.tsx
├── 🏠 home/                # Home tab screens
│   ├── HomeScreen.tsx
│   ├── CategoryDetailScreen.tsx
│   ├── ServiceDetailScreen.tsx
│   └── PartnerProfileScreen.tsx
├── 📅 bookings/            # Booking tab screens
│   ├── BookingsListScreen.tsx
│   ├── BookingDetailScreen.tsx
│   ├── BookingHistoryScreen.tsx
│   ├── CreateBookingScreen.tsx
│   └── BookingConfirmationScreen.tsx
├── 💳 wallet/              # Wallet tab screens
│   ├── WalletScreen.tsx
│   ├── AddMoneyScreen.tsx
│   ├── TransactionHistoryScreen.tsx
│   ├── CouponsScreen.tsx
│   └── ReferralScreen.tsx
├── 👤 profile/             # Profile tab screens
│   ├── ProfileScreen.tsx
│   ├── EditProfileScreen.tsx
│   ├── AddressManagementScreen.tsx
│   ├── SettingsScreen.tsx
│   ├── SupportScreen.tsx
│   └── FAQScreen.tsx
└── 🔄 shared/              # Shared screens
    ├── SearchScreen.tsx
    ├── NotificationsScreen.tsx
    ├── ImageViewerScreen.tsx
    └── WebViewScreen.tsx
```

## 🧭 Navigation Structure

```
src/navigation/
├── AppNavigator.tsx          # Root navigator
├── AuthNavigator.tsx         # Authentication flow
├── MainTabNavigator.tsx      # Bottom tab navigation
├── HomeStackNavigator.tsx    # Home tab stack
├── BookingStackNavigator.tsx # Booking tab stack
├── WalletStackNavigator.tsx  # Wallet tab stack
├── ProfileStackNavigator.tsx # Profile tab stack
├── ModalNavigator.tsx        # Modal screens
└── types.ts                 # Navigation types
```

## 🎨 Theme Structure

```
src/theme/
├── index.ts                 # Main theme export
├── colors.ts               # Color palette
├── typography.ts           # Font styles
├── spacing.ts              # Spacing system
├── shadows.ts              # Shadow styles
├── borders.ts              # Border styles
└── components/             # Component-specific styles
    ├── button.ts
    ├── input.ts
    ├── card.ts
    └── navigation.ts
```

## 🔧 Services Structure

```
src/services/
├── api/                    # API service layer
│   ├── auth.ts
│   ├── user.ts
│   ├── booking.ts
│   ├── wallet.ts
│   ├── partner.ts
│   └── notification.ts
├── storage/               # Local storage
│   ├── AsyncStorage.ts
│   ├── SecureStorage.ts
│   └── Cache.ts
├── firebase/              # Firebase services
│   ├── auth.ts
│   ├── firestore.ts
│   ├── storage.ts
│   └── messaging.ts
├── payments/              # Payment services
│   ├── stripe.ts
│   ├── razorpay.ts
│   └── wallet.ts
├── location/              # Location services
│   ├── geocoding.ts
│   ├── location.ts
│   └── maps.ts
└── analytics/             # Analytics services
    ├── firebase.ts
    ├── mixpanel.ts
    └── events.ts
```

## 📦 Store Structure (Zustand)

```
src/store/
├── index.ts               # Store configuration
├── slices/               # Individual store slices
│   ├── authSlice.ts
│   ├── userSlice.ts
│   ├── bookingSlice.ts
│   ├── walletSlice.ts
│   ├── partnerSlice.ts
│   ├── locationSlice.ts
│   └── uiSlice.ts
├── middleware/           # Store middleware
│   ├── persistence.ts
│   ├── logger.ts
│   └── devtools.ts
└── types.ts             # Store types
```

## 🛠️ Utils Structure

```
src/utils/
├── formatters/           # Data formatters
│   ├── currency.ts
│   ├── date.ts
│   ├── phone.ts
│   └── text.ts
├── validators/           # Validation functions
│   ├── form.ts
│   ├── phone.ts
│   ├── email.ts
│   └── otp.ts
├── helpers/             # Helper functions
│   ├── permissions.ts
│   ├── linking.ts
│   ├── share.ts
│   └── device.ts
├── transforms/          # Data transformers
│   ├── api.ts
│   ├── image.ts
│   └── location.ts
└── constants/           # Utility constants
    ├── regex.ts
    ├── dimensions.ts
    └── timers.ts
```

## 🔌 Hooks Structure

```
src/hooks/
├── useAuth.ts           # Authentication hook
├── useApi.ts            # API calls hook
├── useLocation.ts       # Location services hook
├── usePermissions.ts    # Device permissions hook
├── useKeyboard.ts       # Keyboard handling hook
├── useNetwork.ts        # Network status hook
├── useDebounce.ts       # Debounce hook
├── useAsync.ts          # Async operations hook
├── useImagePicker.ts    # Image selection hook
└── useNotifications.ts  # Push notifications hook
```

## 📊 Types Structure

```
src/types/
├── api.ts               # API response types
├── auth.ts              # Authentication types
├── user.ts              # User data types
├── booking.ts           # Booking types
├── wallet.ts            # Wallet types
├── partner.ts           # Partner types
├── location.ts          # Location types
├── notification.ts      # Notification types
├── navigation.ts        # Navigation types
└── common.ts            # Common/shared types
```

## 📚 Constants Structure

```
src/constants/
├── app.ts               # App configuration
├── api.ts               # API endpoints
├── storage.ts           # Storage keys
├── navigation.ts        # Navigation constants
├── permissions.ts       # Permission constants
├── analytics.ts         # Analytics events
└── config.ts            # Environment config
```

## 📋 Assets Structure

```
assets/
├── images/
│   ├── splash/          # Splash screen assets
│   ├── onboarding/      # Onboarding images
│   ├── icons/           # App icons
│   ├── categories/      # Service category images
│   ├── partners/        # Partner photos
│   └── placeholders/    # Placeholder images
├── animations/
│   ├── loading.json     # Loading animations
│   ├── success.json     # Success animations
│   ├── error.json       # Error animations
│   └── empty.json       # Empty state animations
├── sounds/
│   ├── notification.mp3 # Notification sound
│   ├── success.mp3      # Success sound
│   └── error.mp3        # Error sound
└── fonts/
    ├── Inter-Regular.ttf
    ├── Inter-Medium.ttf
    ├── Inter-SemiBold.ttf
    ├── Inter-Bold.ttf
    └── Poppins-Bold.ttf
```

## 🧪 Tests Structure

```
__tests__/
├── components/          # Component tests
│   ├── ui/
│   ├── form/
│   ├── navigation/
│   └── specialized/
├── screens/            # Screen tests
│   ├── auth/
│   ├── home/
│   ├── bookings/
│   ├── wallet/
│   └── profile/
├── services/           # Service tests
│   ├── api/
│   ├── firebase/
│   ├── payments/
│   └── storage/
├── utils/              # Utility tests
│   ├── formatters/
│   ├── validators/
│   └── helpers/
├── hooks/              # Hook tests
├── e2e/               # End-to-end tests
│   ├── auth.e2e.ts
│   ├── booking.e2e.ts
│   ├── wallet.e2e.ts
│   └── profile.e2e.ts
└── __mocks__/         # Mock implementations
    ├── react-native.js
    ├── firebase.js
    └── expo.js
```

## 📝 Configuration Files

```
snapshoot-app/
├── package.json         # Dependencies & scripts
├── app.json            # Expo configuration
├── metro.config.js     # Metro bundler config
├── babel.config.js     # Babel configuration
├── tsconfig.json       # TypeScript config
├── jest.config.js      # Jest testing config
├── .eslintrc.js        # ESLint rules
├── .prettierrc         # Prettier config
├── .env.example        # Environment variables template
├── eas.json           # EAS Build configuration
└── .gitignore         # Git ignore rules
```

## 🚀 Key Architecture Principles

### 1. **Modular Design**
- Each feature is self-contained with its own components, screens, and logic
- Easy to add, remove, or modify features without affecting others
- Clear separation of concerns

### 2. **Scalable Structure**
- Organized by feature rather than file type
- Easy to locate and maintain code
- Supports team collaboration

### 3. **Reusable Components**
- Comprehensive UI component library
- Consistent design across the app
- Easy theming and customization

### 4. **Type Safety**
- Full TypeScript implementation
- Strict type checking
- Better developer experience and fewer runtime errors

### 5. **Performance Optimization**
- Lazy loading of screens and components
- Efficient state management
- Optimized image and asset handling

### 6. **Testing Strategy**
- Unit tests for components and utilities
- Integration tests for screens and flows
- E2E tests for critical user journeys

### 7. **Developer Experience**
- Hot reload and fast refresh
- Comprehensive linting and formatting
- Clear documentation and comments

---

This structure provides a solid foundation for building a maintainable, scalable, and well-organized React Native application that can grow with the project's needs. 