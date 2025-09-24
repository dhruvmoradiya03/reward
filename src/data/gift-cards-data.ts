// Sample Backend Data for Gift Cards
// This file contains sample data that would typically come from a backend API

export interface GiftCard {
  id: string;
  name: string;
  logo: string;
  discount: number;
  category: string;
  price: number;
  originalPrice?: number;
  isFavorite?: boolean;
  brand: string;
  description?: string;
  image?: string; // Main product image
  bannerImage?: string; // Banner/hero image
  isActive?: boolean;
  isFeatured?: boolean;
  validUntil?: string;
  termsAndConditions?: string;
}

// Sample Gift Cards Data with Images
export const giftCardsData: GiftCard[] = [
  {
    id: "1",
    name: "Bata Gift Card",
    logo: "https://riddio-media.s3.us-east-1.amazonaws.com/images/5b3698be-0992-4fa2-a11c-4b9cc4b49093.png",
    image: "https://riddio-media.s3.us-east-1.amazonaws.com/images/5b3698be-0992-4fa2-a11c-4b9cc4b49093.png",
    bannerImage: "https://riddio-media.s3.us-east-1.amazonaws.com/images/5b3698be-0992-4fa2-a11c-4b9cc4b49093.png",
    discount: 10,
    category: "Fashion",
    price: 1000,
    originalPrice: 1100,
    isFavorite: false,
    brand: "Bata",
    description: "Premium footwear and accessories for the whole family",
    isActive: true,
    isFeatured: true,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Not applicable on sale items."
  },
  {
    id: "2",
    name: "Amazon Gift Card",
    logo: "https://riddio-media.s3.us-east-1.amazonaws.com/images/d7c7b155-a14f-43a2-a965-35d4e483b9d5.png",
    image: "https://riddio-media.s3.us-east-1.amazonaws.com/images/d7c7b155-a14f-43a2-a965-35d4e483b9d5.png",
    bannerImage: "https://riddio-media.s3.us-east-1.amazonaws.com/images/d7c7b155-a14f-43a2-a965-35d4e483b9d5.png",
    discount: 10,
    category: "Shopping",
    price: 500,
    originalPrice: 550,
    isFavorite: false,
    brand: "Amazon",
    description: "Shop millions of products with free delivery",
    isActive: true,
    isFeatured: true,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Cannot be combined with other offers."
  },
  {
    id: "3",
    name: "Cult Fit Membership",
    logo: "/assets/images/brands/cultfit-logo.png",
    image: "/assets/images/gift-cards/cultfit-gift-card.png",
    bannerImage: "/assets/images/gift-cards/cultfit-banner.jpg",
    discount: 15,
    category: "Fitness",
    price: 2000,
    originalPrice: 2350,
    isFavorite: false,
    brand: "Cult Fit",
    description: "Transform your fitness journey with premium workouts",
    isActive: true,
    isFeatured: true,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 6 months from activation. Subject to availability."
  },
  {
    id: "4",
    name: "Croma Electronics",
    logo: "/assets/images/brands/croma-logo.png",
    image: "/assets/images/gift-cards/croma-gift-card.png",
    bannerImage: "/assets/images/gift-cards/croma-banner.jpg",
    discount: 12,
    category: "Electronics",
    price: 1500,
    originalPrice: 1700,
    isFavorite: false,
    brand: "Croma",
    description: "Latest electronics and gadgets at great prices",
    isActive: true,
    isFeatured: false,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Not applicable on Apple products."
  },
  {
    id: "5",
    name: "Flipkart Gift Card",
    logo: "/assets/images/brands/flipkart-logo.png",
    image: "/assets/images/gift-cards/flipkart-gift-card.png",
    bannerImage: "/assets/images/gift-cards/flipkart-banner.jpg",
    discount: 8,
    category: "Shopping",
    price: 800,
    originalPrice: 870,
    isFavorite: false,
    brand: "Flipkart",
    description: "India's leading online marketplace",
    isActive: true,
    isFeatured: false,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Cannot be used for EMI purchases."
  },
  {
    id: "6",
    name: "Myntra Fashion",
    logo: "/assets/images/brands/myntra-logo.png",
    image: "/assets/images/gift-cards/myntra-gift-card.png",
    bannerImage: "/assets/images/gift-cards/myntra-banner.jpg",
    discount: 20,
    category: "Fashion",
    price: 1200,
    originalPrice: 1500,
    isFavorite: false,
    brand: "Myntra",
    description: "Trendy fashion for men, women and kids",
    isActive: true,
    isFeatured: true,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Not applicable on international brands."
  },
  {
    id: "7",
    name: "Zomato Food",
    logo: "/assets/images/brands/zomato-logo.png",
    image: "/assets/images/gift-cards/zomato-gift-card.png",
    bannerImage: "/assets/images/gift-cards/zomato-banner.jpg",
    discount: 25,
    category: "Food",
    price: 300,
    originalPrice: 400,
    isFavorite: false,
    brand: "Zomato",
    description: "Order food from your favorite restaurants",
    isActive: true,
    isFeatured: true,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Minimum order value may apply."
  },
  {
    id: "8",
    name: "Swiggy Super",
    logo: "/assets/images/brands/swiggy-logo.png",
    image: "/assets/images/gift-cards/swiggy-gift-card.png",
    bannerImage: "/assets/images/gift-cards/swiggy-banner.jpg",
    discount: 18,
    category: "Food",
    price: 400,
    originalPrice: 488,
    isFavorite: false,
    brand: "Swiggy",
    description: "Fast food delivery with no delivery charges",
    isActive: true,
    isFeatured: false,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Delivery charges may apply in some areas."
  },
  {
    id: "9",
    name: "Netflix Premium",
    logo: "/assets/images/brands/netflix-logo.png",
    image: "/assets/images/gift-cards/netflix-gift-card.png",
    bannerImage: "/assets/images/gift-cards/netflix-banner.jpg",
    discount: 30,
    category: "Entertainment",
    price: 700,
    originalPrice: 1000,
    isFavorite: false,
    brand: "Netflix",
    description: "Unlimited movies, TV shows and more",
    isActive: true,
    isFeatured: true,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Auto-renewal can be disabled."
  },
  {
    id: "10",
    name: "Uber Rides",
    logo: "/assets/images/brands/uber-logo.png",
    image: "/assets/images/gift-cards/uber-gift-card.png",
    bannerImage: "/assets/images/gift-cards/uber-banner.jpg",
    discount: 15,
    category: "Transport",
    price: 600,
    originalPrice: 706,
    isFavorite: false,
    brand: "Uber",
    description: "Ride anywhere in the city with comfort",
    isActive: true,
    isFeatured: false,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Surge pricing may apply."
  },
  {
    id: "11",
    name: "BookMyShow",
    logo: "/assets/images/brands/bookmyshow-logo.png",
    image: "/assets/images/gift-cards/bookmyshow-gift-card.png",
    bannerImage: "/assets/images/gift-cards/bookmyshow-banner.jpg",
    discount: 22,
    category: "Entertainment",
    price: 500,
    originalPrice: 641,
    isFavorite: false,
    brand: "BookMyShow",
    description: "Book movie tickets and events online",
    isActive: true,
    isFeatured: false,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Subject to availability."
  },
  {
    id: "12",
    name: "Paytm Mall",
    logo: "/assets/images/brands/paytm-logo.png",
    image: "/assets/images/gift-cards/paytm-gift-card.png",
    bannerImage: "/assets/images/gift-cards/paytm-banner.jpg",
    discount: 14,
    category: "Shopping",
    price: 1000,
    originalPrice: 1163,
    isFavorite: false,
    brand: "Paytm Mall",
    description: "Shop with cashback and great deals",
    isActive: true,
    isFeatured: false,
    validUntil: "2025-12-31",
    termsAndConditions: "Valid for 1 year from purchase date. Cashback terms apply."
  }
];

