import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Button from "@components/ui/button";
import ProductCard from "@components/product/product-card";
import { featuredProductsData } from "../../data/featured-products-data";
import ProductFeedLoader from "@components/ui/loaders/product-feed-loader";

interface MockProductGridProps {
  className?: string;
}

// Convert featured product data to ProductCard format
const convertToProductCardFormat = (featuredProduct: any) => {
  return {
    id: featuredProduct.id,
    name: featuredProduct.product_name,
    slug: `product-${featuredProduct.id}`,
    description: featuredProduct.description,
    isNewArrival: true,
    image: {
      id: featuredProduct.id,
      thumbnail: featuredProduct.product_thumbnail,
      original:
        featuredProduct.product_image?.[0] || featuredProduct.product_thumbnail,
    },
    gallery:
      featuredProduct.product_image?.map((img: string, index: number) => ({
        id: index + 1,
        thumbnail: img,
        original: img,
      })) || [],
    price: parseFloat(featuredProduct.face_value_mrp),
    sale_price: parseFloat(featuredProduct.cost_price_withtax),
    quantity: 50,
    sku: featuredProduct.product_code,
    category: {
      id: featuredProduct.product_group_id,
      name: featuredProduct.category_name,
      slug: featuredProduct.category_name.toLowerCase().replace(/\s+/g, "-"),
    },
    brand: {
      id: featuredProduct.id,
      name: featuredProduct.brand_name,
      slug: featuredProduct.brand_name.toLowerCase(),
    },
    unit: "pcs",
    tags: [featuredProduct.category_name.toLowerCase()],
    variations: [],
    meta: {
      title: featuredProduct.product_name,
      description: featuredProduct.description,
    },
  };
};

// Generate more products based on existing data
const generateMoreProducts = (startId: number, count: number) => {
  const baseProducts = [
    {
      name: "Samsung Galaxy S24 Ultra",
      category: "Electronics",
      brand: "Samsung",
      price: 1299,
      sale_price: 1199,
      image: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    },
    {
      name: "Nike Air Max 270",
      category: "Fashion",
      brand: "Nike",
      price: 150,
      sale_price: 120,
      image: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
    },
    {
      name: "MacBook Pro 16-inch",
      category: "Electronics",
      brand: "Apple",
      price: 2499,
      sale_price: 2299,
      image: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
    },
    {
      name: "Sony WH-1000XM5 Headphones",
      category: "Electronics",
      brand: "Sony",
      price: 399,
      sale_price: 349,
      image: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
    },
    {
      name: "Adidas Ultraboost 22",
      category: "Fashion",
      brand: "Adidas",
      price: 180,
      sale_price: 150,
      image: "https://i.dummyjson.com/data/products/6/thumbnail.jpg",
    },
  ];

  return Array.from({ length: count }, (_, index) => {
    const baseProduct = baseProducts[index % baseProducts.length];
    const id = startId + index;

    return {
      id: id.toString(),
      name: `${baseProduct.name} ${id}`,
      slug: `${baseProduct.name.toLowerCase().replace(/\s+/g, "-")}-${id}`,
      description: `High-quality ${baseProduct.name.toLowerCase()} with excellent features`,
      isNewArrival: Math.random() > 0.5,
      image: {
        id: id,
        thumbnail: baseProduct.image,
        original: baseProduct.image,
      },
      gallery: [
        {
          id: 1,
          thumbnail: baseProduct.image,
          original: baseProduct.image,
        },
      ],
      price: baseProduct.price,
      sale_price: baseProduct.sale_price,
      quantity: Math.floor(Math.random() * 100) + 10,
      sku: `${baseProduct.brand.toUpperCase().substring(0, 3)}${id}`,
      category: {
        id: baseProduct.category === "Electronics" ? 1 : 2,
        name: baseProduct.category,
        slug: baseProduct.category.toLowerCase(),
      },
      brand: {
        id: id,
        name: baseProduct.brand,
        slug: baseProduct.brand.toLowerCase(),
      },
      unit: "pcs",
      tags: [
        baseProduct.category.toLowerCase(),
        baseProduct.brand.toLowerCase(),
      ],
      variations: [],
      meta: {
        title: `${baseProduct.name} ${id}`,
        description: `High-quality ${baseProduct.name.toLowerCase()}`,
      },
    };
  });
};

const MockProductGrid: React.FC<MockProductGridProps> = ({
  className = "",
}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState(10);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  // Simulate initial loading
  React.useEffect(() => {
    setIsInitialLoading(true);
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading more products
  const handleLoadMore = () => {
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setDisplayedProducts((prev) => prev + 10);
      setLoading(false);

      // Stop loading more after 50 products
      if (displayedProducts + 10 >= 50) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Convert featured products and combine with generated ones
  const convertedFeaturedProducts = featuredProductsData.map(
    convertToProductCardFormat
  );
  const generatedProducts = generateMoreProducts(
    3,
    Math.max(0, displayedProducts - 2)
  );

  const allProducts = [...convertedFeaturedProducts, ...generatedProducts];

  const currentProducts = allProducts.slice(0, displayedProducts);

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isInitialLoading ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          currentProducts.map((product) => (
            <div
              key={`product--key${product.id}`}
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <ProductCard product={product} variant="grid" />
            </div>
          ))
        )}
      </div>

      <div className="text-center pt-8 xl:pt-14">
        {hasMore && !isInitialLoading && (
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

export default MockProductGrid;
