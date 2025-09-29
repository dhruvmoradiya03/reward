import React from "react";
import { useUI } from "@contexts/ui.context";
import { useTranslation } from "next-i18next";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Button from "@components/ui/button";
import ProductWishIcon from "@components/icons/product-wish-icon";

const FeaturedProductPopup: React.FC = () => {
  const { t } = useTranslation("common");
  const { closeModal, modalData } = useUI();
  const product = modalData?.data;

  if (!product) return null;

  const discountPercentage = Math.round(
    ((parseFloat(product.face_value_mrp) -
      parseFloat(product.cost_price_withtax)) /
      parseFloat(product.face_value_mrp)) *
      100
  );

  const handleWishlistToggle = () => {
    // TODO: Implement wishlist toggle functionality
    console.log("Toggle wishlist:", product.id);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log("Add to cart:", product.id);
  };

  return (
    <div className="relative bg-white rounded-lg max-w-4xl mx-auto">
      {/* Close Button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Close"
      >
        <IoClose className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src={product.product_thumbnail}
              alt={product.product_name}
              fill
              className="object-cover"
            />
          </div>

          {/* Additional Images */}
          {product.product_image && product.product_image.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.product_image.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded"
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

        {/* Product Details */}
        <div className="space-y-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            {product.brand_image && (
              <div className="w-8 h-8 relative">
                <Image
                  src={product.brand_image}
                  alt={product.brand_name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-sm text-gray-600">{product.brand_name}</span>
          </div>

          {/* Product Name */}
          <h1 className="text-2xl font-bold text-gray-900">
            {product.product_name}
          </h1>

          {/* Category */}
          <div className="text-sm text-gray-500">{product.category_name}</div>

          {/* Attributes */}
          {product.attributes && (
            <div className="space-y-2">
              {product.attributes.color && product.attributes.color[0] && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Color:</span>
                  <span className="text-sm text-gray-600">
                    {product.attributes.color[0]}
                  </span>
                </div>
              )}
              {product.attributes.Storage && product.attributes.Storage[0] && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Storage:</span>
                  <span className="text-sm text-gray-600">
                    {product.attributes.Storage[0]}
                  </span>
                </div>
              )}
              {product.attributes.Memory && product.attributes.Memory[0] && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Memory:</span>
                  <span className="text-sm text-gray-600">
                    {product.attributes.Memory[0]}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{parseFloat(product.cost_price_withtax).toLocaleString()}
              </span>
              <span className="text-lg text-[#787878] font-medium">
                + ₹
                {Math.round(
                  parseFloat(product.cost_price_withtax) * 0.1
                ).toLocaleString()}
              </span>
            </div>

            {discountPercentage > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-lg text-gray-500 line-through">
                  ₹{parseFloat(product.face_value_mrp).toLocaleString()}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                  {discountPercentage}% Off
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
            <Button
              onClick={handleWishlistToggle}
              variant="outline"
              className="px-4"
            >
              <ProductWishIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Store Link */}
          {product.store_link && (
            <div className="pt-4 border-t">
              <a
                href={product.store_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Visit Store →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductPopup;
