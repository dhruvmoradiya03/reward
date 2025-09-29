import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import Button from "@components/ui/button";
import FeaturedProductCard from "@components/product/featured-product-card";
import { featuredProductsData } from "@data/featured-products-data";

const FeaturedProductGrid: React.FC = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState(8);

  // Simulate loading more products
  const handleLoadMore = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setDisplayedProducts((prev) =>
        Math.min(prev + 8, featuredProductsData.length)
      );
      setLoading(false);

      if (displayedProducts + 8 >= featuredProductsData.length) {
        setHasMore(false);
      }
    }, 1000);
  };

  const currentProducts = featuredProductsData.slice(0, displayedProducts);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8">
        {currentProducts.map((product) => (
          <FeaturedProductCard
            key={`featured-product-${product.id}`}
            product={product}
          />
        ))}
      </div>

      <div className="text-center pt-8 xl:pt-14">
        {hasMore && (
          <Button
            loading={loading}
            disabled={loading}
            onClick={handleLoadMore}
            variant="slim"
          >
            {loading ? "Loading..." : t("button-load-more")}
          </Button>
        )}
      </div>
    </>
  );
};

export default FeaturedProductGrid;