// Categories for filtering
export const giftCardCategories = [
  "All",
  "Fashion",
  "Shopping", 
  "Fitness",
  "Electronics",
  "Food",
  "Entertainment",
  "Transport"
];

// Featured gift cards (for homepage)
export const featuredGiftCards = giftCardsData.filter(card => card.isFeatured);

// Sort options
export const sortOptions = [
  { name: "Popularity", value: "popularity" },
  { name: "Price: Low to High", value: "price-low-high" },
  { name: "Price: High to Low", value: "price-high-low" },
  { name: "Discount: High to Low", value: "discount-high-low" },
  { name: "Name: A to Z", value: "name-a-z" },
  { name: "Newest First", value: "newest" }
];

// Price ranges for filtering
export const priceRanges = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { label: "Above ₹2000", min: 2000, max: 10000 }
];

// API Response Types (for backend integration)
export interface GiftCardAPIResponse {
  success: boolean;
  data: GiftCard[];
  total: number;
  page: number;
  limit: number;
  categories: string[];
}

export interface GiftCardFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  isActive?: boolean;
}

// Sample API functions (for backend integration)
export const giftCardAPI = {
  // Get all gift cards
  getAllGiftCards: async (filters?: GiftCardFilters): Promise<GiftCardAPIResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredData = [...giftCardsData];
        
        if (filters) {
          if (filters.category && filters.category !== 'All') {
            filteredData = filteredData.filter(card => card.category === filters.category);
          }
          if (filters.minPrice !== undefined) {
            filteredData = filteredData.filter(card => card.price >= filters.minPrice!);
          }
          if (filters.maxPrice !== undefined) {
            filteredData = filteredData.filter(card => card.price <= filters.maxPrice!);
          }
          if (filters.search) {
            filteredData = filteredData.filter(card => 
              card.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
              card.brand.toLowerCase().includes(filters.search!.toLowerCase())
            );
          }
          if (filters.isFeatured !== undefined) {
            filteredData = filteredData.filter(card => card.isFeatured === filters.isFeatured);
          }
          if (filters.isActive !== undefined) {
            filteredData = filteredData.filter(card => card.isActive === filters.isActive);
          }
        }
        
        resolve({
          success: true,
          data: filteredData,
          total: filteredData.length,
          page: 1,
          limit: 20,
          categories: giftCardCategories
        });
      }, 500); // Simulate network delay
    });
  },
  
  // Get featured gift cards
  getFeaturedGiftCards: async (): Promise<GiftCard[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(featuredGiftCards);
      }, 300);
    });
  },
  
  // Get gift card by ID
  getGiftCardById: async (id: string): Promise<GiftCard | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const giftCard = giftCardsData.find(card => card.id === id);
        resolve(giftCard || null);
      }, 200);
    });
  }
};
