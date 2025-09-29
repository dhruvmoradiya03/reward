import React, { useState } from "react";
import { useRouter } from "next/router";
import WishlistCard from "@components/wishlist/wishlist-card";

// Mock data for different categories
const shoppingItems = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra 5G Smartphone with Advanced AI Camera System and Premium Titanium Design",
    image: "/assets/images/products/p-1.png",
    originalPrice: 25000,
    discountedPrice: 20000,
    discount: "20% Off",
    points: 2206,
    isWishlisted: true,
  },
  {
    id: 2,
    name: "iPhone 14 Pro, 256GB, Teal green",
    image: "/assets/images/products/p-3.png",
    originalPrice: 85000,
    discountedPrice: 68000,
    discount: "20% Off",
    points: 7500,
    isWishlisted: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Premium Noise Cancelling Wireless Headphones with Industry-Leading 30-Hour Battery Life",
    image: "/assets/images/products/p-3.png",
    originalPrice: 35000,
    discountedPrice: 28000,
    discount: "20% Off",
    points: 3100,
    isWishlisted: true,
  },
  {
    id: 4,
    name: "Fujifilm X-H2S Mirrorless Camera",
    image: "/assets/images/products/p-4.png",
    originalPrice: 120000,
    discountedPrice: 96000,
    discount: "20% Off",
    points: 10500,
    isWishlisted: true,
  },
  {
    id: 5,
    name: "Samsung Galaxy S23 Ultra",
    image: "/assets/images/products/p-5.png",
    originalPrice: 95000,
    discountedPrice: 76000,
    discount: "20% Off",
    points: 8400,
    isWishlisted: true,
  },
  {
    id: 6,
    name: "OnePlus 12",
    image: "/assets/images/products/p-5.png",
    originalPrice: 55000,
    discountedPrice: 44000,
    discount: "20% Off",
    points: 4900,
    isWishlisted: true,
  },
];

const giftCardItems = [
  {
    id: 7,
    name: "Amazon Gift Card - ₹1000",
    image: "/assets/images/products/gift-card-1.png",
    originalPrice: 1000,
    discountedPrice: 1000,
    discount: "0% Off",
    points: 100,
    isWishlisted: true,
  },
  {
    id: 8,
    name: "Flipkart Gift Card - ₹2000",
    image: "/assets/images/products/gift-card-2.png",
    originalPrice: 2000,
    discountedPrice: 2000,
    discount: "0% Off",
    points: 200,
    isWishlisted: true,
  },
  {
    id: 9,
    name: "Myntra Gift Card - ₹500",
    image: "/assets/images/products/gift-card-3.png",
    originalPrice: 500,
    discountedPrice: 500,
    discount: "0% Off",
    points: 50,
    isWishlisted: true,
  },
];

const experienceItems = [
  {
    id: 10,
    name: "Spa & Wellness Experience Package",
    image: "/assets/images/products/experience-1.png",
    originalPrice: 5000,
    discountedPrice: 4000,
    discount: "20% Off",
    points: 400,
    isWishlisted: true,
  },
  {
    id: 11,
    name: "Adventure Sports Experience",
    image: "/assets/images/products/experience-2.png",
    originalPrice: 8000,
    discountedPrice: 6400,
    discount: "20% Off",
    points: 640,
    isWishlisted: true,
  },
  {
    id: 12,
    name: "Culinary Masterclass Experience",
    image: "/assets/images/products/experience-3.png",
    originalPrice: 3000,
    discountedPrice: 2400,
    discount: "20% Off",
    points: 240,
    isWishlisted: true,
  },
];

const WishlistGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState("shopping");
  const router = useRouter();

  const getCurrentItems = () => {
    switch (activeTab) {
      case "shopping":
        return shoppingItems;
      case "gift-card":
        return giftCardItems;
      case "experience":
        return experienceItems;
      default:
        return shoppingItems;
    }
  };

  const tabs = [
    { id: "shopping", label: "Shopping" },
    { id: "gift-card", label: "Gift Cards" },
    { id: "experience", label: "Experiences" },
  ];

  const currentItems = getCurrentItems();

  const handleBackClick = () => {
    // Check if there's a previous page in history
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, redirect to home page
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={handleBackClick}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Wishlist</h1>
            <div className="w-9"></div>
          </div>

          {/* Mobile Tabs */}
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-gray-900"
                    : "border-transparent"
                }`}
                style={{
                  color:
                    activeTab === tab.id ? "#222222" : "rgba(34, 34, 34, 0.8)",
                  fontFamily: "Inter",
                  fontWeight: "500",
                  fontSize: "14px",
                  lineHeight: "110%",
                  letterSpacing: "0%",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Content - Responsive Grid */}
        <div className="p-4 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {currentItems.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Desktop Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 md:py-6 lg:py-1 text-center">
              <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
            </div>
          </div>
        </div>

        {/* Desktop Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
          {/* Desktop Tabs - Centered */}
          <div className="mb-8">
            <div className="flex justify-center border-b border-gray-200">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-8 py-4 font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-gray-900 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    style={{
                      color:
                        activeTab === tab.id
                          ? "#222222"
                          : "rgba(34, 34, 34, 0.8)",
                      fontFamily: "Inter",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "110%",
                      letterSpacing: "0%",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Grid - Centered */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6 w-full max-w-5xl">
              {currentItems.map((item) => (
                <WishlistCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistGrid;
