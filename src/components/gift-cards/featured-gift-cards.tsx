import React from "react";
import SectionHeader from "@components/common/section-header";
import { ROUTES } from "@utils/routes";
import { GiftCard, featuredGiftCards } from "../../data/gift-cards-data";
import GiftCardItem from "./gift-card-item";

interface FeaturedGiftCardsProps {
  sectionHeading?: string;
  className?: string;
  limit?: number;
}

const FeaturedGiftCards: React.FC<FeaturedGiftCardsProps> = ({
  sectionHeading = "Featured Gift Cards",
  className = "mb-12 md:mb-14 xl:mb-16",
  limit = 5,
}) => {
  const giftCards = featuredGiftCards.slice(0, limit);

  const handleToggleFavorite = (id: string) => {
    // Handle favorite toggle - you can implement this based on your state management
    console.log("Toggle favorite for gift card:", id);
  };

  return (
    <div className={className}>
      {/* Section Header */}
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={`${ROUTES.PRODUCT}?gift-cards=true`}
        className="pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8"
      />

      {/* Web View - Grid Layout */}
      <div className="hidden md:grid gap-4 xl:gap-6 grid-cols-5">
        {giftCards.map((giftCard) => (
          <GiftCardItem
            key={giftCard.id}
            giftCard={giftCard}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {giftCards.map((giftCard) => (
            <div key={giftCard.id} className="flex-shrink-0 w-64">
              <GiftCardItem
                giftCard={giftCard}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGiftCards;
