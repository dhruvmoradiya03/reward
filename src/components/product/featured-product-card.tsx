import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUI } from "@contexts/ui.context";
import ProductViewIcon from "@components/icons/product-view-icon";
import WishlistButton from "@components/ui/wishlist-button";

interface FeaturedProduct {
  id: string;
  product_code: string;
  product_name: string;
  description: string;
  product_thumbnail: string;
  product_image: string[];
  brand_name: string;
  brand_image: string;
  face_value_mrp: string;
  cost_price_withtax: string;
  cost_percentage: string;
  attributes: {
    color: string[];
    Storage: string[];
    Memory: string[];
  };
  category_name: string;
  product_type: string;
}

interface FeaturedProductCardProps {
  product: FeaturedProduct;
  className?: string;
}

const FeaturedProductCard: React.FC<FeaturedProductCardProps> = ({
  product,
  className = "",
}) => {
  const { openModal, setModalView, setModalData } = useUI();
  const router = useRouter();

  const handleProductClick = () => {
    setModalData({ data: product });
    setModalView("PRODUCT_VIEW");
    return openModal();
  };

  const handlePopupView = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/product/${product.id}`);
  };

  const handleWishlistToggle = (productId: string, isFavorited: boolean) => {
    // TODO: Implement wishlist toggle functionality
    console.log(`Wishlist ${isFavorited ? "added" : "removed"}:`, productId);
  };

  const discountPercentage = Math.round(
    ((parseFloat(product.face_value_mrp) -
      parseFloat(product.cost_price_withtax)) /
      parseFloat(product.face_value_mrp)) *
      100
  );

  return (
    <div
      className={`group box-border overflow-hidden flex flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white rounded-md cursor-pointer ${className}`}
      onClick={handleProductClick}
      role="button"
      title={product.product_name}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={product.product_thumbnail}
          alt={product.product_name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "/assets/placeholder/products/product-placeholder.png";
          }}
        />

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              {discountPercentage}% Off
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <WishlistButton
            productId={product.id}
            onToggle={handleWishlistToggle}
            size="sm"
          />
          <button
            onClick={handlePopupView}
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Quick view"
          >
            <ProductViewIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Logo */}
        {product.brand_image && (
          <div className="absolute bottom-2 left-2">
            <div className="w-8 h-8 bg-white rounded-full p-1 shadow-sm">
              <Image
                src={product.brand_image}
                alt={product.brand_name}
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 w-full flex flex-col flex-grow">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1">
          {product.category_name}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 break-words hyphens-auto leading-tight">
          {product.product_name}
        </h3>

        {/* Attributes */}
        {product.attributes && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.attributes.color && product.attributes.color[0] && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {product.attributes.color[0]}
              </span>
            )}
            {product.attributes.Storage && product.attributes.Storage[0] && (
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {product.attributes.Storage[0]}
              </span>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 flex-nowrap">
            <span className="text-base font-bold text-gray-900">
              ₹{parseFloat(product.cost_price_withtax).toLocaleString()}
            </span>
            <span className="text-sm text-[#787878] font-medium whitespace-nowrap">
              + ₹
              {Math.round(
                parseFloat(product.cost_price_withtax) * 0.1
              ).toLocaleString()}
            </span>
          </div>

          {discountPercentage > 0 && (
            <div className="mt-1">
              <span className="text-sm text-gray-500 line-through">
                ₹{parseFloat(product.face_value_mrp).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductCard;
