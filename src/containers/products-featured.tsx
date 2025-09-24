import SectionHeader from "@components/common/section-header";
import ProductOverlayCard from "@components/product/product-overlay-card";
import { useFeaturedProductsQuery } from "@framework/product/get-all-featured-products";
import Alert from "@components/ui/alert";
import { Product } from "@framework/types";
import Image from "next/image";
import cn from "classnames";
import { ROUTES } from "@utils/routes";

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  limit?: number;
  variant?: "left" | "center" | "combined" | "flat" | "modern";
  hideBanner?: boolean;
  demoVariant?: "ancient";
  disableBorderRadius?: boolean;
}

const ProductsFeatured: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  className = "mb-12 md:mb-14 xl:mb-16",
  variant = "left",
  limit = 5,
  hideBanner = false,
  demoVariant,
  disableBorderRadius = false,
}) => {
  const { data, error } = useFeaturedProductsQuery({
    limit: limit,
    demoVariant,
  });

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug || `${ROUTES.PRODUCT}?featured=true`}
      />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="relative">
          {/* Desktop View - Grid Layout */}
          <div
            className={`hidden md:grid gap-4 xl:gap-6 ${
              limit <= 3
                ? "grid-cols-3"
                : limit <= 4
                ? "grid-cols-4"
                : "grid-cols-5"
            }`}
          >
            {data?.slice(0, limit).map((product: Product, idx: number) => (
              <ProductOverlayCard
                disableBorderRadius={disableBorderRadius}
                key={`product--key${product.id}`}
                product={product}
                variant={variant}
                index={idx}
              />
            ))}
          </div>

          {/* Mobile View - Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {data?.slice(0, limit).map((product: Product, idx: number) => (
                <div
                  key={`product--key${product.id}`}
                  className="flex-shrink-0 w-48"
                >
                  <ProductOverlayCard
                    disableBorderRadius={disableBorderRadius}
                    product={product}
                    variant={variant}
                    index={idx}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsFeatured;
