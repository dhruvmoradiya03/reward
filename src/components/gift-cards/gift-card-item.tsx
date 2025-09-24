import React from "react";
import Image from "next/image";
import { GiftCard } from "../../data/gift-cards-data";
import WishIcon from "@components/icons/wish-icon";
import ConditionalPricing from "../pricing/conditional-pricing";

interface GiftCardItemProps {
  giftCard: GiftCard;
  onToggleFavorite: (id: string) => void;
}

const GiftCardItem: React.FC<GiftCardItemProps> = ({
  giftCard,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(giftCard.id);
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
        <button
          onClick={handleToggleFavorite}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          aria-label="Toggle favorite"
        >
          <WishIcon
            className={`w-4 h-4 ${
              giftCard.isFavorite
                ? "text-red-500"
                : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

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
