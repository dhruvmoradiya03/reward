import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useCart } from "@contexts/cart/cart.context";
import Link from "next/link";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import AddressSelectionModal from "@components/checkout/address-selection-modal";
import AddAddressModal from "@components/checkout/add-address-modal";
import EditAddressModal from "@components/checkout/edit-address-modal";
import { useTenantConfig } from "../hooks/use-tenant-config";

interface CheckoutMobileProps {}

const CheckoutMobile: React.FC<CheckoutMobileProps> = () => {
  const { items, total, isEmpty, removeItemFromCart, updateItemQuantity } =
    useCart();
  const { theme } = useTenantConfig();
  const [promoCode, setPromoCode] = useState("");
  const [email, setEmail] = useState("abode@xyz.com");
  const [phone, setPhone] = useState("9876543210");
  const [address, setAddress] = useState(
    "Q-102, Business Plaza, Near St. Mary's School, Green Park, Delhi-110123"
  );
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<any>(null);

  const availablePoints = 22000;
  const shipping = 0; // Free shipping
  const pointsDiscount = Math.min(availablePoints, total * 0.55); // 55% discount with points
  const finalAmount = total - pointsDiscount + shipping;

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

  const handlePromoCode = () => {
    console.log("Apply promo code:", promoCode);
    // Promo code logic would go here
  };

  const handleBuyNow = () => {
    if (!agreeToTerms) {
      alert("Please agree to terms and conditions");
      return;
    }
    console.log("Proceed to payment");
    // Payment logic would go here
  };

  const handleAddressSelect = (selectedAddress: any) => {
    setAddress(selectedAddress.address);
    setIsAddressModalOpen(false);
  };

  const handleAddNewAddress = () => {
    setIsAddressModalOpen(false);
    setIsAddAddressModalOpen(true);
  };

  const handleSaveAddress = (newAddress: any) => {
    console.log("New address saved:", newAddress);
    setAddress(
      `${newAddress.streetName}, ${newAddress.city}, ${newAddress.state}`
    );
    setIsAddAddressModalOpen(false);
  };

  const handleEditAddress = (address: any) => {
    setAddressToEdit(address);
    setIsAddressModalOpen(false);
    setIsEditAddressModalOpen(true);
  };

  const handleSaveEditedAddress = (editedAddress: any) => {
    console.log("Address edited:", editedAddress);
    setAddress(
      `${editedAddress.streetName}, ${editedAddress.city}, ${editedAddress.state}`
    );
    setIsEditAddressModalOpen(false);
    setAddressToEdit(null);
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <NextSeo title="Checkout" description="Complete your purchase" />

      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
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
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>
            <div className="w-6 h-6"></div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* YOUR ORDER DETAILS */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2
              className="text-xs font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "Inter" }}
            >
              YOUR ORDER DETAILS
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0"
                >
                  <div className="flex items-start space-x-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Product Name */}
                      <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2">
                        {item.name}
                      </h3>

                      {/* Discount Badge */}
                      <div className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded mb-2">
                        20% OFF
                      </div>

                      {/* Price Section */}
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="text-sm text-gray-500 line-through">
                          ₹{Math.round(item.price * 1.25)}
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{item.price}
                        </span>
                        <div className="flex items-center text-sm text-gray-600 ml-2">
                          <div className="w-4 h-4 bg-gray-400 rounded-full mr-1"></div>
                          <span>{item.price} + ₹220</span>
                        </div>
                      </div>

                      {/* Quantity and Remove controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
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
                          <span className="w-8 text-center font-semibold text-sm">
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
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OFFERS & PROMO CODE */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2
              className="text-xs font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "Inter" }}
            >
              OFFERS & PROMO CODE
            </h2>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={handlePromoCode}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                style={{
                  backgroundColor: theme?.primaryColor || "#1A60E3",
                  borderColor: theme?.primaryColor || "#1A60E3",
                }}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <div className="flex items-center">
                  <span className="font-semibold">{total}</span>
                  <div className="w-4 h-4 bg-gray-400 rounded-full ml-1"></div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Points</span>
                <div className="flex items-center">
                  <span className="font-semibold text-green-600">
                    - {pointsDiscount}
                  </span>
                  <div className="w-4 h-4 bg-gray-400 rounded-full ml-1"></div>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    Amount Payable
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ₹{finalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DELIVERY ADDRESS */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                DELIVERY ADDRESS
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Change
                </button>
                <button
                  onClick={() => {
                    const mockAddress = {
                      id: "1",
                      name: "Home",
                      address: address,
                      streetName: "Business Plaza, Near St. Mary's School",
                      city: "Delhi",
                      state: "Delhi",
                      aptSuite: "Q-102",
                    };
                    setAddressToEdit(mockAddress);
                    setIsEditAddressModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-sm text-gray-900">Home</span>
              </div>
              <div className="text-sm text-gray-600 leading-relaxed ml-6">
                {address}
              </div>
            </div>
          </div>

          {/* YOUR GIFT CARD(S) WILL BE SENT TO */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              YOUR GIFT CARD(S) WILL BE SENT TO
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address*
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <HiOutlineEnvelope className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <HiOutlinePhone className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Buy Now */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-start space-x-3 mb-6">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I Agree to{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Terms & Conditions
                </Link>
              </label>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={!agreeToTerms || isEmpty}
              style={{
                backgroundColor: theme?.primaryColor || "#1A60E3",
                borderColor: theme?.primaryColor || "#1A60E3",
              }}
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* Address Selection Modal */}
        <AddressSelectionModal
          isOpen={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          onSelectAddress={handleAddressSelect}
          onAddNewAddress={handleAddNewAddress}
          onEditAddress={handleEditAddress}
        />

        {/* Add Address Modal */}
        <AddAddressModal
          isOpen={isAddAddressModalOpen}
          onClose={() => setIsAddAddressModalOpen(false)}
          onSaveAddress={handleSaveAddress}
        />

        {/* Edit Address Modal */}
        <EditAddressModal
          isOpen={isEditAddressModalOpen}
          onClose={() => setIsEditAddressModalOpen(false)}
          onSaveAddress={handleSaveEditedAddress}
          addressToEdit={addressToEdit}
        />
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

export default CheckoutMobile;
