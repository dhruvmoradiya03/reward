import React from "react";

interface ConditionalPricingProps {
  price: number;
  points: number;
  originalPrice?: number;
  discount?: number;
  currency?: string;
  className?: string;
  showOriginalPrice?: boolean;
  showDiscount?: boolean;
  clientType?: "only-pay" | "only-points" | "pay-plus-points";
}

const ConditionalPricing: React.FC<ConditionalPricingProps> = ({
  price,
  points,
  originalPrice,
  discount,
  currency = "₹",
  className = "",
  showOriginalPrice = true,
  showDiscount = true,
  clientType = "pay-plus-points", // Default to pay-plus-points
}) => {
  const renderPricing = () => {
    switch (clientType) {
      case "only-pay":
        return (
          <div className={`tenant-price ${className}`}>
            {currency}
            {price.toLocaleString()}
            {showOriginalPrice && originalPrice && originalPrice > price && (
              <span className="line-through text-gray-400 ml-2">
                {currency}
                {originalPrice.toLocaleString()}
              </span>
            )}
            {showDiscount && discount && (
              <span className="tenant-discount ml-2">{discount}% OFF</span>
            )}
          </div>
        );

      case "only-points":
        return (
          <div className={`tenant-points ${className}`}>
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="font-semibold">
                {points.toLocaleString()} Points
              </span>
            </div>
            {showOriginalPrice && originalPrice && originalPrice > price && (
              <div className="text-sm text-gray-400 mt-1">
                Original: {currency}
                {originalPrice.toLocaleString()}
              </div>
            )}
            {showDiscount && discount && (
              <span className="tenant-discount text-sm">{discount}% OFF</span>
            )}
          </div>
        );

      case "pay-plus-points":
        return (
          <div className={`space-y-2 ${className}`}>
            {/* Points Display */}
            <div className="tenant-points">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center mr-2">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="font-semibold">{points.toLocaleString()}</span>
                <span className="text-gray-500 mx-1">+</span>
                <span className="tenant-price">
                  {currency}
                  {price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Alternative: Only Points Option */}
            <div className="text-sm text-gray-600">
              Or pay with {Math.ceil(points + price * 100)} points only
            </div>

            {/* Original Price and Discount */}
            {showOriginalPrice && originalPrice && originalPrice > price && (
              <div className="text-sm text-gray-400">
                Original: {currency}
                {originalPrice.toLocaleString()}
              </div>
            )}
            {showDiscount && discount && (
              <span className="tenant-discount text-sm">{discount}% OFF</span>
            )}
          </div>
        );

      default:
        return (
          <div className={`tenant-price ${className}`}>
            {currency}
            {price.toLocaleString()}
          </div>
        );
    }
  };

  return renderPricing();
};

export default ConditionalPricing;
