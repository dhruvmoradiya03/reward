import React from "react";
import { useRouter } from "next/router";
import ArrowLeftIcon from "@components/icons/arrow-left-icon";
import SearchIcon from "@components/icons/search-icon";
import CartIcon from "@components/icons/cart-icon";
import { useCart } from "@contexts/cart/cart.context";
import ClientOnly from "@components/common/client-only";

const WishlistHeader: React.FC = () => {
  const router = useRouter();
  const { totalItems } = useCart();

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Mobile Header */}
      <div className="lg:hidden">
        {/* Status Bar */}

        {/* Main Header */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2"
              aria-label="Go back"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>

            <h1 className="text-lg font-semibold text-gray-900">Wishlist</h1>

            <div className="w-9"></div>
          </div>

          {/* Tabs */}
          <div className="flex mt-4 border-b border-gray-200">
            <button className="flex-1 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Shopping
            </button>
            <button className="flex-1 py-2 text-sm font-medium text-gray-500">
              Gift Cards
            </button>
            <button className="flex-1 py-2 text-sm font-medium text-gray-500">
              Experiences
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Go back"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search wishlist..."
                  className="w-64 px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <CartIcon className="w-6 h-6" />
                  <ClientOnly fallback={null}>
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {totalItems}
                      </span>
                    )}
                  </ClientOnly>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  20,000 &gt;
                </span>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  SB
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="flex mt-6 border-b border-gray-200">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Shopping
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500">
              Gift Cards
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500">
              Experiences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistHeader;
