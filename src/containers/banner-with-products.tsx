import BannerCard from "@components/common/banner-card";
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardListSmallLoader from "@components/ui/loaders/product-card-small-list-loader";
// import { useOnSellingProductsQuery } from "@framework/product/get-all-on-selling-products";
import { homeThreeProductsBanner as banner } from "@framework/static/banner";
import Alert from "@components/ui/alert";
import { ROUTES } from "@utils/routes";
import { Product } from "@framework/types";
import {
  getRandomProducts,
  getProductsByCategory,
} from "../data/dummy-banner-with-products-data";

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: "default" | "reverse";
}

const BannerWithProducts: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  variant = "default",
  className = "mb-12 md:mb-14 xl:mb-16",
}) => {
  // Mock data implementation - replace API call
  let mockData;
  if (categorySlug && categorySlug !== "/search") {
    mockData = getProductsByCategory(categorySlug);
    // If no products found for the specific category, use random products
    if (mockData.length === 0) {
      mockData = getRandomProducts(10); // 2 rows x 5 products = 10 total
    }
  } else {
    // Use random products for "/search" or no category - 10 products for 2 rows (5 per row)
    mockData = getRandomProducts(10);
  }
  const data = mockData;
  const isLoading = false;
  const error = null;

  // Original API call (commented out)
  // const { data, isLoading, error } = useOnSellingProductsQuery({
  //   limit: 10,
  // });

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />

      {/* Mock Data Indicator */}
      {/* <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg"> */}
      {/* <p className="text-sm text-green-800">
          🎭 <strong>Mock Data Active:</strong> Showing {data?.length || 0}{" "}
          products (5 per row)
          {categorySlug &&
            categorySlug !== "/search" &&
            ` from "${categorySlug}" category`}
          {categorySlug === "/search" && " (featured selection)"}
        </p> */}
      {/* </div> */}

      {error ? (
        <Alert message={error} />
      ) : (
        <div className="grid grid-cols-4 gap-3 lg:gap-5 xl:gap-7">
          {variant === "reverse" ? (
            <BannerCard
              banner={banner[1]}
              href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
              className="hidden 3xl:block"
              effectActive={true}
            />
          ) : (
            <BannerCard
              banner={banner[0]}
              href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
              className="hidden 3xl:block"
              effectActive={true}
            />
          )}
          <div
            className={`col-span-full 3xl:col-span-5 ${
              variant === "reverse" ? "row-span-full" : ""
            }`}
          >
            {/* Products Grid - Web: 5 per row (2 rows = 10 total), Mobile: 2 per row (1 row = 2 total) */}
            <div className="products-grid-wrapper mobile-limit-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 bg-white">
                {isLoading
                  ? Array.from({ length: 10 }).map((_, idx) => (
                      <ProductCardListSmallLoader
                        key={idx}
                        uniqueKey={`on-selling-${idx}`}
                      />
                    ))
                  : data
                      ?.slice(0, 10)
                      .map((product: Product) => (
                        <ProductCard
                          key={`product--key${product.id}`}
                          product={product}
                          imgWidth={300}
                          imgHeight={300}
                          variant="gridModern"
                        />
                      ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerWithProducts;
