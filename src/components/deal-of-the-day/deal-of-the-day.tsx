import React from "react";
import Image from "next/image";
import SectionHeader from "@components/common/section-header";
import { ROUTES } from "@utils/routes";
import WishIcon from "@components/icons/wish-icon";
import ConditionalPricing from "../pricing/conditional-pricing";

// Deal of the Day Product Interface
export interface DealProduct {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  points: number;
  currency: number;
  isFavorite?: boolean;
  isFeatured?: boolean;
}

// Mock Deal of the Day Products
const dealProducts: DealProduct[] = [
  {
    id: "1",
    name: "Mamaearth gift pack with face wash, ubtan face mask",
    image:
      "https://riddio-media.s3.us-east-1.amazonaws.com/images/c60cf3e2-5fe2-4ab8-b1f7-ab17353d8cb8.jpg",
    originalPrice: 25000,
    discountedPrice: 20000,
    discount: 20,
    points: 20000,
    currency: 2206,
    isFavorite: false,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Mamaearth gift pack with face wash, ubtan...",
    image:
      "https://riddio-media.s3.us-east-1.amazonaws.com/images/d7c7b155-a14f-43a2-a965-35d4e483b9d5.png",
    originalPrice: 26000,
    discountedPrice: 20000,
    discount: 20,
    points: 20000,
    currency: 2206,
    isFavorite: false,
    isFeatured: false,
  },
  {
    id: "3",
    name: "St. Botanics Moroccan, argan oil shampoo",
    image:
      "https://riddio-media.s3.us-east-1.amazonaws.com/images/e01944ca-a2cf-406b-94bc-e1dce96b11d5.jpg",
    originalPrice: 25000,
    discountedPrice: 20000,
    discount: 20,
    points: 20000,
    currency: 2206,
    isFavorite: false,
    isFeatured: false,
  },
  {
    id: "4",
    name: "St. Botanics Moroccan, argan oil shampoo",
    image:
      "https://riddio-media.s3.us-east-1.amazonaws.com/images/d7c7b155-a14f-43a2-a965-35d4e483b9d5.png",
    originalPrice: 26000,
    discountedPrice: 20000,
    discount: 20,
    points: 20000,
    currency: 2206,
    isFavorite: false,
    isFeatured: false,
  },
  {
    id: "5",
    name: "Samsung F04 with 50MMamaearth gift...",
    image:
      "https://riddio-media.s3.us-east-1.amazonaws.com/images/e01944ca-a2cf-406b-94bc-e1dce96b11d5.jpg",
    originalPrice: 25000,
    discountedPrice: 20000,
    discount: 20,
    points: 20000,
    currency: 2206,
    isFavorite: false,
    isFeatured: false,
  },
];

interface DealOfTheDayProps {
  sectionHeading?: string;
  className?: string;
  limit?: number;
}

// Product Card Component
interface ProductCardProps {
  product: DealProduct;
  isLarge?: boolean;
  onToggleFavorite: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isLarge = false,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#DDDDDD] overflow-hidden group cursor-pointer">
      {/* Product Image */}
      <div className="relative p-4 pb-2">
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          {product.discount}% Off
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200 z-10"
          aria-label="Toggle favorite"
        >
          <WishIcon
            className={`w-4 h-4 ${
              product.isFavorite
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        {/* Product Image */}
        <div className={`relative ${isLarge ? "h-48 md:h-56" : "h-32"} w-full`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 50vw, 25vw"
            }
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 pt-2">
        {/* Product Name */}
        <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Discount and Original Price */}
        <div className="flex items-center mb-2">
          <span className="text-red-500 text-sm font-semibold">
            {product.discount}% Off
          </span>
          <span className="text-gray-400 text-sm line-through ml-2">
            {product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Price */}
        <ConditionalPricing
          price={product.currency}
          points={product.points}
          originalPrice={product.originalPrice}
          discount={product.discount}
          currency="₹"
          className="text-sm"
        />
      </div>
    </div>
  );
};

const DealOfTheDay: React.FC<DealOfTheDayProps> = ({
  sectionHeading = "Deal of the day",
  className = "mb-12 md:mb-14 xl:mb-16",
  limit = 5,
}) => {
  const products = dealProducts.slice(0, limit);
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  const otherProducts = products.filter((p) => !p.isFeatured);

  const handleToggleFavorite = (id: string) => {
    // Handle favorite toggle - you can implement this based on your state management
    console.log("Toggle favorite for product:", id);
  };

  return (
    <div className={className}>
      {/* Section Header */}
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={`${ROUTES.PRODUCT}?deal-of-the-day=true`}
        className="pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8"
      />

      {/* Desktop View - Grid Layout with Featured Product */}
      <div className="hidden md:grid gap-4 xl:gap-6 grid-cols-5">
        {/* Featured Product (Large - spans 2 columns) */}
        <div className="col-span-2">
          <ProductCard
            product={featuredProduct}
            isLarge={true}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* Other Products - 2x2 Grid */}
        <div className="col-span-3 grid grid-cols-2 gap-4">
          {otherProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>

      {/* Mobile View - Vertical Stack (Matches Mobile Image) */}
      <div className="md:hidden">
        {/* Featured Product (Full Width - Large) */}
        <div className="mb-6">
          <ProductCard
            product={featuredProduct}
            isLarge={true}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* Other Products - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4">
          {otherProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDay;
