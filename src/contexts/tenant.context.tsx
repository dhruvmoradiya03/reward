import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { TenantConfig, TenantContextType } from "../types/tenant";

const TenantContext = createContext<TenantContextType | undefined>(undefined);

interface TenantProviderProps {
  children: ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<TenantConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock tenant data - in real app, this would come from API
  const mockTenant: TenantConfig = {
    id: "tenant-1",
    name: "Demo Client",
    subdomain: "demo",
    domain: "demo.rewardsplatform.com",
    logo: "/assets/images/logo.png",
    favicon: "/favicon.ico",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),

    clientConfig: {
      id: "client-1",
      name: "Demo Client Ltd",
      email: "admin@demo.com",
      phone: "+1234567890",
      address: "123 Demo Street, Demo City",
      isActive: true,

      paymentConfig: {
        clientType: "pay-plus-points", // This determines pricing display
        paymentGateway: {
          provider: "stripe",
          apiKey: "pk_test_...",
          secretKey: "sk_test_...",
          isActive: true,
        },
        pointsPayConfig: {
          minPointsRequired: 100,
          maxPointsAllowed: 10000,
          pointsToCurrencyRatio: 0.01, // 1 point = 0.01 currency
        },
      },

      pointsConfig: {
        isEnabled: true,
        apiEndpoint: "https://api.demo.com/points",
        apiKey: "api_key_here",
        pointBalanceField: "balance",
        debitPointEndpoint: "https://api.demo.com/points/debit",
        creditPointEndpoint: "https://api.demo.com/points/credit",
      },
    },

    theme: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      accentColor: "#F59E0B",
      backgroundColor: "#FFFFFF",
      cardBackgroundColor: "#F9FAFB",
      headerBackgroundColor: "#FFFFFF",
      footerBackgroundColor: "#1F2937",
      textColor: "#111827",
      textSecondaryColor: "#6B7280",
      linkColor: "#3B82F6",
      fontFamily: "Inter, sans-serif",
      fontSize: {
        small: "0.875rem",
        medium: "1rem",
        large: "1.125rem",
        xlarge: "1.25rem",
      },
      borderColor: "#E5E7EB",
      shadowColor: "rgba(0, 0, 0, 0.1)",
    },

    features: {
      homepage: {
        showBanner: true,
        showFeaturedProducts: true,
        showFeaturedVouchers: true,
        showCategories: true,
        showPointsBalance: true,
      },
      navigation: {
        showMyAccount: true,
        showRedemptionHistory: true,
        showPointBalance: true,
        showWishlist: true,
      },
      products: {
        showPricing: true,
        showPoints: true,
        showDiscount: true,
        showWishlist: true,
        showAddToCart: true,
      },
      cart: {
        showPincodeCheck: true,
        showPointsPayOption: true,
        showPaymentGateway: true,
      },
      user: {
        showOTPLogin: true,
        showPasswordLogin: true,
        showSSOLogin: false,
        showRegistration: true,
      },
    },
  };

  const updateTenant = (tenant: Partial<TenantConfig>) => {
    setCurrentTenant((prev) => (prev ? { ...prev, ...tenant } : null));
  };

  const refreshTenant = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In real app, fetch from API based on subdomain
      const subdomain = window.location.hostname.split(".")[0];

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo, always return mock tenant
      setCurrentTenant(mockTenant);
    } catch (err) {
      setError("Failed to load tenant configuration");
      console.error("Tenant loading error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshTenant();
  }, [refreshTenant]);

  const value: TenantContextType = {
    currentTenant,
    isLoading,
    error,
    updateTenant,
    refreshTenant,
  };

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
