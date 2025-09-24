import { Product } from "../framework/basic-rest/types";

// Banner data for BannerWithProducts component
export const dummyBannerWithProductsData = {
  banners: [
    {
      id: 1,
      title: "Summer Sale Collection",
      slug: "summer-sale-collection",
      image: {
        mobile: {
          url: "/assets/images/collection/1.jpg",
          width: 430,
          height: 600,
        },
        desktop: {
          url: "/assets/images/collection/1.jpg",
          width: 430,
          height: 600,
        },
      },
    },
    {
      id: 2,
      title: "New Arrivals",
      slug: "new-arrivals",
      image: {
        mobile: {
            url: "/assets/images/collection/2.jpg",
          width: 430,
          height: 600,
        },
        desktop: {
          url: "/assets/images/collection/1.jpg",
          width: 430,
          height: 600,
        },
      },
    },
  ],
  products: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      slug: "wireless-bluetooth-headphones",
      price: 199.99,
      sale_price: 149.99,
      quantity: 50,
      image: {
        id: 1,
        thumbnail: "/assets/images/products/p-29-sm.png",
        original: "/assets/images/collection/1.jpg",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-29-1.png",
          original: "/assets/images/collection/1.jpg",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-29-2.png",
          original: "/assets/images/collection/1.jpg",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/collection/1.jpg",
          original: "/assets/images/collection/1.jpg",
        },
      },
      tags: [
        {
          id: 1,
          name: "Wireless",
          slug: "wireless",
        },
        {
          id: 2,
          name: "Audio",
          slug: "audio",
        },
      ],
      sku: "WBH-001",
      description: "Premium wireless headphones with noise cancellation and superior sound quality.",
      isNewArrival: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      slug: "smart-fitness-watch",
      price: 299.99,
      sale_price: 229.99,
      quantity: 30,
      image: {
        id: 2,
        thumbnail: "/assets/images/products/p-27-sm.png",
        original: "/assets/images/products/p-27-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-27-1.png",
          original: "/assets/images/products/p-27-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-27-2.png",
          original: "/assets/images/products/p-27-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 3,
          name: "Fitness",
          slug: "fitness",
        },
        {
          id: 4,
          name: "Smart Watch",
          slug: "smart-watch",
        },
      ],
      sku: "SFW-002",
      description: "Advanced fitness tracking watch with heart rate monitor and GPS capabilities.",
      isNewArrival: false,
    },
    {
      id: 3,
      name: "Gaming Mechanical Keyboard",
      slug: "gaming-mechanical-keyboard",
      price: 159.99,
      sale_price: 119.99,
      quantity: 25,
      image: {
        id: 3,
        thumbnail: "/assets/images/products/p-24-sm.png",
        original: "/assets/images/products/p-24-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-24-1.png",
          original: "/assets/images/products/p-24-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-24-2.png",
          original: "/assets/images/products/p-24-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 5,
          name: "Gaming",
          slug: "gaming",
        },
        {
          id: 6,
          name: "Keyboard",
          slug: "keyboard",
        },
      ],
      sku: "GMK-003",
      description: "RGB backlit mechanical keyboard with customizable keys and premium switches.",
      isNewArrival: true,
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      slug: "bluetooth-speaker",
      price: 89.99,
      sale_price: 59.99,
      quantity: 40,
      image: {
        id: 4,
        thumbnail: "/assets/images/products/p-25-sm.png",
        original: "/assets/images/products/p-25-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-25-1.png",
          original: "/assets/images/products/p-25-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-25-2.png",
          original: "/assets/images/products/p-25-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 1,
          name: "Wireless",
          slug: "wireless",
        },
        {
          id: 7,
          name: "Speaker",
          slug: "speaker",
        },
      ],
      sku: "BTS-004",
      description: "Portable wireless speaker with 360-degree sound and waterproof design.",
      isNewArrival: false,
    },
    {
      id: 5,
      name: "Wireless Mouse",
      slug: "wireless-mouse",
      price: 49.99,
      sale_price: 29.99,
      quantity: 60,
      image: {
        id: 5,
        thumbnail: "/assets/images/products/p-26-sm.png",
        original: "/assets/images/products/p-26-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-26-1.png",
          original: "/assets/images/products/p-26-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-26-2.png",
          original: "/assets/images/products/p-26-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 1,
          name: "Wireless",
          slug: "wireless",
        },
        {
          id: 8,
          name: "Mouse",
          slug: "mouse",
        },
      ],
      sku: "WM-005",
      description: "Ergonomic wireless mouse with precision tracking and long battery life.",
      isNewArrival: false,
    },
    {
      id: 6,
      name: "4K Ultra HD Monitor",
      slug: "4k-ultra-hd-monitor",
      price: 599.99,
      sale_price: 449.99,
      quantity: 15,
      image: {
        id: 6,
        thumbnail: "/assets/images/products/p-16-sm.png",
        original: "/assets/images/products/p-16-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-16-1.png",
          original: "/assets/images/products/p-16-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-16-2.png",
          original: "/assets/images/products/p-16-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 9,
          name: "Monitor",
          slug: "monitor",
        },
        {
          id: 10,
          name: "4K",
          slug: "4k",
        },
      ],
      sku: "4KM-006",
      description: "27-inch 4K monitor with HDR support and ultra-fast refresh rate.",
      isNewArrival: true,
    },
    {
      id: 7,
      name: "Gaming Chair Pro",
      slug: "gaming-chair-pro",
      price: 399.99,
      sale_price: 299.99,
      quantity: 20,
      image: {
        id: 7,
        thumbnail: "/assets/images/products/p-15-sm.png",
        original: "/assets/images/products/p-15-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-15-1.png",
          original: "/assets/images/products/p-15-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-15-2.png",
          original: "/assets/images/products/p-15-2.png",
        },
      ],
      category: {
        id: 3,
        name: "Home & Garden",
        slug: "home-garden",
        image: {
          id: 3,
          thumbnail: "/assets/images/category/home-garden.jpg",
          original: "/assets/images/category/home-garden.jpg",
        },
      },
      tags: [
        {
          id: 5,
          name: "Gaming",
          slug: "gaming",
        },
        {
          id: 11,
          name: "Chair",
          slug: "chair",
        },
      ],
      sku: "GCP-007",
      description: "Ergonomic gaming chair with lumbar support and adjustable height.",
      isNewArrival: false,
    },
    {
      id: 8,
      name: "Smartphone Pro Max",
      slug: "smartphone-pro-max",
      price: 1199.99,
      sale_price: 999.99,
      quantity: 10,
      image: {
        id: 8,
        thumbnail: "/assets/images/products/p-26-sm.png",
        original: "/assets/images/products/p-26-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-26-1.png",
          original: "/assets/images/products/p-26-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-26-2.png",
          original: "/assets/images/products/p-26-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 12,
          name: "Smartphone",
          slug: "smartphone",
        },
        {
          id: 13,
          name: "Mobile",
          slug: "mobile",
        },
      ],
      sku: "SPM-008",
      description: "Latest flagship smartphone with advanced camera system and 5G connectivity.",
      isNewArrival: true,
    },
    {
      id: 9,
      name: "Laptop Ultrabook",
      slug: "laptop-ultrabook",
      price: 1299.99,
      sale_price: 1099.99,
      quantity: 8,
      image: {
        id: 9,
        thumbnail: "/assets/images/products/p-16-sm.png",
        original: "/assets/images/products/p-16-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-16-1.png",
          original: "/assets/images/products/p-16-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-16-2.png",
          original: "/assets/images/products/p-16-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 14,
          name: "Laptop",
          slug: "laptop",
        },
        {
          id: 15,
          name: "Ultrabook",
          slug: "ultrabook",
        },
      ],
      sku: "LU-009",
      description: "Lightweight ultrabook with powerful processor and all-day battery life.",
      isNewArrival: false,
    },
    {
      id: 10,
      name: "Tablet Pro",
      slug: "tablet-pro",
      price: 799.99,
      sale_price: 649.99,
      quantity: 12,
      image: {
        id: 10,
        thumbnail: "/assets/images/products/p-3-sm.png",
        original: "/assets/images/products/p-3-m.png",
      },
      gallery: [
        {
          id: 1,
          thumbnail: "/assets/images/products/p-3-1.png",
          original: "/assets/images/products/p-3-1.png",
        },
        {
          id: 2,
          thumbnail: "/assets/images/products/p-3-2.png",
          original: "/assets/images/products/p-3-2.png",
        },
      ],
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
        image: {
          id: 1,
          thumbnail: "/assets/images/category/electronics.jpg",
          original: "/assets/images/category/electronics.jpg",
        },
      },
      tags: [
        {
          id: 16,
          name: "Tablet",
          slug: "tablet",
        },
        {
          id: 17,
          name: "Pro",
          slug: "pro",
        },
      ],
      sku: "TP-010",
      description: "Professional tablet with stylus support and high-resolution display.",
      isNewArrival: true,
    },
  ] as Product[],
};

