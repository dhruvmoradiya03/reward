import React, { useState } from "react";
import { NextSeo } from "next-seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useCart } from "@contexts/cart/cart.context";
import Link from "next/link";
import { HiOutlineEnvelope, HiOutlinePhone } from "react-icons/hi2";
import { HiOutlineEye } from "react-icons/hi";
import AddressSelectionModal from "@components/checkout/address-selection-modal";
import AddAddressModal from "@components/checkout/add-address-modal";
import EditAddressModal from "@components/checkout/edit-address-modal";
import { useTenantConfig } from "@hooks/use-tenant-config";

interface CheckoutMobileProps {}

const CheckoutMobile: React.FC<CheckoutMobileProps> = () => {
  const { items, total, isEmpty, removeItemFromCart } = useCart();
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
      // Update quantity logic would go here
      console.log(`Update quantity for ${itemId} to ${newQuantity}`);
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
    // Here you would typically save to your backend
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
    // Here you would typically update the address in your backend
    setAddress(
      `${editedAddress.streetName}, ${editedAddress.city}, ${editedAddress.state}`
    );
    setIsEditAddressModalOpen(false);
    setAddressToEdit(null);
  };

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 mb-4">
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
        {/* Use common header from layout - no custom header */}

        <div className="p-4 space-y-4">
          {/* YOUR ORDER DETAILS */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2
              className="text-xs font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "Inter" }}
            >
              YOUR ORDER DETAILS
            </h2>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200 last:border-b-0 pb-3 last:pb-0"
                >
                  <div className="flex items-start space-x-3">
                    {/* Product Image - 16x16 as per image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Product Name */}
                      <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                        {item.name}
                      </h3>

                      {/* Price Section */}
                      <div className="mb-2">
                        {/* Discount Badge */}
                        <div className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded mb-1">
                          20% OFF
                        </div>

                        {/* Price with strikethrough */}
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">
                            ₹{Math.round(item.price * 1.25)}
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            ₹{item.price}
                          </span>
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
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
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
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 text-sm"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
            <h3
              className="text-xs font-semibold text-gray-900 mb-4"
              style={{ fontFamily: "Inter" }}
            >
              OFFERS & PROMO CODE
            </h3>
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
                  <span className="font-semibold">₹{total}</span>
                  <HiOutlineEye className="w-4 h-4 ml-1 text-gray-400" />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Available Points</span>
                <div className="flex items-center">
                  <span className="font-semibold text-green-600">
                    -₹{pointsDiscount}
                  </span>
                  <HiOutlineEye className="w-4 h-4 ml-1 text-gray-400" />
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
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Change
              </button>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-gray-900">Home</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                {address}
              </div>
              <button
                onClick={() => {
                  // Create a mock address object for editing
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

          {/* YOUR ORDER DETAILS WILL BE SENT TO */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              YOUR ORDER DETAILS WILL BE SENT TO
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
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <HiOutlineEnvelope className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
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
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <HiOutlinePhone className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
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
              className="w-full text-white py-3 px-6 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 font-semibold text-lg"
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
