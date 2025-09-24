import BannerCard from "@components/common/banner-card";
import SectionHeader from "@components/common/section-header";
import ProductCard from "@components/product/product-card";
import ProductCardListSmallLoader from "@components/ui/loaders/product-card-small-list-loader";
import { homeThreeProductsBanner as banner } from "@framework/static/banner";
import Alert from "@components/ui/alert";
import { ROUTES } from "@utils/routes";
import { Product } from "@framework/types";
import {
  dummyBannerWithProductsData,
  getRandomProducts,
  getProductsByCategory,
  getBannerByVariant,
} from "../data/dummy-banner-with-products-data";
import { useState, useEffect } from "react";

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: "default" | "reverse";
  useMockData?: boolean; // New prop to enable mock data
}

const BannerWithProductsMock: React.FC<ProductsProps> = ({
  sectionHeading,
  categorySlug,
  variant = "default",
  className = "mb-12 md:mb-14 xl:mb-16",
  useMockData = true, // Default to true for mock data
}) => {
  const [mockData, setMockData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API loading
    const loadMockData = () => {
      setIsLoading(true);
      setError(null);

      setTimeout(() => {
        try {
          let products: Product[];

          if (categorySlug) {
            // Filter products by category if categorySlug is provided
            products = getProductsByCategory(categorySlug);
            if (products.length === 0) {
              // If no products found for category, use random products
              products = getRandomProducts(8);
            }
          } else {
            // Use random products if no category specified
            products = getRandomProducts(8);
          }

          setMockData(products);
          setIsLoading(false);
        } catch (err) {
          setError("Failed to load mock data");
          setIsLoading(false);
        }
      }, 1000); // Simulate 1 second loading time
    };

    if (useMockData) {
      loadMockData();
    }
  }, [categorySlug, useMockData]);

  // Get banner data based on variant
  const bannerData = useMockData
    ? getBannerByVariant(variant)
    : banner[variant === "reverse" ? 1 : 0];

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />

      {/* Mock Data Indicator */}
      {useMockData && (
        <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
          {/* <p className="text-sm text-blue-800">
            🎭 <strong>Mock Data Mode:</strong> Showing {mockData.length}{" "}
            products
            {categorySlug && ` from "${categorySlug}" category`}
          </p> */}
        </div>
      )}

      {error ? (
        <Alert message={error} />
      ) : (
        <div className="grid grid-cols-4 gap-3 lg:gap-5 xl:gap-7">
          <BannerCard
            banner={bannerData}
            href={`${ROUTES.COLLECTIONS}/${bannerData.slug}`}
            className="hidden 3xl:block"
            effectActive={true}
          />
          <div
            className={`col-span-full 3xl:col-span-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-5 xl:gap-7 ${
              variant === "reverse" ? "row-span-full" : ""
            }`}
          >
            {isLoading
              ? Array.from({ length: 8 }).map((_, idx) => (
                  <ProductCardListSmallLoader
                    key={idx}
                    uniqueKey={`mock-loading-${idx}`}
                  />
                ))
              : mockData.map((product: Product) => (
                  <ProductCard
                    key={`mock-product-${product.id}`}
                    product={product}
                    imgWidth={176}
                    imgHeight={176}
                    variant="listSmall"
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerWithProductsMock;
