import React, { useState } from "react";
import { useTenantConfig } from "../../hooks/use-tenant-config";

interface ConditionalPaymentOptionsProps {
  totalAmount: number;
  userPoints?: number;
  onPaymentMethodChange: (method: "points" | "payment" | "hybrid") => void;
  selectedMethod: "points" | "payment" | "hybrid";
}

const ConditionalPaymentOptions: React.FC<ConditionalPaymentOptionsProps> = ({
  totalAmount,
  userPoints = 0,
  onPaymentMethodChange,
  selectedMethod,
}) => {
  const {
    canUsePoints,
    canUsePayment,
    canUsePointsAndPay,
    isOnlyPoints,
    isOnlyPay,
    pointsPayConfig,
  } = useTenantConfig();

  const [pointsToUse, setPointsToUse] = useState(0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatPoints = (pointAmount: number) => {
    return `${pointAmount.toLocaleString()} pts`;
  };

  const calculatePointsValue = (points: number) => {
    if (!pointsPayConfig) return 0;
    return points * pointsPayConfig.pointsToCurrencyRatio;
  };

  const calculateRemainingAmount = () => {
    if (selectedMethod === "points") return 0;
    if (selectedMethod === "hybrid") {
      return totalAmount - calculatePointsValue(pointsToUse);
    }
    return totalAmount;
  };

  const maxPointsAllowed = Math.min(
    userPoints,
    pointsPayConfig?.maxPointsAllowed || userPoints,
    Math.floor(totalAmount / (pointsPayConfig?.pointsToCurrencyRatio || 1))
  );

  const minPointsRequired = pointsPayConfig?.minPointsRequired || 0;

  // Don't render anything if no payment options are available
  if (!canUsePoints && !canUsePayment) {
    return null;
  }

  return (
    <div className="conditional-payment-options space-y-4">
      <h3 className="text-lg font-semibold">Payment Options</h3>

      {/* Points Only Mode */}
      {isOnlyPoints && canUsePoints && (
        <div className="points-only-payment">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">
                  Redeem with Points
                </h4>
                <p className="text-sm text-blue-700">
                  Total:{" "}
                  {formatPoints(
                    Math.ceil(
                      totalAmount /
                        (pointsPayConfig?.pointsToCurrencyRatio || 1)
                    )
                  )}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-900">
                  {formatPoints(
                    Math.ceil(
                      totalAmount /
                        (pointsPayConfig?.pointsToCurrencyRatio || 1)
                    )
                  )}
                </div>
                <div className="text-sm text-blue-700">points required</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Only Mode */}
      {isOnlyPay && canUsePayment && (
        <div className="payment-only-options">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-green-900">
                  Pay with Card/UPI
                </h4>
                <p className="text-sm text-green-700">
                  Secure payment processing
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-900">
                  {formatPrice(totalAmount)}
                </div>
                <div className="text-sm text-green-700">total amount</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hybrid Mode - Points + Payment */}
      {canUsePointsAndPay && (
        <div className="hybrid-payment-options space-y-3">
          {/* Points + Payment Option */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="hybrid-payment"
                name="payment-method"
                checked={selectedMethod === "hybrid"}
                onChange={() => onPaymentMethodChange("hybrid")}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="hybrid-payment" className="flex-1">
                <div className="font-medium">Use Points + Pay Remaining</div>
                <div className="text-sm text-gray-600">
                  Use your points and pay the rest
                </div>
              </label>
            </div>

            {selectedMethod === "hybrid" && (
              <div className="mt-3 ml-7 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points to Use (Available: {formatPoints(userPoints)})
                  </label>
                  <input
                    type="range"
                    min={minPointsRequired}
                    max={maxPointsAllowed}
                    value={pointsToUse}
                    onChange={(e) => setPointsToUse(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatPoints(minPointsRequired)}</span>
                    <span>{formatPoints(maxPointsAllowed)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span>Points to use:</span>
                    <span className="font-medium">
                      {formatPoints(pointsToUse)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Points value:</span>
                    <span className="font-medium">
                      {formatPrice(calculatePointsValue(pointsToUse))}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-1 mt-1">
                    <span>Remaining to pay:</span>
                    <span>{formatPrice(calculateRemainingAmount())}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Full Payment Option */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="full-payment"
                name="payment-method"
                checked={selectedMethod === "payment"}
                onChange={() => onPaymentMethodChange("payment")}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="full-payment" className="flex-1">
                <div className="font-medium">Pay Full Amount</div>
                <div className="text-sm text-gray-600">
                  Pay {formatPrice(totalAmount)} with card/UPI
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Points Only Option (in hybrid mode) */}
      {canUsePointsAndPay &&
        userPoints >=
          Math.ceil(
            totalAmount / (pointsPayConfig?.pointsToCurrencyRatio || 1)
          ) && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="points-only"
                name="payment-method"
                checked={selectedMethod === "points"}
                onChange={() => onPaymentMethodChange("points")}
                className="h-4 w-4 text-blue-600"
              />
              <label htmlFor="points-only" className="flex-1">
                <div className="font-medium">Use Points Only</div>
                <div className="text-sm text-gray-600">
                  Redeem{" "}
                  {formatPoints(
                    Math.ceil(
                      totalAmount /
                        (pointsPayConfig?.pointsToCurrencyRatio || 1)
                    )
                  )}{" "}
                  points
                </div>
              </label>
            </div>
          </div>
        )}
    </div>
  );
};

export default ConditionalPaymentOptions;
