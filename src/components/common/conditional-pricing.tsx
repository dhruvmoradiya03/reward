import React from "react";
import { useTenantConfig } from "../../hooks/use-tenant-config";

interface ConditionalPricingProps {
  price: number;
  points?: number;
  discount?: number;
  originalPrice?: number;
  className?: string;
}

const ConditionalPricing: React.FC<ConditionalPricingProps> = ({
  price,
  points,
  discount,
  originalPrice,
  className = "",
}) => {
  const {
    shouldShowPricing,
    shouldShowPoints,
    isOnlyPoints,
    isOnlyPay,
    canUsePointsAndPay,
    pointsPayConfig,
  } = useTenantConfig();

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatPoints = (pointAmount: number) => {
    return `${pointAmount.toLocaleString()} pts`;
  };

  const calculatePointsValue = (amount: number) => {
    if (!pointsPayConfig) return 0;
    return Math.round(amount / pointsPayConfig.pointsToCurrencyRatio);
  };

  return (
    <div className={`conditional-pricing ${className}`}>
      {/* Show pricing only if enabled and not points-only */}
      {shouldShowPricing() && !isOnlyPoints && (
        <div className="pricing-section">
          {originalPrice && originalPrice > price && (
            <span className="original-price line-through text-gray-500">
              {formatPrice(originalPrice)}
            </span>
          )}
          <span className="current-price font-semibold text-lg">
            {formatPrice(price)}
          </span>
          {discount && discount > 0 && (
            <span className="discount-badge bg-red-100 text-red-800 px-2 py-1 rounded text-sm ml-2">
              {discount}% OFF
            </span>
          )}
        </div>
      )}

      {/* Show points only if enabled and not payment-only */}
      {shouldShowPoints() && !isOnlyPay && points && (
        <div className="points-section">
          <span className="points-required text-blue-600 font-medium">
            {formatPoints(points)}
          </span>
          {canUsePointsAndPay && (
            <span className="points-value text-sm text-gray-600 ml-2">
              (≈ {formatPrice(calculatePointsValue(points))})
            </span>
          )}
        </div>
      )}

      {/* Show both pricing and points for hybrid mode */}
      {canUsePointsAndPay && shouldShowPricing() && shouldShowPoints() && (
        <div className="hybrid-pricing">
          <div className="flex items-center gap-2">
            <span className="price-or-points text-sm text-gray-600">
              Pay {formatPrice(price)} or use{" "}
              {formatPoints(points || calculatePointsValue(price))}
            </span>
          </div>
        </div>
      )}

      {/* Points-only mode */}
      {isOnlyPoints && points && (
        <div className="points-only-pricing">
          <span className="points-required text-lg font-semibold text-blue-600">
            {formatPoints(points)}
          </span>
          <span className="points-label text-sm text-gray-600 ml-2">
            points required
          </span>
        </div>
      )}
    </div>
  );
};

export default ConditionalPricing;
