import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import ProductWishIcon from "@components/icons/product-wish-icon";
import { featuredProductsData } from "../../data/featured-products-data";
import ProductCard from "@components/product/product-card";

interface ProductDetailPageProps {
  productId: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState("gold");
  const [selectedPackSize, setSelectedPackSize] = useState("1");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find the product by ID
  const product = featuredProductsData.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const discountPercentage = Math.round(
    ((parseFloat(product.face_value_mrp) -
      parseFloat(product.cost_price_withtax)) /
      parseFloat(product.face_value_mrp)) *
      100
  );

  const handleBackClick = () => {
    router.back();
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", {
      productId,
      quantity,
      color: selectedColor,
      packSize: selectedPackSize,
    });
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log("Buy now:", {
      productId,
      quantity,
      color: selectedColor,
      packSize: selectedPackSize,
    });
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement wishlist API call
  };

  // Generate related products (excluding current product)
  const relatedProducts = featuredProductsData
    .filter((p) => p.id !== productId)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.product_name,
      slug: `product-${p.id}`,
      description: p.description,
      isNewArrival: true,
      image: {
        id: p.id,
        thumbnail: p.product_thumbnail,
        original: p.product_image?.[0] || p.product_thumbnail,
      },
      gallery:
        p.product_image?.map((img: string, index: number) => ({
          id: index + 1,
          thumbnail: img,
          original: img,
        })) || [],
      price: parseFloat(p.face_value_mrp),
      sale_price: parseFloat(p.cost_price_withtax),
      quantity: 50,
      sku: p.product_code,
      category: {
        id: p.product_group_id,
        name: p.category_name,
        slug: p.category_name.toLowerCase().replace(/\s+/g, "-"),
      },
      brand: {
        id: p.id,
        name: p.brand_name,
        slug: p.brand_name.toLowerCase(),
      },
      unit: "pcs",
      tags: [p.category_name.toLowerCase()],
      variations: [],
      meta: {
        title: p.product_name,
        description: p.description,
      },
    }));

  const colors = [
    { name: "Gold", value: "gold", color: "#FFD700" },
    { name: "White", value: "white", color: "#FFFFFF" },
    { name: "Black", value: "black", color: "#000000" },
    { name: "Gray", value: "gray", color: "#808080" },
  ];

  const packSizes = ["1", "2", "3", "4"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              Product Details
            </h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <Image
                src={product.product_thumbnail}
                alt={product.product_name}
                fill
                className="object-cover"
                priority
              />
              {/* Heart Icon */}
              <button
                onClick={handleWishlistToggle}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isWishlisted
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-600 hover:text-red-500"
                }`}
              >
                <ProductWishIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Image Dots */}
            <div className="flex justify-center gap-2">
              {product.product_image && product.product_image.length > 1 ? (
                product.product_image
                  .slice(0, 4)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="w-2 h-2 bg-gray-300 rounded-full"
                    />
                  ))
              ) : (
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              )}
            </div>

            {/* Thumbnail Images */}
            {product.product_image && product.product_image.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.product_image.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded border-2 border-gray-200"
                  >
                    <Image
                      src={image}
                      alt={`${product.product_name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.product_name}
              </h1>
              <p className="text-gray-600 text-sm">
                {product.brand_name} • {product.category_name}
              </p>
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    product.description
                      .replace(/<[^>]*>/g, "")
                      .substring(0, 200) + "...",
                }}
              />
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              {discountPercentage > 0 && (
                <div className="text-red-600 text-sm font-medium">
                  {discountPercentage}% Off
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{parseFloat(product.cost_price_withtax).toLocaleString()}
                </span>
                <span className="text-xl text-[#787878] font-medium">
                  + ₹
                  {Math.round(
                    parseFloat(product.cost_price_withtax) * 0.1
                  ).toLocaleString()}
                </span>
              </div>

              {discountPercentage > 0 && (
                <div>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{parseFloat(product.face_value_mrp).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Quantity
              </label>
              <Counter
                value={quantity}
                onIncrement={() => setQuantity((prev) => prev + 1)}
                onDecrement={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-32"
              />
            </div>

            {/* Pack Size Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Pack Size
              </label>
              <div className="flex gap-2">
                {packSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedPackSize(size)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors ${
                      selectedPackSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Colour
              </label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-gray-400 scale-110"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    style={{ backgroundColor: color.color }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                Add to cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Buy Now
              </Button>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4 pt-6">
              {/* Additional Information */}
              <div className="border border-gray-200 rounded-lg">
                <button className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                  <span className="font-medium text-gray-900">
                    Additional Information
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Specifications */}
              <div className="border border-gray-200 rounded-lg">
                <button className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                  <span className="font-medium text-gray-900">
                    Specifications
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore Gift Cards
            </h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="relative">
                <ProductCard
                  product={relatedProduct}
                  variant="grid"
                  className="h-full"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                    -10%
                  </span>
                </div>
                <button className="absolute top-2 left-2 p-1 bg-white rounded-full shadow-sm">
                  <ProductWishIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