// Additional banner variations for different themes
export const dummyBannerVariations = {
  electronics: {
    banners: [
      {
        id: 1,
        title: "Electronics Sale",
        slug: "electronics-sale",
        image: {
          mobile: {
            url: "/assets/images/banner/banner-sale-offer.jpg",
            width: 430,
            height: 600,
          },
          desktop: {
            url: "/assets/images/banner/banner-sale-offer.jpg",
            width: 430,
            height: 600,
          },
        },
      },
      {
        id: 2,
        title: "New Tech Arrivals",
        slug: "new-tech-arrivals",
        image: {
          mobile: {
            url: "/assets/images/banner/banner-sale-offer-reverse.jpg",
            width: 430,
            height: 600,
          },
          desktop: {
            url: "/assets/images/banner/banner-sale-offer-reverse.jpg",
            width: 430,
            height: 600,
          },
        },
      },
    ],
  },
  fashion: {
    banners: [
      {
        id: 1,
        title: "Fashion Week Sale",
        slug: "fashion-week-sale",
        image: {
          mobile: {
            url: "/assets/images/banner/banner-sale-offer.jpg",
            width: 430,
            height: 600,
          },
          desktop: {
            url: "/assets/images/banner/banner-sale-offer.jpg",
            width: 430,
            height: 600,
          },
        },
      },
      {
        id: 2,
        title: "Trending Styles",
        slug: "trending-styles",
        image: {
          mobile: {
            url: "/assets/images/banner/banner-sale-offer-reverse.jpg",
            width: 430,
            height: 600,
          },
          desktop: {
            url: "/assets/images/banner/banner-sale-offer-reverse.jpg",
            width: 430,
            height: 600,
          },
        },
      },
    ],
  },
  home: {
    banners: [
      {
        id: 1,
        title: "Home Decor Sale",
        slug: "home-decor-sale",
        image: {
          mobile: {
            url: "/assets/images/banner/banner-sale-offer.jpg",
            width: 430,
            height: 600,
          },
          desktop: {
            url: "/assets/images/banner/banner-sale-offer.jpg",
            width: 430,
            height: 600,
          },
        },
      },
      {
        id: 2,
        title: "Furniture Collection",
        slug: "furniture-collection",
        image: {
          mobile: {
            url: "/assets/images/banner/banner-sale-offer-reverse.jpg",
            width: 430,
            height: 600,
          },
          desktop: {
            url: "/assets/images/banner/banner-sale-offer-reverse.jpg",
            width: 430,
            height: 600,
          },
        },
      },
    ],
  },
};

