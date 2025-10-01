import React, { useState } from "react";
import { useRouter } from "next/router";
import isEmpty from "lodash/isEmpty";
import { useUI } from "@contexts/ui.context";
import Button from "@components/ui/button";
import Counter from "@components/common/counter";
import { useCart } from "@contexts/cart/cart.context";
import { ProductAttributes } from "@components/product/product-attributes";
import { generateCartItem } from "@utils/generate-cart-item";
import usePrice from "@framework/product/use-price";
import { getVariations } from "@framework/utils/get-variations";
import { useTranslation } from "next-i18next";
import { useTenantConfig } from "../../hooks/use-tenant-config";

const ProductPopup: React.FC = () => {
  const { t } = useTranslation("common");
  const {
    modalData: { data },
    closeModal,
    openCart,
  } = useUI();
  const router = useRouter();
  const { addItemToCart } = useCart();
  const { theme } = useTenantConfig();
  const [quantity, setQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [viewCartBtn, setViewCartBtn] = useState<boolean>(false);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  if (!data) {
    return null;
  }

  // Transform attributes to the format expected by ProductAttributes
  const transformedAttributes: { [key: string]: any } = {};
  if (data.attributes) {
    Object.keys(data.attributes).forEach((key) => {
      const [value, meta] = data.attributes[key];
      transformedAttributes[key] = [
        {
          id: 1,
          value: value,
          meta: meta || value,
        },
      ];
    });
  }

  // Map featured product data to template format
  const mappedProduct = {
    id: data.id,
    slug: data.id,
    name: data.product_name,
    description: data.description.replace(/<[^>]*>/g, ""),
    image: {
      original: data.product_thumbnail,
      thumbnail: data.product_thumbnail,
    },
    price: parseFloat(data.face_value_mrp),
    sale_price: parseFloat(data.cost_price_withtax),
    variations: transformedAttributes,
  };

  const { price, basePrice, discount } = usePrice({
    amount: mappedProduct.sale_price
      ? mappedProduct.sale_price
      : mappedProduct.price,
    baseAmount: mappedProduct.price,
    currencyCode: "USD",
  });

  const variations = getVariations(mappedProduct.variations);
  const { slug, image, name, description } = mappedProduct;

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;

  function addToCart() {
    if (!isSelected) {
      console.log("Product not selected - missing attributes");
      return;
    }

    console.log("Adding to cart:", {
      product: mappedProduct,
      attributes,
      quantity,
    });

    // to show btn feedback while product carting
    setAddToCartLoader(true);

    try {
      const item = generateCartItem(mappedProduct, attributes);
      console.log("Generated cart item:", item);

      addItemToCart(item, quantity);
      console.log("Successfully added to cart");

      setTimeout(() => {
        setAddToCartLoader(false);
        setViewCartBtn(true);
      }, 600);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddToCartLoader(false);
    }
  }

  function navigateToProductPage() {
    closeModal();
    router.push(`/product/${slug}`, undefined, {
      locale: router.locale,
    });
  }

  function handleAttribute(attribute: any) {
    setAttributes((prev) => ({
      ...prev,
      ...attribute,
    }));
  }

  function navigateToCartPage() {
    closeModal();
    setTimeout(() => {
      openCart();
    }, 300);
  }

  function buyNow() {
    if (!isSelected) {
      console.log("Product not selected - missing attributes");
      return;
    }

    console.log("Buy now:", {
      product: mappedProduct,
      attributes,
      quantity,
    });

    // Add to cart first
    try {
      const item = generateCartItem(mappedProduct, attributes);
      addItemToCart(item, quantity);
      console.log("Added to cart for buy now");

      // Close modal and navigate to cart
      closeModal();
      setTimeout(() => {
        openCart();
      }, 300);
    } catch (error) {
      console.error("Error in buy now:", error);
    }
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="flex flex-col lg:flex-row w-full md:w-[650px] lg:w-[960px] mx-auto overflow-hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-full lg:w-430px max-h-430px lg:max-h-full overflow-hidden bg-gray-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              image?.original ??
              "/assets/placeholder/products/product-thumbnail.svg"
            }
            alt={name}
            className="lg:object-cover lg:w-full lg:h-full"
          />
        </div>

        <div className="flex flex-col p-5 md:p-8 w-full">
          <div className="pb-5">
            <div className="mb-2 md:mb-2.5 block -mt-1.5">
              <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold">
                {name}
              </h2>
            </div>
            <p className="text-sm leading-6 md:text-body md:leading-7">
              {description}
            </p>

            <div className="flex items-center mt-3">
              <div className="text-heading font-semibold text-base md:text-xl lg:text-2xl">
                {price}
              </div>
              {discount && (
                <del className="font-segoe text-gray-400 text-base lg:text-xl ltr:pl-2.5 rtl:pr-2.5 -mt-0.5 md:mt-0">
                  {basePrice}
                </del>
              )}
            </div>
          </div>

          {Object.keys(variations).map((variation) => {
            return (
              <ProductAttributes
                key={`popup-attribute-key${variation}`}
                title={variation}
                attributes={variations[variation]}
                active={attributes[variation]}
                onClick={handleAttribute}
              />
            );
          })}

          <div className="pt-2 md:pt-4">
            <div className="flex items-center justify-between mb-4 gap-x-3 sm:gap-x-4">
              <Counter
                quantity={quantity}
                onIncrement={() => setQuantity((prev) => prev + 1)}
                onDecrement={() =>
                  setQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                }
                disableDecrement={quantity === 1}
              />
              <Button
                onClick={addToCart}
                variant="flat"
                className={`w-full h-11 md:h-12 px-1.5 border-2 ${
                  !isSelected && "bg-gray-400 hover:bg-gray-400"
                }`}
                disabled={!isSelected}
                loading={addToCartLoader}
                type="button"
                style={{
                  borderColor: theme?.primaryColor || "#1A60E3",
                  color: theme?.primaryColor || "#1A60E3",
                  backgroundColor: "transparent",
                }}
              >
                {t("text-add-to-cart")}
              </Button>
            </div>

            {viewCartBtn && (
              <button
                onClick={navigateToCartPage}
                type="button"
                className="w-full mb-4 h-11 md:h-12 rounded bg-gray-100 text-heading focus:outline-none border border-gray-300 transition-colors hover:bg-gray-50 focus:bg-gray-50"
              >
                {t("text-view-cart")}
              </button>
            )}

            <div className="flex gap-3 mb-4">
              <Button
                onClick={buyNow}
                variant="slim"
                className={`flex-1 h-11 md:h-12 ${
                  !isSelected && "bg-gray-400 hover:bg-gray-400"
                }`}
                disabled={!isSelected}
                type="button"
                style={{
                  backgroundColor: theme?.primaryColor || "#1A60E3",
                  borderColor: theme?.primaryColor || "#1A60E3",
                }}
              >
                {t("text-buy-now")}
              </Button>
              <Button
                onClick={navigateToProductPage}
                variant="flat"
                className="flex-1 h-11 md:h-12"
                type="button"
              >
                {t("text-view-details")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
