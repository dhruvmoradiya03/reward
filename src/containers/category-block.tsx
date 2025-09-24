import Card from "@components/common/card";
import SectionHeader from "@components/common/section-header";
import Carousel from "@components/ui/carousel/carousel";
import CardLoader from "@components/ui/loaders/card-loader";
import CardRoundedLoader from "@components/ui/loaders/card-rounded-loader";
import { useCategoriesQuery } from "@framework/category/get-all-categories";
import { dummyCategoryData } from "../data/dummy-category-data";
import { ROUTES } from "@utils/routes";
import { SwiperSlide } from "swiper/react";

interface CategoriesProps {
  sectionHeading: string;
  className?: string;
  type?: "rounded" | "circle";
  roundedSpaceBetween?: number;
  imgSize?: "large";
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const CategoryBlock: React.FC<CategoriesProps> = ({
  className = "mb-10 md:mb-11 lg:mb-12 xl:mb-14 lg:pb-1 xl:pb-0",
  sectionHeading,
  type = "circle",
  roundedSpaceBetween,
  imgSize,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const breakpoints = {
    "1720": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: roundedSpaceBetween || 28,
    },
    "1400": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: roundedSpaceBetween || 28,
    },
    "1024": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: roundedSpaceBetween || 20,
    },
    "768": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: roundedSpaceBetween || 20,
    },
    "500": {
      slidesPerView: 2, // Mobile view: 2 categories per row
      spaceBetween: roundedSpaceBetween || 12,
    },
    "0": {
      slidesPerView: 2, // Mobile view: 2 categories per row
      spaceBetween: roundedSpaceBetween || 12,
    },
  };

  const breakpointsCircle = {
    "1720": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: 48,
    },
    "1400": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: 32,
    },
    "1025": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: 28,
    },
    "768": {
      slidesPerView: 5, // Web view: 5 categories per row
      spaceBetween: 20,
    },
    "500": {
      slidesPerView: 2, // Mobile view: 2 categories per row
      spaceBetween: 20,
    },
    "0": {
      slidesPerView: 2, // Mobile view: 2 categories per row
      spaceBetween: 12,
    },
  };

  const { data, isLoading, error } = useCategoriesQuery({
    limit: 10, // Web view: 10 categories (2 rows × 5 per row)
    demoVariant: demoVariant || undefined,
  });

  // Use dummy data when there's an error or no data
  const displayData = error || !data ? dummyCategoryData : data;

  // Limit categories for mobile (2) and web (10)
  const getDisplayCategories = () => {
    const categories = displayData?.categories?.data || [];
    // Show 10 categories for web (2 rows × 5 per row), 2 for mobile (1 row × 2 per row)
    return categories.slice(0, 10);
  };

  return (
    <div className={className}>
      <SectionHeader sectionHeading={sectionHeading} />
      {
        <div className="category-carousel-wrapper mobile-limit-2">
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
      }
    </div>
  );
};

export default CategoryBlock;
