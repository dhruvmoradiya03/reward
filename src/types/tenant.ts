export interface TenantConfig {
  id: string;
  name: string;
  subdomain: string;
  domain: string;
  logo: string;
  favicon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Client Configuration
  clientConfig: ClientConfig;
  
  // Theme Configuration
  theme: ThemeConfig;
  
  // Feature Configuration
  features: FeatureConfig;
}

export interface ClientConfig {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  
  // Payment Configuration
  paymentConfig: PaymentConfig;
  
  // Points Configuration
  pointsConfig: PointsConfig;
}

export interface PaymentConfig {
  // Client Type: 'only-pay' | 'only-points' | 'pay-plus-points'
  clientType: 'only-pay' | 'only-points' | 'pay-plus-points';
  
  // Payment Gateway Settings
  paymentGateway: {
    provider: string;
    apiKey: string;
    secretKey: string;
    isActive: boolean;
  };
  
  // Points + Pay Settings
  pointsPayConfig?: {
    minPointsRequired: number;
    maxPointsAllowed: number;
    pointsToCurrencyRatio: number;
  };
}

export interface PointsConfig {
  isEnabled: boolean;
  apiEndpoint: string;
  apiKey: string;
  pointBalanceField: string;
  debitPointEndpoint: string;
  creditPointEndpoint: string;
}

export interface ThemeConfig {
  // Primary Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // Background Colors
  backgroundColor: string;
  cardBackgroundColor: string;
  headerBackgroundColor: string;
  footerBackgroundColor: string;
  
  // Text Colors
  textColor: string;
  textSecondaryColor: string;
  linkColor: string;
  
  // Font Configuration
  fontFamily: string;
  fontSize: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  
  // Border and Shadow
  borderColor: string;
  shadowColor: string;
  
  // Custom CSS
  customCSS?: string;
}

export interface FeatureConfig {
  // Homepage Features
  homepage: {
    showBanner: boolean;
    showFeaturedProducts: boolean;
    showFeaturedVouchers: boolean;
    showCategories: boolean;
    showPointsBalance: boolean;
  };
  
  // Navigation Features
  navigation: {
    showMyAccount: boolean;
    showRedemptionHistory: boolean;
    showPointBalance: boolean;
    showWishlist: boolean;
  };
  
  // Product Features
  products: {
    showPricing: boolean;
    showPoints: boolean;
    showDiscount: boolean;
    showWishlist: boolean;
    showAddToCart: boolean;
  };
  
  // Cart Features
  cart: {
    showPincodeCheck: boolean;
    showPointsPayOption: boolean;
    showPaymentGateway: boolean;
  };
  
  // User Features
  user: {
    showOTPLogin: boolean;
    showPasswordLogin: boolean;
    showSSOLogin: boolean;
    showRegistration: boolean;
  };
}

export interface TenantContextType {
  currentTenant: TenantConfig | null;
  isLoading: boolean;
  error: string | null;
  updateTenant: (tenant: Partial<TenantConfig>) => void;
  refreshTenant: () => Promise<void>;
}