// Mock data for different product categories
export const dummyProductsByCategory = {
  electronics: [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      slug: "wireless-bluetooth-headphones",
      price: 199.99,
      sale_price: 149.99,
      quantity: 50,
      image: {
        id: 1,
        thumbnail: "/assets/images/products/p-29-sm.png",
        original: "/assets/images/products/p-29-m.png",
      },
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
      },
      isNewArrival: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      slug: "smart-fitness-watch",
      price: 299.99,
      sale_price: 229.99,
      quantity: 30,
      image: {
        id: 2,
        thumbnail: "/assets/images/products/p-27-sm.png",
        original: "/assets/images/products/p-27-m.png",
      },
      category: {
        id: 1,
        name: "Electronics",
        slug: "electronics",
      },
      isNewArrival: false,
    },
  ],
  fashion: [
    {
      id: 11,
      name: "Designer T-Shirt",
      slug: "designer-t-shirt",
      price: 49.99,
      sale_price: 29.99,
      quantity: 100,
      image: {
        id: 11,
        thumbnail: "/assets/images/products/p-1-sm.png",
        original: "/assets/images/products/p-1-m.png",
      },
      category: {
        id: 2,
        name: "Fashion",
        slug: "fashion",
      },
      isNewArrival: true,
    },
    {
      id: 12,
      name: "Premium Jeans",
      slug: "premium-jeans",
      price: 89.99,
      sale_price: 59.99,
      quantity: 75,
      image: {
        id: 12,
        thumbnail: "/assets/images/products/p-2-sm.png",
        original: "/assets/images/products/p-2-m.png",
      },
      category: {
        id: 2,
        name: "Fashion",
        slug: "fashion",
      },
      isNewArrival: false,
    },
  ],
  home: [
    {
      id: 13,
      name: "Modern Coffee Table",
      slug: "modern-coffee-table",
      price: 299.99,
      sale_price: 199.99,
      quantity: 20,
      image: {
        id: 13,
        thumbnail: "/assets/images/products/p-15-sm.png",
        original: "/assets/images/products/p-15-m.png",
      },
      category: {
        id: 3,
        name: "Home & Garden",
        slug: "home-garden",
      },
      isNewArrival: true,
    },
    {
      id: 14,
      name: "Decorative Lamp",
      slug: "decorative-lamp",
      price: 79.99,
      sale_price: 49.99,
      quantity: 40,
      image: {
        id: 14,
        thumbnail: "/assets/images/products/p-16-sm.png",
        original: "/assets/images/products/p-16-m.png",
      },
      category: {
        id: 3,
        name: "Home & Garden",
        slug: "home-garden",
      },
      isNewArrival: false,
    },
  ],
};

// Utility function to get random products (fixed for hydration)
export const getRandomProducts = (count: number = 10): Product[] => {
  const allProducts = dummyBannerWithProductsData.products;
  // Use deterministic selection to avoid hydration errors
  // Take first N products in a consistent order
  return allProducts.slice(0, count);
};

// Utility function to get products by category
export const getProductsByCategory = (categorySlug: string): Product[] => {
  return dummyBannerWithProductsData.products.filter(
    (product) => product.category?.slug === categorySlug
  );
};

// Utility function to get banner by variant
export const getBannerByVariant = (variant: "default" | "reverse" = "default") => {
  const banners = dummyBannerWithProductsData.banners;
  return variant === "reverse" ? banners[1] : banners[0];
};
