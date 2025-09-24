import React, { useState } from "react";
import ConditionalPricing from "./pricing/conditional-pricing";
import { useTenant } from "../contexts/tenant.context";

const TenantDemoContent: React.FC = () => {
  const { currentTenant, updateTenant } = useTenant();
  const [selectedClientType, setSelectedClientType] =
    useState<string>("pay-plus-points");

  const demoProducts = [
    {
      id: "1",
      name: "Premium Gift Card",
      price: 1000,
      points: 100000,
      originalPrice: 1200,
      discount: 17,
    },
    {
      id: "2",
      name: "Experience Voucher",
      price: 2500,
      points: 250000,
      originalPrice: 3000,
      discount: 17,
    },
    {
      id: "3",
      name: "Shopping Credit",
      price: 500,
      points: 50000,
      originalPrice: 600,
      discount: 17,
    },
  ];

  const handleClientTypeChange = (clientType: string) => {
    setSelectedClientType(clientType);
    if (currentTenant) {
      updateTenant({
        ...currentTenant,
        clientConfig: {
          ...currentTenant.clientConfig,
          paymentConfig: {
            ...currentTenant.clientConfig.paymentConfig,
            clientType: clientType as
              | "only-pay"
              | "only-points"
              | "pay-plus-points",
          },
        },
      });
    }
  };

  const getClientTypeLabel = (type: string) => {
    const labels = {
      "only-pay": "Payment Only",
      "only-points": "Points Only",
      "pay-plus-points": "Pay + Points",
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Multi-Tenant Rewards Platform Demo
          </h1>
          <p className="text-lg text-gray-600">
            See how different client configurations affect pricing display
          </p>
        </div>

        {/* Client Type Selector */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Client Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                value: "only-pay",
                label: "Payment Only",
                description: "Users can only pay with money",
                icon: "💳",
              },
              {
                value: "only-points",
                label: "Points Only",
                description: "Users can only redeem with points",
                icon: "⭐",
              },
              {
                value: "pay-plus-points",
                label: "Pay + Points",
                description: "Users can pay with money and points",
                icon: "💰",
              },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleClientTypeChange(option.value)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedClientType === option.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{option.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {option.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Client Type</h3>
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                {getClientTypeLabel(selectedClientType)}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">
                Pricing Display
              </h3>
              <p className="text-sm text-gray-600">
                {selectedClientType === "only-pay" &&
                  "Shows only currency prices"}
                {selectedClientType === "only-points" &&
                  "Shows only points required"}
                {selectedClientType === "pay-plus-points" &&
                  "Shows both points and currency"}
              </p>
            </div>
          </div>
        </div>

        {/* Product Pricing Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Product Pricing Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="font-medium text-gray-900 mb-3">
                  {product.name}
                </h3>

                {/* Original Price */}
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Original Price:</span>
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Discount */}
                <div className="mb-4">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    {product.discount}% OFF
                  </span>
                </div>

                {/* Conditional Pricing Display */}
                <div className="border-t pt-3">
                  <span className="text-sm font-medium text-gray-700 mb-2 block">
                    Your Price:
                  </span>
                  <ConditionalPricing
                    price={product.price}
                    points={product.points}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                    currency="₹"
                    className="text-lg font-semibold"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Preview */}
        {currentTenant && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Theme Preview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg tenant-card">
                <h3 className="font-medium tenant-text-primary mb-2">
                  Primary Color
                </h3>
                <div
                  className="w-full h-8 rounded"
                  style={{
                    backgroundColor: currentTenant.theme.primaryColor,
                  }}
                ></div>
                <p className="text-xs text-gray-500 mt-1">
                  {currentTenant.theme.primaryColor}
                </p>
              </div>

              <div className="p-4 rounded-lg tenant-card">
                <h3 className="font-medium tenant-text-primary mb-2">
                  Secondary Color
                </h3>
                <div
                  className="w-full h-8 rounded"
                  style={{
                    backgroundColor: currentTenant.theme.secondaryColor,
                  }}
                ></div>
                <p className="text-xs text-gray-500 mt-1">
                  {currentTenant.theme.secondaryColor}
                </p>
              </div>

              <div className="p-4 rounded-lg tenant-card">
                <h3 className="font-medium tenant-text-primary mb-2">
                  Accent Color
                </h3>
                <div
                  className="w-full h-8 rounded"
                  style={{ backgroundColor: currentTenant.theme.accentColor }}
                ></div>
                <p className="text-xs text-gray-500 mt-1">
                  {currentTenant.theme.accentColor}
                </p>
              </div>

              <div className="p-4 rounded-lg tenant-card">
                <h3 className="font-medium tenant-text-primary mb-2">
                  Background
                </h3>
                <div
                  className="w-full h-8 rounded border"
                  style={{
                    backgroundColor: currentTenant.theme.backgroundColor,
                  }}
                ></div>
                <p className="text-xs text-gray-500 mt-1">
                  {currentTenant.theme.backgroundColor}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantDemoContent;
