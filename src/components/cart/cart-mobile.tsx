import React from "react";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import { IoClose } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi2";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useTenantConfig } from "../../hooks/use-tenant-config";

export default function CartMobile() {
  const { t } = useTranslation("common");
  const { closeCart } = useUI();
  const { items, total, isEmpty, removeItemFromCart, updateItemQuantity } =
    useCart();
  const { theme } = useTenantConfig();

  const handleQuantityChange = (
    itemId: string | number,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
        <button
          onClick={closeCart}
          className="p-2 text-gray-500 hover:text-gray-700"
          aria-label="close"
        >
          <IoClose className="w-6 h-6" />
        </button>
      </div>

      {!isEmpty ? (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {items?.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Product Name */}
                    <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Price Section */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-500 line-through">
                        ₹{Math.round(item.price * 1.25)}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.price}
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <HiOutlineEye className="w-4 h-4 mr-1" />
                        <span>{item.price} + ₹220</span>
                      </div>
                    </div>

                    {/* Quantity and Remove controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-white rounded-full px-3 py-1 border border-gray-200">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              (item.quantity || 1) - 1
                            )
                          }
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                        >
                          -
                        </button>
                        <span className="mx-3 text-sm font-semibold">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              (item.quantity || 1) + 1
                            )
                          }
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItemFromCart(item.id)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <IoClose className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 text-sm">
              Add some items to get started
            </p>
          </div>
        </div>
      )}

      {/* Footer with Total and Checkout */}
      {!isEmpty && (
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-xl font-bold text-gray-900">₹{total}</span>
          </div>

          <Link
            href={ROUTES.CHECKOUT}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center block transition-colors"
            style={{
              backgroundColor: theme?.primaryColor || "#1A60E3",
            }}
            onClick={closeCart}
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
