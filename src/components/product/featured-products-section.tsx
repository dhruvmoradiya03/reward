import React from "react";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import FeaturedProductCard from "@components/product/featured-product-card";
import { featuredProductsData } from "@data/featured-products-data";
import SectionHeader from "@components/common/section-header";

interface FeaturedProductsSectionProps {
  className?: string;
  limit?: number;
  showViewAll?: boolean;
}

const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  className = "",
  limit = 8,
  showViewAll = true,
}) => {
  const displayProducts = featuredProductsData.slice(0, limit);

  return (
    <div className={`${className}`}>
      <SectionHeader
        sectionHeading="text-featured-products"
        className="mb-4 md:mb-5 lg:mb-6 xl:mb-5 2xl:mb-6 3xl:mb-8"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
        {displayProducts.map((product) => (
          <FeaturedProductCard
            key={`featured-product-${product.id}`}
            product={product}
          />
        ))}
      </div>

      {showViewAll && (
        <div className="text-center mt-8">
          <Link
            href={ROUTES.FEATURED_PRODUCTS}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-heading hover:bg-heading-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-heading transition-colors"
          >
            View All Featured Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default FeaturedProductsSection;
