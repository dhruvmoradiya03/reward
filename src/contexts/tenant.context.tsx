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
  const [isClient, setIsClient] = useState(false);

  // Function to create tenant configuration based on subdomain
  const createTenantBySubdomain = (subdomain: string): TenantConfig => {
    const tenantConfigs: Record<string, TenantConfig> = {
      demo: {
        id: "tenant-demo",
        name: "Demo Client",
        subdomain: "demo",
        domain: "demo.rewargenix.com",
        logo: "/assets/images/logo.png",
        favicon: "/favicon.ico",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        clientConfig: {
          id: "client-demo",
          name: "Demo Client Ltd",
          email: "admin@demo.com",
          phone: "+1234567890",
          address: "123 Demo Street, Demo City",
          isActive: true,
          paymentConfig: {
            clientType: "pay-plus-points",
            paymentGateway: {
              provider: "stripe",
              apiKey: "pk_test_...",
              secretKey: "sk_test_...",
              isActive: true,
            },
            pointsPayConfig: {
              minPointsRequired: 100,
              maxPointsAllowed: 10000,
              pointsToCurrencyRatio: 0.01,
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
      },
      hdfc: {
        id: "tenant-hdfc",
        name: "HDFC Bank",
        subdomain: "hdfc",
        domain: "hdfc.rewargenix.com",
        logo: "/assets/images/hdfc-logo.png",
        favicon: "/favicon.ico",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        clientConfig: {
          id: "client-hdfc",
          name: "HDFC Bank Ltd",
          email: "admin@hdfc.com",
          phone: "+911234567890",
          address: "HDFC House, Mumbai",
          isActive: true,
          paymentConfig: {
            clientType: "pay-plus-points",
            paymentGateway: {
              provider: "razorpay",
              apiKey: "rzp_test_...",
              secretKey: "rzp_secret_...",
              isActive: true,
            },
            pointsPayConfig: {
              minPointsRequired: 50,
              maxPointsAllowed: 50000,
              pointsToCurrencyRatio: 0.005, // 1 point = 0.5 paisa
            },
          },
          pointsConfig: {
            isEnabled: true,
            apiEndpoint: "https://api.hdfc.com/points",
            apiKey: "hdfc_api_key",
            pointBalanceField: "reward_points",
            debitPointEndpoint: "https://api.hdfc.com/points/debit",
            creditPointEndpoint: "https://api.hdfc.com/points/credit",
          },
        },
        theme: {
          primaryColor: "#E30613", // HDFC Red
          secondaryColor: "#1E40AF",
          accentColor: "#F59E0B",
          backgroundColor: "#FFFFFF",
          cardBackgroundColor: "#F9FAFB",
          headerBackgroundColor: "#FFFFFF",
          footerBackgroundColor: "#1F2937",
          textColor: "#111827",
          textSecondaryColor: "#6B7280",
          linkColor: "#E30613",
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
            showSSOLogin: true,
            showRegistration: false,
          },
        },
      },
      axis: {
        id: "tenant-axis",
        name: "AXIS Bank",
        subdomain: "axis",
        domain: "axis.rewargenix.com",
        logo: "/assets/images/axis-logo.png",
        favicon: "/favicon.ico",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        clientConfig: {
          id: "client-axis",
          name: "AXIS Bank Ltd",
          email: "admin@axis.com",
          phone: "+911234567890",
          address: "AXIS House, Mumbai",
          isActive: true,
          paymentConfig: {
            clientType: "only-points", // Only points redemption
            paymentGateway: {
              provider: "none",
              apiKey: "",
              secretKey: "",
              isActive: false,
            },
          },
          pointsConfig: {
            isEnabled: true,
            apiEndpoint: "https://api.axis.com/points",
            apiKey: "axis_api_key",
            pointBalanceField: "edge_rewards",
            debitPointEndpoint: "https://api.axis.com/points/debit",
            creditPointEndpoint: "https://api.axis.com/points/credit",
          },
        },
        theme: {
          primaryColor: "#FF6B35", // AXIS Orange
          secondaryColor: "#1E40AF",
          accentColor: "#F59E0B",
          backgroundColor: "#FFFFFF",
          cardBackgroundColor: "#F9FAFB",
          headerBackgroundColor: "#FFFFFF",
          footerBackgroundColor: "#1F2937",
          textColor: "#111827",
          textSecondaryColor: "#6B7280",
          linkColor: "#FF6B35",
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
            showPricing: false, // Hide pricing for points-only
            showPoints: true,
            showDiscount: false,
            showWishlist: true,
            showAddToCart: true,
          },
          cart: {
            showPincodeCheck: true,
            showPointsPayOption: false, // No payment option
            showPaymentGateway: false,
          },
          user: {
            showOTPLogin: true,
            showPasswordLogin: true,
            showSSOLogin: true,
            showRegistration: false,
          },
        },
      },
      icici: {
        id: "tenant-icici",
        name: "ICICI Bank",
        subdomain: "icici",
        domain: "icici.rewargenix.com",
        logo: "/assets/images/icici-logo.png",
        favicon: "/favicon.ico",
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        clientConfig: {
          id: "client-icici",
          name: "ICICI Bank Ltd",
          email: "admin@icici.com",
          phone: "+911234567890",
          address: "ICICI House, Mumbai",
          isActive: true,
          paymentConfig: {
            clientType: "only-pay", // Only payment gateway
            paymentGateway: {
              provider: "payu",
              apiKey: "payu_api_key",
              secretKey: "payu_secret_key",
              isActive: true,
            },
          },
          pointsConfig: {
            isEnabled: false, // No points system
            apiEndpoint: "",
            apiKey: "",
            pointBalanceField: "",
            debitPointEndpoint: "",
            creditPointEndpoint: "",
          },
        },
        theme: {
          primaryColor: "#FF6B00", // ICICI Orange
          secondaryColor: "#1E40AF",
          accentColor: "#F59E0B",
          backgroundColor: "#FFFFFF",
          cardBackgroundColor: "#F9FAFB",
          headerBackgroundColor: "#FFFFFF",
          footerBackgroundColor: "#1F2937",
          textColor: "#111827",
          textSecondaryColor: "#6B7280",
          linkColor: "#FF6B00",
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
            showPointsBalance: false, // No points balance
          },
          navigation: {
            showMyAccount: true,
            showRedemptionHistory: true,
            showPointBalance: false, // No points balance
            showWishlist: true,
          },
          products: {
            showPricing: true,
            showPoints: false, // No points display
            showDiscount: true,
            showWishlist: true,
            showAddToCart: true,
          },
          cart: {
            showPincodeCheck: true,
            showPointsPayOption: false, // No points option
            showPaymentGateway: true,
          },
          user: {
            showOTPLogin: true,
            showPasswordLogin: true,
            showSSOLogin: true,
            showRegistration: true,
          },
        },
      },
    };

    return tenantConfigs[subdomain] || tenantConfigs["demo"];
  };

  const updateTenant = (tenant: Partial<TenantConfig>) => {
    setCurrentTenant((prev) => (prev ? { ...prev, ...tenant } : null));
  };

  const getSubdomain = useCallback(() => {
    if (!isClient) return "demo"; // Default for SSR

    try {
      // Check if tenant is stored from client app redirect
      const storedTenant = localStorage.getItem("tenant");
      if (storedTenant) {
        return storedTenant;
      }

      const hostname = window.location.hostname;
      const parts = hostname.split(".");

      // Handle localhost development - check query parameter first
      if (hostname === "localhost" || hostname.includes("127.0.0.1")) {
        const urlParams = new URLSearchParams(window.location.search);
        const clientParam = urlParams.get("client");
        if (clientParam) {
          console.log("Detected client from URL:", clientParam);
          return clientParam;
        }
        return "demo"; // Default to demo for localhost
      }

      // For production: subdomain.domain.com
      if (parts.length >= 3) {
        return parts[0];
      }

      // Fallback to demo if no subdomain detected
      return "demo";
    } catch (error) {
      // Handle any localStorage errors gracefully
      console.warn("Error accessing localStorage:", error);
      return "demo";
    }
  }, [isClient]);

  const refreshTenant = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const subdomain = getSubdomain();
      console.log("Refreshing tenant for subdomain:", subdomain);

      // Simulate API call to fetch tenant by subdomain
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create tenant-specific configuration based on subdomain
      const tenantConfig = createTenantBySubdomain(subdomain);
      console.log(
        "Created tenant config:",
        tenantConfig.name,
        tenantConfig.clientConfig.paymentConfig.clientType
      );
      setCurrentTenant(tenantConfig);
    } catch (err) {
      setError("Failed to load tenant configuration");
      console.error("Tenant loading error:", err);

      // Fallback to demo tenant if there's an error
      const fallbackConfig = createTenantBySubdomain("demo");
      setCurrentTenant(fallbackConfig);
    } finally {
      setIsLoading(false);
    }
  }, [getSubdomain]);

  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      refreshTenant();
    }
  }, [refreshTenant, isClient]);

  // Listen for URL changes (query parameter changes)
  useEffect(() => {
    if (!isClient) return;

    const handleUrlChange = () => {
      refreshTenant();
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handleUrlChange);

    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      handleUrlChange();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      handleUrlChange();
    };

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [isClient, refreshTenant]);

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
