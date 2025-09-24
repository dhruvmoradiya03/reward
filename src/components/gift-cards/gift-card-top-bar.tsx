import React from "react";
import { useTranslation } from "next-i18next";
import FilterIcon from "@components/icons/filter-icon";
import GiftCardListBox from "./gift-card-list-box";

interface GiftCardTopBarProps {
  totalItems: number;
  sortOptions: Array<{ name: string; value: string }>;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onOpenFilter: () => void;
}

const GiftCardTopBar: React.FC<GiftCardTopBarProps> = ({
  totalItems,
  sortOptions,
  sortBy,
  onSortChange,
  onOpenFilter,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      {/* Mobile Filter Button */}
      <button
        className="lg:hidden text-heading text-sm px-4 py-2 font-semibold border border-gray-300 rounded-md flex items-center transition duration-200 ease-in-out focus:outline-none hover:bg-gray-200"
        onClick={onOpenFilter}
      >
        <FilterIcon />
        <span className="ltr:pl-2.5 rtl:pr-2.5">{t("text-filters")}</span>
      </button>

      {/* Items Count */}
      <div className="flex-shrink-0 text-body text-xs md:text-sm leading-4">
        {totalItems} {t("text-items")}
      </div>

      {/* Sort Options */}
      <div className="flex items-center">
        <GiftCardListBox
          options={sortOptions}
          selectedValue={sortBy}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
};

export default GiftCardTopBar;
