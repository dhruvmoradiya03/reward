import React from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Layout from "@components/layout/layout";
import Container from "@components/ui/container";
import FeaturedGiftCards from "@components/gift-cards/featured-gift-cards";
import { ROUTES } from "@utils/routes";
import Link from "@components/ui/link";

export default function GiftCardsDemoPage() {
  const { t } = useTranslation("common");

  return (
    <>
      <Container>
        <div className="py-8 md:py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("Gift Cards Demo")}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {t("Discover amazing gift cards with exclusive discounts")}
            </p>

            {/* Navigation Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ROUTES.GIFT_CARDS}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                View All Gift Cards
              </Link>
              <Link
                href={ROUTES.HOME}
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Featured Gift Cards Section */}
          <FeaturedGiftCards />
        </div>
      </Container>
    </>
  );
}

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
