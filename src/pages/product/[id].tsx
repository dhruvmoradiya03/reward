import React, { useState, useEffect } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import { useTenantConfig } from "../../hooks/use-tenant-config";
import { useUI } from "@contexts/ui.context";
import SubdomainSwitcher from "@components/common/subdomain-switcher";
import ConditionalPricing from "@components/common/conditional-pricing";
import ClientOnly from "../../components/common/client-only";
import { featuredProductsData } from "../../data/featured-products-data";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useCart } from "@contexts/cart/cart.context";
import { generateCartItem } from "@utils/generate-cart-item";
import Button from "@components/ui/button";

interface Product {
  id: string;
  product_code: string;
  product_name: string;
  description: string;
  product_thumbnail: string;
  product_image: string[];
  face_value_mrp: string;
  cost_price_withtax: string;
  brand_name: string;
  category_name: string;
  attributes: {
    color?: string[];
    Storage?: string[];
    Memory?: string[];
  };
}

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: NextPage<ProductDetailPageProps> = ({ product }) => {
  const router = useRouter();
  const { currentTenant, theme } = useTenantConfig();
  const { isAuthorized, closeSearch, closeModal, closeCart, openCart } =
    useUI();
  const { addItemToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [packSize, setPackSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [showSpecifications, setShowSpecifications] = useState(false);
  const [addToCartLoader, setAddToCartLoader] = useState(false);

  const allImages = [product.product_thumbnail, ...product.product_image];
  const originalPrice = parseFloat(product.face_value_mrp);
  const currentPrice = parseFloat(product.cost_price_withtax);
  const discountPercentage = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );
  const availableColors = product.attributes.color || [];

  // Add to Cart function
  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      product,
      selectedColor,
      packSize,
      quantity,
    });

    setAddToCartLoader(true);

    try {
      // Create attributes object
      const attributes: { [key: string]: string } = {};
      if (selectedColor) {
        attributes.color = selectedColor;
      }
      if (packSize) {
        attributes.packSize = packSize.toString();
      }

      // Map product to the format expected by generateCartItem
      const mappedProduct = {
        id: product.id,
        slug: product.id,
        name: product.product_name,
        description: product.description,
        image: {
          original: product.product_thumbnail,
          thumbnail: product.product_thumbnail,
        },
        price: currentPrice,
        sale_price: currentPrice,
        variations: product.attributes,
      };

      const item = generateCartItem(mappedProduct, attributes);
      console.log("Generated cart item:", item);

      addItemToCart(item, quantity);
      console.log("Successfully added to cart");

      setTimeout(() => {
        setAddToCartLoader(false);
      }, 600);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartLoader(false);
    }
  };

  // Buy Now function
  const handleBuyNow = () => {
    // Just open cart without adding items
    openCart();
  };

  // Close search and modal when component mounts
  useEffect(() => {
    closeSearch();
    closeModal();
  }, [closeSearch, closeModal]);

  return (
    <Layout>
      <NextSeo
        title={`${product.product_name} - ${
          currentTenant?.name || "Rewards Platform"
        }`}
        description={product.description
          .replace(/<[^>]*>/g, "")
          .substring(0, 160)}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div
          className="bg-white shadow-sm border-b"
          style={{ borderColor: theme?.primaryColor + "20" }}
        >
          <Container>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-blue-600 hover:text-blue-800">
                  ← Back to Home
                </Link>
                <h1
                  className="text-2xl font-bold"
                  style={{ color: theme?.textColor }}
                >
                  Product Details
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <SubdomainSwitcher />
                {!isAuthorized && (
                  <Link
                    href="/signin"
                    className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: theme?.primaryColor }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Product Images */}
            <div className="space-y-4">
              <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={allImages[selectedImage]}
                    alt={product.product_name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isWishlisted
                          ? "text-red-500 fill-current"
                          : "text-gray-400"
                      }`}
                      fill={isWishlisted ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>

                {allImages.length > 1 && (
                  <div className="flex justify-center space-x-2 p-4">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          selectedImage === index
                            ? "bg-blue-600"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Middle Side - Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.product_name}
                </h1>
                <p className="text-lg text-gray-600">
                  {product.brand_name} • {product.category_name}
                </p>
              </div>

              <div>
                <ClientOnly
                  fallback={
                    <div className="text-gray-700 leading-relaxed">
                      Loading description...
                    </div>
                  }
                >
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </ClientOnly>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  PACK SIZE
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPackSize(size)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium transition-colors ${
                        packSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {availableColors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    COLOUR
                  </label>
                  <div className="flex space-x-2">
                    {availableColors.map((color, index) => {
                      const colorValue = color.includes("#")
                        ? color.split(",")[1]
                        : color;
                      const colorName = color.includes("#")
                        ? color.split(",")[0]
                        : color;

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(colorName)}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedColor === colorName
                              ? "border-blue-600 ring-2 ring-blue-200"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          style={{ backgroundColor: colorValue }}
                          title={colorName}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Pricing and Actions */}
            <div className="space-y-6">
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <div className="inline-block">
                  <span
                    className="px-3 py-1 text-sm font-semibold text-white rounded-full"
                    style={{
                      backgroundColor: theme?.primaryColor || "#ef4444",
                    }}
                  >
                    {discountPercentage}% Off
                  </span>
                </div>
              )}

              {/* Pricing */}
              <div className="space-y-2">
                <ConditionalPricing
                  price={currentPrice}
                  originalPrice={originalPrice}
                  points={Math.round(currentPrice * 10)}
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  QUANTITY
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  variant="flat"
                  className="w-full h-11 md:h-12 border-2"
                  disabled={addToCartLoader}
                  loading={addToCartLoader}
                  type="button"
                  style={{
                    borderColor: theme?.primaryColor || "#1A60E3",
                    color: theme?.primaryColor || "#1A60E3",
                    backgroundColor: "transparent",
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="slim"
                  className="w-full h-11 md:h-12"
                  type="button"
                  style={{
                    backgroundColor: theme?.primaryColor || "#1A60E3",
                    borderColor: theme?.primaryColor || "#1A60E3",
                  }}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Information and Specifications */}
          <div className="mt-12 space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Additional Information
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showAdditionalInfo ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showAdditionalInfo && (
                <div className="px-6 pb-4 border-t border-gray-200">
                  <div className="pt-4 space-y-3 text-sm text-gray-600">
                    <p>
                      <strong>Product Code:</strong> {product.product_code}
                    </p>
                    <p>
                      <strong>Category:</strong> {product.category_name}
                    </p>
                    <p>
                      <strong>Brand:</strong> {product.brand_name}
                    </p>
                    <p>
                      <strong>Face Value:</strong> ₹{product.face_value_mrp}
                    </p>
                    <p>
                      <strong>Cost Price:</strong> ₹{product.cost_price_withtax}
                    </p>
                    <p>
                      <strong>Availability:</strong> In Stock
                    </p>
                    <p>
                      <strong>Shipping:</strong> Free shipping on all orders
                    </p>
                    <p>
                      <strong>Return Policy:</strong> 7-day return policy for
                      gift cards
                    </p>
                    <p>
                      <strong>Validity:</strong> 12 months from purchase date
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setShowSpecifications(!showSpecifications)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  Specifications
                </h3>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    showSpecifications ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {showSpecifications && (
                <div className="px-6 pb-4 border-t border-gray-200">
                  <div className="pt-4 space-y-3 text-sm text-gray-600">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p>
                          <strong>Gift Card Type:</strong> Digital Gift Card
                        </p>
                        <p>
                          <strong>Redemption:</strong> Online & In-store
                        </p>
                        <p>
                          <strong>Delivery:</strong> Instant via Email/SMS
                        </p>
                        <p>
                          <strong>Usage:</strong> Can be used for purchases at{" "}
                          {product.brand_name} stores
                        </p>
                        <p>
                          <strong>Partial Usage:</strong> Yes, remaining balance
                          can be used later
                        </p>
                        <p>
                          <strong>Transferable:</strong> Yes, can be gifted to
                          others
                        </p>
                        <p>
                          <strong>Expiry:</strong> 12 months from purchase date
                        </p>
                        <p>
                          <strong>Terms:</strong> Subject to{" "}
                          {product.brand_name} terms and conditions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">More Explore</h2>
              <button
                onClick={() => router.push("/search")}
                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {featuredProductsData.slice(0, 4).map((relatedProduct) => {
                const originalPrice = parseFloat(relatedProduct.face_value_mrp);
                const currentPrice = parseFloat(
                  relatedProduct.cost_price_withtax
                );
                const discountPercentage = Math.round(
                  ((originalPrice - currentPrice) / originalPrice) * 100
                );

                return (
                  <div
                    key={relatedProduct.id}
                    className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() =>
                      (window.location.href = `/product/${relatedProduct.id}`)
                    }
                  >
                    <div className="relative">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
                        <Image
                          src={relatedProduct.product_thumbnail}
                          alt={relatedProduct.product_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      {discountPercentage > 0 && (
                        <div className="absolute top-2 left-2">
                          <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded">
                            -{discountPercentage}%
                          </span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">
                      {relatedProduct.product_name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {relatedProduct.brand_name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{currentPrice}
                      </span>
                      {originalPrice > currentPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

// ProductDetailPage.Layout = Layout;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = featuredProductsData.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const productId = params?.id as string;
  const product = featuredProductsData.find((p) => p.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

export default ProductDetailPage;
