import React from "react";
import { GiftCard } from "../../data/gift-cards-data";
import GiftCardItem from "./gift-card-item";

interface GiftCardGridProps {
  giftCards: GiftCard[];
  onToggleFavorite: (id: string) => void;
}

const GiftCardGrid: React.FC<GiftCardGridProps> = ({
  giftCards,
  onToggleFavorite,
}) => {
  if (giftCards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No gift cards found</div>
        <p className="text-gray-400">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {giftCards.map((giftCard) => (
        <GiftCardItem
          key={giftCard.id}
          giftCard={giftCard}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default GiftCardGrid;
