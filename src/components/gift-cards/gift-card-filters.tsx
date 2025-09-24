import React from "react";
import { useTranslation } from "next-i18next";
import { CheckBox } from "@components/ui/checkbox";

interface GiftCardFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: { min: number; max: number };
  onPriceRangeChange: (range: { min: number; max: number }) => void;
  isMobile?: boolean;
}

const GiftCardFilters: React.FC<GiftCardFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  isMobile = false,
}) => {
  const { t } = useTranslation("common");

  // Price range options
  const priceRanges = [
    { label: "Below ₹1,000", min: 0, max: 1000 },
    { label: "₹1,000 to ₹2,000", min: 1000, max: 2000 },
    { label: "₹2,000 to ₹5,000", min: 2000, max: 5000 },
    { label: "Above ₹5,000", min: 5000, max: 10000 },
  ];

  const handlePriceRangeChange = (min: number, max: number) => {
    onPriceRangeChange({ min, max });
  };

  return (
    <div className={`${isMobile ? "p-5 md:p-7" : "p-0"}`}>
      {/* Categories Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("Categories")}
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center">
              <CheckBox
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                label={category}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("Price Range")}
        </h3>
        <div className="space-y-3">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center">
              <CheckBox
                checked={
                  priceRange.min === range.min && priceRange.max === range.max
                }
                onChange={() => handlePriceRangeChange(range.min, range.max)}
                label={range.label}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("Discount")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <CheckBox
              checked={false}
              onChange={() => {}}
              label="10% and above"
            />
          </div>
          <div className="flex items-center">
            <CheckBox
              checked={false}
              onChange={() => {}}
              label="20% and above"
            />
          </div>
          <div className="flex items-center">
            <CheckBox
              checked={false}
              onChange={() => {}}
              label="30% and above"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t("Popular Brands")}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <CheckBox checked={false} onChange={() => {}} label="Amazon" />
          </div>
          <div className="flex items-center">
            <CheckBox checked={false} onChange={() => {}} label="Bata" />
          </div>
          <div className="flex items-center">
            <CheckBox checked={false} onChange={() => {}} label="Cult Fit" />
          </div>
          <div className="flex items-center">
            <CheckBox checked={false} onChange={() => {}} label="Croma" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardFilters;
