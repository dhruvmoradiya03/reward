import React from "react";
import BannerWithProducts from "@containers/banner-with-products";

const BannerDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          BannerWithProducts Mock Data Demo
        </h1>

        {/* Default Variant */}
        <BannerWithProducts
          sectionHeading="Featured Products"
          className="mb-12"
          variant="default"
        />

        {/* Reverse Variant */}
        <BannerWithProducts
          sectionHeading="New Arrivals"
          className="mb-12"
          variant="reverse"
        />

        {/* Electronics Category */}
        <BannerWithProducts
          sectionHeading="Electronics Collection"
          categorySlug="electronics"
          className="mb-12"
          variant="default"
        />

        {/* Fashion Category */}
        <BannerWithProducts
          sectionHeading="Fashion Collection"
          categorySlug="fashion"
          className="mb-12"
          variant="reverse"
        />

        {/* Home Category */}
        <BannerWithProducts
          sectionHeading="Home & Garden"
          categorySlug="home-garden"
          className="mb-12"
          variant="default"
        />
      </div>
    </div>
  );
};

export default BannerDemo;
