import React, { useState, useEffect } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Container from "@components/ui/container";
import GiftCardListing from "@components/gift-cards/gift-card-listing";
import {
  giftCardsData,
  giftCardCategories,
  sortOptions,
  GiftCard,
} from "../data/gift-cards-data";

export default function GiftCardsPage() {
  const { t } = useTranslation("common");
  const [giftCards, setGiftCards] = useState<GiftCard[]>(giftCardsData);
  const [filteredGiftCards, setFilteredGiftCards] =
    useState<GiftCard[]>(giftCardsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 10000,
  });

  // Filter and sort gift cards
  useEffect(() => {
    let filtered = [...giftCards];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((card) => card.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (card) => card.price >= priceRange.min && card.price <= priceRange.max
    );

    // Sort
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "discount-high-low":
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for popularity
        break;
    }

    setFilteredGiftCards(filtered);
  }, [selectedCategory, sortBy, priceRange, giftCards]);

  const handleToggleFavorite = (id: string) => {
    setGiftCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      )
    );
  };

  return (
    <>
      <Container>
        <div className="py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {t("Gift Cards")}
            </h1>
            <p className="text-gray-600">
              {t("Discover amazing gift cards with exclusive discounts")}
            </p>
          </div>

          {/* Gift Card Listing Component */}
          <GiftCardListing
            giftCards={filteredGiftCards}
            categories={giftCardCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOptions={sortOptions}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
