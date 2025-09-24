/**
 * Usage Example for BannerWithProducts Mock Data
 *
 * This file demonstrates how to use the dummy mock data
 * with the BannerWithProducts component.
 */

import React from "react";
import BannerWithProducts from "@containers/banner-with-products";
import {
  dummyBannerWithProductsData,
  getRandomProducts,
  getProductsByCategory,
  getBannerByVariant,
} from "./dummy-banner-with-products-data";

// Example 1: Basic usage with default data
export const BasicBannerWithProductsExample: React.FC = () => {
  return (
    <BannerWithProducts
      sectionHeading="Featured Products"
      className="mb-12 md:mb-14 xl:mb-16"
      variant="default"
    />
  );
};

// Example 2: Using with reverse variant
export const ReverseBannerWithProductsExample: React.FC = () => {
  return (
    <BannerWithProducts
      sectionHeading="New Arrivals"
      className="mb-12 md:mb-14 xl:mb-16"
      variant="reverse"
    />
  );
};

// Example 3: Using with specific category
export const CategoryBannerWithProductsExample: React.FC = () => {
  return (
    <BannerWithProducts
      sectionHeading="Electronics Collection"
      categorySlug="electronics"
      className="mb-12 md:mb-14 xl:mb-16"
      variant="default"
    />
  );
};

// Example 4: Custom component using the mock data directly
export const CustomBannerWithProductsExample: React.FC = () => {
  const bannerData = getBannerByVariant("default");
  const products = getRandomProducts(8);

  return (
    <div className="mb-12 md:mb-14 xl:mb-16">
      <h2 className="text-2xl font-bold mb-6">Custom Banner with Products</h2>

      {/* Banner Section */}
      <div className="mb-8">
        <img
          src={bannerData.image.desktop.url}
          alt={bannerData.title}
          className="w-full h-auto rounded-lg"
        />
        <h3 className="text-xl font-semibold mt-4">{bannerData.title}</h3>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img
              src={product.image.thumbnail}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-red-600">
                ${product.sale_price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            {product.isNewArrival && (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                New Arrival
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Example 5: Using with different categories
export const CategorySpecificExample: React.FC = () => {
  const electronicsProducts = getProductsByCategory("electronics");
  const fashionProducts = getProductsByCategory("fashion");

  return (
    <div className="space-y-12">
      {/* Electronics Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Electronics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electronicsProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.image.thumbnail}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">
                  ${product.sale_price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fashion Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Fashion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fashionProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.image.thumbnail}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">
                  ${product.sale_price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Example 6: Banner variations
export const BannerVariationsExample: React.FC = () => {
  const defaultBanner = getBannerByVariant("default");
  const reverseBanner = getBannerByVariant("reverse");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Default Banner</h2>
        <div className="relative">
          <img
            src={defaultBanner.image.desktop.url}
            alt={defaultBanner.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">
              {defaultBanner.title}
            </h3>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Reverse Banner</h2>
        <div className="relative">
          <img
            src={reverseBanner.image.desktop.url}
            alt={reverseBanner.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">
              {reverseBanner.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  BasicBannerWithProductsExample,
  ReverseBannerWithProductsExample,
  CategoryBannerWithProductsExample,
  CustomBannerWithProductsExample,
  CategorySpecificExample,
  BannerVariationsExample,
};
