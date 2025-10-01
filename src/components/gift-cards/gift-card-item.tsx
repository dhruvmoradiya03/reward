import React from "react";
import Image from "next/image";
import { GiftCard } from "../../data/gift-cards-data";
import WishlistButton from "@components/ui/wishlist-button";
import ConditionalPricing from "../pricing/conditional-pricing";

interface GiftCardItemProps {
  giftCard: GiftCard;
  onToggleFavorite: (id: string) => void;
}

const GiftCardItem: React.FC<GiftCardItemProps> = ({
  giftCard,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = (productId: string, isFavorited: boolean) => {
    onToggleFavorite(productId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#DDDDDD] overflow-hidden group cursor-pointer">
      {/* Card Header with Discount Badge and Favorite */}
      <div className="relative p-4 pb-2">
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          -{giftCard.discount}%
        </div>

        {/* Favorite Button */}
        <div className="absolute top-2 right-2">
          <WishlistButton
            productId={giftCard.id}
            isFavorited={giftCard.isFavorite}
            onToggle={handleToggleFavorite}
            size="sm"
          />
        </div>

        {/* Brand Logo - Centered */}
        <div className="flex items-center justify-center h-20 mb-4">
          <div className="relative w-20 h-12 flex items-center justify-center">
            {giftCard.logo ? (
              <Image
                src={giftCard.logo}
                alt={giftCard.brand}
                width={80}
                height={48}
                className="object-contain"
              />
            ) : (
              <div className="text-2xl font-bold text-gray-900">
                {giftCard.brand}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand Name and Pricing */}
      <div className="px-4 pb-4">
        <h3 className="font-semibold text-gray-900 text-center mb-2">
          {giftCard.brand}
        </h3>
        <div className="text-center">
          <ConditionalPricing
            price={giftCard.price}
            points={Math.ceil(giftCard.price * 100)} // Convert price to points
            originalPrice={giftCard.originalPrice}
            discount={giftCard.discount}
            currency="₹"
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default GiftCardItem;
