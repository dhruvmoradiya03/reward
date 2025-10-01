import React, { useState, useMemo, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Container from "@components/ui/container";
import { useTenantConfig } from "../hooks/use-tenant-config";
import { useUI } from "@contexts/ui.context";
import ClientOnly from "@components/common/client-only";
import SubdomainSwitcher from "@components/common/subdomain-switcher";
import ConditionalPricing from "@components/common/conditional-pricing";
import { featuredProductsData } from "../data/featured-products-data";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

// Product interface
interface Product {
  id: string;
  product_code: string;
  product_name: string;
  description: string;
  product_thumbnail: string;
  product_image: string[];
  face_value_mrp: string;
  cost_price_withtax: string;
  brand_name: string;
  category_name: string;
  attributes: {
    color?: string[];
    Storage?: string[];
    Memory?: string[];
  };
}

// Filter interface
interface Filter {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  color: string[];
}

const FeaturedProductsSearch: NextPage = () => {
  const router = useRouter();
  const { currentTenant, theme } = useTenantConfig();
  const { isAuthorized, openModal, setModalView, setModalData, closeSearch } =
    useUI();

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filters, setFilters] = useState<Filter>({
    category: [],
    brand: [],
    priceRange: [0, 10000],
    color: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Load filters from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem("productFilters");
    if (savedFilters) {
      try {
        const filterState = JSON.parse(savedFilters);
        setSearchQuery(filterState.searchQuery || "");
        setFilters({
          category: filterState.category || [],
          brand: filterState.brand || [],
          priceRange: filterState.priceRange || [0, 10000],
          color: filterState.color || [],
        });
        // Clear the saved filters after applying them
        localStorage.removeItem("productFilters");
      } catch (error) {
        console.error("Error parsing saved filters:", error);
      }
    }
  }, []);

  // Ensure search is closed when component mounts
  useEffect(() => {
    closeSearch();
  }, [closeSearch]);

  // Handle browser navigation and URL changes
  useEffect(() => {
    const handlePopState = () => {
      // If we're on the search page, reload filters from localStorage
      if (window.location.pathname === "/featured-products-search") {
        const savedFilters = localStorage.getItem("productFilters");
        if (savedFilters) {
          try {
            const filterState = JSON.parse(savedFilters);
            setSearchQuery(filterState.searchQuery || "");
            setFilters({
              category: filterState.category || [],
              brand: filterState.brand || [],
              priceRange: filterState.priceRange || [0, 10000],
              color: filterState.color || [],
            });
          } catch (error) {
            console.error("Error parsing saved filters:", error);
          }
        }
      }
    };

    // Listen for browser back/forward navigation
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Popup handler
  const openProductPopup = (product: Product) => {
    // Ensure search is closed before opening modal
    closeSearch();

    setModalData({ data: product });
    setModalView("PRODUCT_VIEW");
    return openModal();
  };

  // Get all products from mock data
  const allProducts: Product[] = featuredProductsData;

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.product_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.brand_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) =>
        filters.category.includes(product.category_name)
      );
    }

    // Brand filter
    if (filters.brand.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brand.includes(product.brand_name)
      );
    }

    // Price range filter
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.cost_price_withtax);
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Color filter
    if (filters.color.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.attributes.color &&
          filters.color.some((color) =>
            product.attributes.color?.includes(color)
          )
      );
    }

    return filtered;
  }, [allProducts, searchQuery, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) =>
          a.product_name.localeCompare(b.product_name)
        );
      case "price-low":
        return sorted.sort(
          (a, b) =>
            parseFloat(a.cost_price_withtax) - parseFloat(b.cost_price_withtax)
        );
      case "price-high":
        return sorted.sort(
          (a, b) =>
            parseFloat(b.cost_price_withtax) - parseFloat(a.cost_price_withtax)
        );
      case "brand":
        return sorted.sort((a, b) => a.brand_name.localeCompare(b.brand_name));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Get unique values for filters
  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.category_name)));
  }, [allProducts]);

  const brands = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.brand_name)));
  }, [allProducts]);

  const colors = useMemo(() => {
    const allColors = allProducts
      .map((p) => p.attributes.color)
      .filter(Boolean)
      .flat();
    return Array.from(new Set(allColors));
  }, [allProducts]);

  // Update filter
  const updateFilter = (key: keyof Filter, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      priceRange: [0, 10000],
      color: [],
    });
    setSearchQuery("");
  };

  return (
    <>
      <NextSeo
        title={`Featured Products - ${
          currentTenant?.name || "Rewards Platform"
        }`}
        description="Browse our featured products collection with the latest and most popular items"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div
          className="bg-white shadow-sm border-b"
          style={{ borderColor: theme?.primaryColor + "20" }}
        >
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  ← Back to Home
                </Link>
                <h1
                  className="text-2xl font-bold"
                  style={{ color: theme?.textColor }}
                >
                  Featured Products
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <SubdomainSwitcher />
                {!isAuthorized && (
                  <Link
                    href="/signin"
                    className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: theme?.primaryColor }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Filters (Hidden on mobile, shown on desktop) */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFilter("category", [
                                ...filters.category,
                                category,
                              ]);
                            } else {
                              updateFilter(
                                "category",
                                filters.category.filter((c) => c !== category)
                              );
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Brands
                  </h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.brand.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFilter("brand", [...filters.brand, brand]);
                            } else {
                              updateFilter(
                                "brand",
                                filters.brand.filter((b) => b !== brand)
                              );
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={filters.priceRange[1]}
                      onChange={(e) =>
                        updateFilter("priceRange", [
                          filters.priceRange[0],
                          parseInt(e.target.value),
                        ])
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹{filters.priceRange[0]}</span>
                      <span>₹{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                {colors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Colors
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => {
                        if (!color) return null;
                        return (
                          <button
                            key={color}
                            onClick={() => {
                              if (filters.color.includes(color)) {
                                updateFilter(
                                  "color",
                                  filters.color.filter((c) => c !== color)
                                );
                              } else {
                                updateFilter("color", [
                                  ...filters.color,
                                  color,
                                ]);
                              }
                            }}
                            className={`w-8 h-8 rounded-full border-2 ${
                              filters.color.includes(color)
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                            style={{
                              backgroundColor: color.includes("#")
                                ? color.split(",")[1]
                                : color,
                            }}
                            title={color}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span>Filters</span>
                </button>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 bg-white rounded-lg shadow-sm p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search Products
                      </label>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {sortedProducts.length} Products Found
                  </h2>
                  <p className="text-sm text-gray-600">
                    Showing results for {currentTenant?.name || "Demo"} client
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="brand">Sort by Brand</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${
                        viewMode === "grid"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${
                        viewMode === "list"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              <ClientOnly
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
                      >
                        <div className="h-48 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))}
                  </div>
                }
              >
                {sortedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "space-y-4"
                    }
                  >
                    {sortedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                        onProductClick={openProductPopup}
                      />
                    ))}
                  </div>
                )}
              </ClientOnly>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

// Product Card Component
interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  onProductClick,
}) => {
  if (viewMode === "list") {
    return (
      <div
        className="bg-white rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-4 cursor-pointer hover:shadow-md transition-shadow"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onProductClick(product);
        }}
      >
        {/* Product Image */}
        <div className="w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
          <img
            src={product.product_thumbnail}
            alt={product.product_name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.product_name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {product.brand_name} • {product.category_name}
          </p>
          <div className="mb-4">
            <ConditionalPricing
              price={parseFloat(product.cost_price_withtax)}
              originalPrice={parseFloat(product.face_value_mrp)}
              points={Math.round(parseFloat(product.cost_price_withtax) * 10)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Click to view details</span>
            <button
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to wishlist functionality can be added here
              }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onProductClick(product);
      }}
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.product_thumbnail}
          alt={product.product_name}
          className="w-full h-48 object-cover"
        />
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Add to wishlist functionality can be added here
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.product_name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          {product.brand_name} • {product.category_name}
        </p>

        <div className="mb-4">
          <ConditionalPricing
            price={parseFloat(product.cost_price_withtax)}
            originalPrice={parseFloat(product.face_value_mrp)}
            points={Math.round(parseFloat(product.cost_price_withtax) * 10)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="flex-1 text-sm text-gray-500 text-center">
            Click to view details
          </span>
          <button
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add to wishlist functionality can be added here
            }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

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

export default FeaturedProductsSearch;
