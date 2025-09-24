import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const CreateClient: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Client Information
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",

    // Website Configuration
    subdomain: "",
    domain: "",
    clientType: "pay-plus-points",

    // Theme Configuration
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    accentColor: "#F59E0B",
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    fontFamily: "Inter",

    // Features
    showBanner: true,
    showFeaturedProducts: true,
    showFeaturedVouchers: true,
    showCategories: true,
    showPointsBalance: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to client configuration page
      router.push("/admin/clients/1");
    } catch (error) {
      console.error("Error creating client:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Client - Super Admin</title>
        <meta
          name="description"
          content="Create a new client website configuration"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-4">
                    <li>
                      <Link
                        href="/admin"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="ml-4 text-sm font-medium text-gray-500">
                          Create Client
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-2xl font-bold text-gray-900 mt-2">
                  Create New Client
                </h1>
                <p className="text-sm text-gray-600">
                  Set up a new client website with custom configuration
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Client Information */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Client Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="clientName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Client Name *
                  </label>
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    required
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="clientEmail"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    required
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="client@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="clientPhone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="clientPhone"
                    name="clientPhone"
                    value={formData.clientPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subdomain"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subdomain *
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="subdomain"
                      name="subdomain"
                      required
                      value={formData.subdomain}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="client-name"
                    />
                    <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md text-gray-600">
                      .rewardsplatform.com
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="clientAddress"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <textarea
                  id="clientAddress"
                  name="clientAddress"
                  rows={3}
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter client address"
                />
              </div>
            </div>

            {/* Website Configuration */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Website Configuration
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Client Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      value: "only-pay",
                      label: "Payment Only",
                      description: "Users can only pay with money",
                      icon: "💳",
                    },
                    {
                      value: "only-points",
                      label: "Points Only",
                      description: "Users can only redeem with points",
                      icon: "⭐",
                    },
                    {
                      value: "pay-plus-points",
                      label: "Pay + Points",
                      description: "Users can pay with money and points",
                      icon: "💰",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`relative flex cursor-pointer rounded-lg p-4 border-2 ${
                        formData.clientType === option.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="clientType"
                        value={option.value}
                        checked={formData.clientType === option.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Configuration */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Theme Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="primaryColor"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="primaryColor"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="secondaryColor"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="secondaryColor"
                      name="secondaryColor"
                      value={formData.secondaryColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondaryColor}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="accentColor"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      id="accentColor"
                      name="accentColor"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                      className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Features Configuration */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Features Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "showBanner", label: "Show Banner Section" },
                  {
                    name: "showFeaturedProducts",
                    label: "Show Featured Products",
                  },
                  {
                    name: "showFeaturedVouchers",
                    label: "Show Featured Vouchers",
                  },
                  { name: "showCategories", label: "Show Categories" },
                  { name: "showPointsBalance", label: "Show Points Balance" },
                ].map((feature) => (
                  <label key={feature.name} className="flex items-center">
                    <input
                      type="checkbox"
                      name={feature.name}
                      checked={
                        formData[
                          feature.name as keyof typeof formData
                        ] as boolean
                      }
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {feature.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Client"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default CreateClient;
