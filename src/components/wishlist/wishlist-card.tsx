import React from "react";
import Image from "next/image";
import WishIcon from "@components/icons/wish-icon";
import { useUI } from "@contexts/ui.context";

interface WishlistItem {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  points: number;
  isWishlisted: boolean;
}

interface WishlistCardProps {
  item: WishlistItem;
}

const WishlistCard: React.FC<WishlistCardProps> = ({ item }) => {
  const { openModal, setModalView } = useUI();

  const handleRemoveFromWishlist = () => {
    // TODO: Implement remove from wishlist functionality
    console.log("Remove from wishlist:", item.id);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", item.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = "/assets/placeholder/product-placeholder.png";
          }}
        />

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          aria-label="Remove from wishlist"
        >
          <WishIcon className="w-4 h-4 text-red-500" />
        </button>

        {/* Discount Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {item.discount}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3">
        {/* Product Name */}
        <div className="h-12 mb-3 overflow-hidden">
          <h3 className="text-gray-900 line-clamp-2 break-words hyphens-auto leading-tight text-sm ">
            {item.name}
          </h3>
        </div>

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 flex-nowrap">
            <span className="text-base lg:text-lg font-bold text-gray-900">
              ₹{item.discountedPrice.toLocaleString()}
            </span>
            <span className="text-sm lg:text-base text-[#787878] font-medium whitespace-nowrap">
              + ₹{item.points.toLocaleString()}
            </span>
          </div>

          {/* Original Price */}
          {/* <div className="mt-1">
            <span className="text-sm text-[#787878] line-through">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
