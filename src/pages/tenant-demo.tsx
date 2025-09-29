import React, { useState, useEffect } from "react";
import { useTenantConfig } from "../hooks/use-tenant-config";
import ConditionalPricing from "@components/common/conditional-pricing";
import ConditionalPaymentOptions from "@components/cart/conditional-payment-options";
import ConditionalLoginForm from "@components/auth/conditional-login-form";
import { useUI } from "@contexts/ui.context";

const TenantDemo: React.FC = () => {
  const {
    currentTenant,
    isLoading,
    error,
    canUsePoints,
    canUsePayment,
    canUsePointsAndPay,
    isOnlyPoints,
    isOnlyPay,
    clientType,
    theme,
    features,
  } = useTenantConfig();

  const { openModal } = useUI();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "points" | "payment" | "hybrid"
  >("payment");
  const [userPoints, setUserPoints] = useState(5000);

  // Mock product data
  const mockProduct = {
    id: 1,
    name: "Apple iPhone 15 Pro",
    price: 99999,
    points: 999990,
    discount: 10,
    originalPrice: 110999,
    image: "/assets/images/placeholder/product-1.jpg",
  };

  const mockCartTotal = 99999;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tenant configuration...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Configuration Error
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentTenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-xl mb-4">🏢</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Tenant Found
          </h2>
          <p className="text-gray-600">Unable to load tenant configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ backgroundColor: theme?.backgroundColor }}
    >
      {/* Header */}
      <header
        className="bg-white shadow-sm border-b"
        style={{ backgroundColor: theme?.headerBackgroundColor }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src={currentTenant.logo}
                alt={currentTenant.name}
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.src = "/assets/images/logo.png";
                }}
              />
              <span
                className="ml-3 text-xl font-semibold"
                style={{ color: theme?.textColor }}
              >
                {currentTenant.name}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {features?.navigation.showPointBalance && canUsePoints && (
                <div className="text-sm">
                  <span className="text-gray-600">Points:</span>
                  <span
                    className="ml-1 font-semibold"
                    style={{ color: theme?.primaryColor }}
                  >
                    {userPoints.toLocaleString()}
                  </span>
                </div>
              )}
              <button
                onClick={() => openModal()}
                className="px-4 py-2 rounded-md text-sm font-medium"
                style={{
                  backgroundColor: theme?.primaryColor,
                  color: "white",
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tenant Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: theme?.textColor }}
          >
            Multi-Tenant Demo
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Tenant Information
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {currentTenant.name}
                </p>
                <p>
                  <span className="font-medium">Subdomain:</span>{" "}
                  {currentTenant.subdomain}
                </p>
                <p>
                  <span className="font-medium">Domain:</span>{" "}
                  {currentTenant.domain}
                </p>
                <p>
                  <span className="font-medium">Client:</span>{" "}
                  {currentTenant.clientConfig.name}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Payment Configuration
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Type:</span> {clientType}
                </p>
                <p>
                  <span className="font-medium">Points Enabled:</span>{" "}
                  {canUsePoints ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Payment Enabled:</span>{" "}
                  {canUsePayment ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Hybrid Mode:</span>{" "}
                  {canUsePointsAndPay ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Feature Flags
              </h3>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Show Pricing:</span>{" "}
                  {features?.products.showPricing ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Show Points:</span>{" "}
                  {features?.products.showPoints ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Show Points Balance:</span>{" "}
                  {features?.homepage.showPointsBalance ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">OTP Login:</span>{" "}
                  {features?.user.showOTPLogin ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Pricing Demo */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: theme?.textColor }}
          >
            Product Pricing (Conditional Display)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={mockProduct.image}
                alt={mockProduct.name}
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "/assets/images/placeholder/product-1.jpg";
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{mockProduct.name}</h3>
              <ConditionalPricing
                price={mockProduct.price}
                points={mockProduct.points}
                discount={mockProduct.discount}
                originalPrice={mockProduct.originalPrice}
                className="mb-4"
              />
              <div className="text-sm text-gray-600">
                <p>
                  This pricing display changes based on tenant configuration:
                </p>
                <ul className="mt-2 space-y-1">
                  <li>
                    • <strong>Only Points:</strong> Shows points required
                  </li>
                  <li>
                    • <strong>Only Pay:</strong> Shows price only
                  </li>
                  <li>
                    • <strong>Points + Pay:</strong> Shows both options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Options Demo */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: theme?.textColor }}
          >
            Payment Options (Conditional Display)
          </h2>
          <div className="max-w-2xl">
            <ConditionalPaymentOptions
              totalAmount={mockCartTotal}
              userPoints={userPoints}
              onPaymentMethodChange={setSelectedPaymentMethod}
              selectedMethod={selectedPaymentMethod}
            />
          </div>
        </div>

        {/* Login Form Demo */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: theme?.textColor }}
          >
            Authentication Options (Conditional Display)
          </h2>
          <div className="max-w-md">
            <ConditionalLoginForm />
          </div>
        </div>

        {/* Theme Demo */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: theme?.textColor }}
          >
            Theme Configuration
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2"
                style={{ backgroundColor: theme?.primaryColor }}
              ></div>
              <p className="text-sm font-medium">Primary</p>
              <p className="text-xs text-gray-600">{theme?.primaryColor}</p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2"
                style={{ backgroundColor: theme?.secondaryColor }}
              ></div>
              <p className="text-sm font-medium">Secondary</p>
              <p className="text-xs text-gray-600">{theme?.secondaryColor}</p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2"
                style={{ backgroundColor: theme?.accentColor }}
              ></div>
              <p className="text-sm font-medium">Accent</p>
              <p className="text-xs text-gray-600">{theme?.accentColor}</p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2 border"
                style={{ backgroundColor: theme?.cardBackgroundColor }}
              ></div>
              <p className="text-sm font-medium">Card BG</p>
              <p className="text-xs text-gray-600">
                {theme?.cardBackgroundColor}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TenantDemo;
