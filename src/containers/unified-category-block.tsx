import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card from "@components/common/card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import CardLoader from "@components/ui/loaders/card-loader";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { dummyCategoryData } from "../data/dummy-category-data";
import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";

// Category Interface for Dynamic Categories
interface DynamicCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  description?: string;
  isActive: boolean;
}

// Category Icons Mapping for Mobile
const CategoryIcons = {
  "gift-cards": (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      />
    </svg>
  ),
  experiences: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  shopping: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  ),
  deals: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  ),
  electronics: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>
  ),
  fashion: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  default: (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
};

interface UnifiedCategoryBlockProps {
  sectionHeading: string;
  className?: string;
  type?: "rounded" | "circle";
  roundedSpaceBetween?: number;
  imgSize?: "large";
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
  useDynamicCategories?: boolean; // New prop to enable dynamic categories
  dynamicCategoriesLimit?: number; // Limit for dynamic categories
}

const UnifiedCategoryBlock: React.FC<UnifiedCategoryBlockProps> = ({
  className = "mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
  sectionHeading,
  type = "circle",
  roundedSpaceBetween,
  imgSize,
  demoVariant,
  disableBorderRadius = false,
  useDynamicCategories = false,
  dynamicCategoriesLimit = 4,
}) => {
  const router = useRouter();
  const [dynamicCategories, setDynamicCategories] = useState<DynamicCategory[]>(
    []
  );
  const [loadingDynamic, setLoadingDynamic] = useState(false);

  // Original CategoryBlock logic
  const breakpoints = {
    "1720": {
      slidesPerView: 5,
      spaceBetween: roundedSpaceBetween || 28,
    },
    "1400": {
      slidesPerView: 5,
      spaceBetween: roundedSpaceBetween || 28,
    },
    "1024": {
      slidesPerView: 5,
      spaceBetween: roundedSpaceBetween || 20,
    },
    "768": {
      slidesPerView: 5,
      spaceBetween: roundedSpaceBetween || 20,
    },
    "500": {
      slidesPerView: 2,
      spaceBetween: roundedSpaceBetween || 12,
    },
    "0": {
      slidesPerView: 2,
      spaceBetween: roundedSpaceBetween || 12,
    },
  };

  const breakpointsCircle = {
    "1720": {
      slidesPerView: 5,
      spaceBetween: 48,
    },
    "1400": {
      slidesPerView: 5,
      spaceBetween: 32,
    },
    "1025": {
      slidesPerView: 5,
      spaceBetween: 28,
    },
    "768": {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    "500": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "0": {
      slidesPerView: 2,
      spaceBetween: 12,
    },
  };

  // Fetch dynamic categories from backend
  useEffect(() => {
    if (useDynamicCategories) {
      const fetchDynamicCategories = async () => {
        try {
          setLoadingDynamic(true);
          const response = await fetch("/api/categories");
          const data = await response.json();

          if (data.success && data.categories) {
            setDynamicCategories(
              data.categories
                .filter((cat: DynamicCategory) => cat.isActive)
                .slice(0, dynamicCategoriesLimit)
            );
          } else {
            // Fallback to default categories
            setDynamicCategories(
              [
                {
                  id: "1",
                  name: "Gift Cards",
                  slug: "gift-cards",
                  isActive: true,
                },
                {
                  id: "2",
                  name: "Experiences",
                  slug: "experiences",
                  isActive: true,
                },
                { id: "3", name: "Shopping", slug: "shopping", isActive: true },
                { id: "4", name: "Deals", slug: "deals", isActive: true },
              ].slice(0, dynamicCategoriesLimit)
            );
          }
        } catch (error) {
          console.error("Error fetching dynamic categories:", error);
          // Fallback to default categories
          setDynamicCategories(
            [
              {
                id: "1",
                name: "Gift Cards",
                slug: "gift-cards",
                isActive: true,
              },
              {
                id: "2",
                name: "Experiences",
                slug: "experiences",
                isActive: true,
              },
              { id: "3", name: "Shopping", slug: "shopping", isActive: true },
              { id: "4", name: "Deals", slug: "deals", isActive: true },
            ].slice(0, dynamicCategoriesLimit)
          );
        } finally {
          setLoadingDynamic(false);
        }
      };

      fetchDynamicCategories();
    }
  }, [useDynamicCategories, dynamicCategoriesLimit]);

  // Original CategoryBlock data fetching
  const { data, isLoading, error } = useCategoriesQuery({
    limit: 10,
    demoVariant: demoVariant || undefined,
  });

  const displayData = error || !data ? dummyCategoryData : data;

  const getDisplayCategories = () => {
    const categories = displayData?.categories?.data || [];
    return categories.slice(0, 10);
  };

  const handleDynamicCategoryClick = (category: DynamicCategory) => {
    const route =
      category.slug === "gift-cards"
        ? ROUTES.GIFT_CARDS
        : category.slug === "experiences"
        ? ROUTES.EXPERIENCES
        : category.slug === "shopping"
        ? ROUTES.SHOPPING
        : category.slug === "deals"
        ? ROUTES.DEALS
        : `/${category.slug}`;
    router.push(route);
  };

  const getCategoryIcon = (slug: string) => {
    return (
      CategoryIcons[slug as keyof typeof CategoryIcons] || CategoryIcons.default
    );
  };

  const getGridCols = (count: number) => {
    if (count <= 4) return "grid-cols-4"; // Single row for 1-4 categories
    if (count <= 8) return "grid-cols-4"; // 2 rows for 5-8 categories (4 per row)
    return "grid-cols-4"; // Default to 4 columns
  };

  // If using dynamic categories, show mobile grid layout
  if (useDynamicCategories) {
    return (
      <div className={className}>
        <SectionHeader sectionHeading={sectionHeading} />

        {/* Mobile Dynamic Categories Grid */}
        <div className="md:hidden">
          {loadingDynamic ? (
            <div className="grid grid-cols-4 gap-6 px-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg p-4 h-28"></div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`grid ${getGridCols(
                dynamicCategories.length
              )} gap-6 px-4`}
            >
              {dynamicCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleDynamicCategoryClick(category)}
                  className="flex flex-col items-center space-y-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                    <div className="text-gray-700">
                      {getCategoryIcon(category.slug)}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Carousel (Original CategoryBlock) */}
        <div className="hidden md:block">
          <div className="category-carousel-wrapper">
            <Carousel
              breakpoints={type === "rounded" ? breakpoints : breakpointsCircle}
              buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7"
              autoplay={{
                delay: 3000,
              }}
            >
              {isLoading && !data
                ? Array.from({ length: 10 }).map((_, idx) => {
                    if (type === "rounded") {
                      return (
                        <SwiperSlide key={`card-rounded-${idx}`}>
                          <CardRoundedLoader
                            uniqueKey={`card-rounded-${idx}`}
                          />
                        </SwiperSlide>
                      );
                    }
                    return (
                      <SwiperSlide key={`card-circle-${idx}`}>
                        <CardLoader uniqueKey={`card-circle-${idx}`} />
                      </SwiperSlide>
                    );
                  })
                : getDisplayCategories()?.map((category) => (
                    <SwiperSlide key={`category--key-${category.id}`}>
                      <Card
                        imgSize={imgSize}
                        item={category}
                        href={`${ROUTES.CATEGORY}/${category.slug}`}
                        variant={type}
                        effectActive={true}
                        size={type === "rounded" ? "medium" : "small"}
                        disableBorderRadius={disableBorderRadius}
                      />
                    </SwiperSlide>
                  ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
  }

  // Original CategoryBlock behavior
  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      <div className="category-carousel-wrapper">
        <Carousel
          breakpoints={type === "rounded" ? breakpoints : breakpointsCircle}
          buttonGroupClassName="-mt-4 md:-mt-5 xl:-mt-7"
          autoplay={{
            delay: 3000,
          }}
        >
          {isLoading && !data
            ? Array.from({ length: 10 }).map((_, idx) => {
                if (type === "rounded") {
                  return (
                    <SwiperSlide key={`card-rounded-${idx}`}>
                      <CardRoundedLoader uniqueKey={`card-rounded-${idx}`} />
                    </SwiperSlide>
                  );
                }
                return (
                  <SwiperSlide key={`card-circle-${idx}`}>
                    <CardLoader uniqueKey={`card-circle-${idx}`} />
                  </SwiperSlide>
                );
              })
            : getDisplayCategories()?.map((category) => (
                <SwiperSlide key={`category--key-${category.id}`}>
                  <Card
                    imgSize={imgSize}
                    item={category}
                    href={`${ROUTES.CATEGORY}/${category.slug}`}
                    variant={type}
                    effectActive={true}
                    size={type === "rounded" ? "medium" : "small"}
                    disableBorderRadius={disableBorderRadius}
                  />
                </SwiperSlide>
              ))}
        </Carousel>
      </div>
    </div>
  );
};

export default UnifiedCategoryBlock;
