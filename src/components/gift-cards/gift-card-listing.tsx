import React from "react";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import GiftCardFilters from "./gift-card-filters";
import GiftCardGrid from "./gift-card-grid";
import GiftCardTopBar from "./gift-card-top-bar";
import { GiftCard } from "../../pages/gift-cards";

interface GiftCardListingProps {
  giftCards: GiftCard[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOptions: Array<{ name: string; value: string }>;
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  onToggleFavorite: (id: string) => void;
}

const GiftCardListing: React.FC<GiftCardListingProps> = ({
  giftCards,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOptions,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  onToggleFavorite,
}) => {
  const { openFilter, displayFilter, closeFilter } = useUI();
  const { t } = useTranslation("common");
  const router = useRouter();
  const dir = getDirection(router.locale);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <GiftCardFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          priceRange={priceRange}
          onPriceRangeChange={onPriceRangeChange}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <GiftCardTopBar
          totalItems={giftCards.length}
          sortOptions={sortOptions}
          sortBy={sortBy}
          onSortChange={onSortChange}
          onOpenFilter={openFilter}
        />

        {/* Gift Card Grid */}
        <GiftCardGrid
          giftCards={giftCards}
          onToggleFavorite={onToggleFavorite}
        />
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displayFilter}
        onClose={closeFilter}
        {...motionProps}
      >
        <div className="flex flex-col justify-between w-full h-full">
          {/* Header */}
          <div className="w-full border-b border-gray-100 flex justify-between items-center relative ltr:pr-5 rtl:pl-5 ltr:md:pr-7 rtl:md:pl-7 flex-shrink-0 py-0.5">
            <button
              className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60"
              onClick={closeFilter}
              aria-label="close"
            >
              {dir === "rtl" ? (
                <IoArrowBack className="text-black" />
              ) : (
                <IoArrowBack className="text-black" />
              )}
            </button>
            <h2 className="font-bold text-xl md:text-2xl m-0 text-heading w-full text-center ltr:pr-6 rtl:pl-6">
              {t("text-filters")}
            </h2>
          </div>

          {/* Filters Content */}
          <div className="flex-grow overflow-y-auto">
            <GiftCardFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={onPriceRangeChange}
              isMobile={true}
            />
          </div>

          {/* Footer */}
          <div className="text-sm md:text-base leading-4 flex items-center justify-center px-7 flex-shrink-0 h-14 bg-heading text-white">
            {giftCards.length} {t("text-items")}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default GiftCardListing;
