import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import Subscription from "@components/common/subscription";
import ShopDiscount from "@components/shop/discount";
import { ShopFilters } from "@components/shop/filters";
import StickyBox from "react-sticky-box";
import SearchTopBar from "@components/shop/top-bar";
import ActiveLink from "@components/ui/active-link";
import { BreadcrumbItems } from "@components/common/breadcrumb";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";
import FeaturedProductGrid from "@components/product/featured-product-grid";

const FeaturedProductsPage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>Featured Products - Discover Amazing Products</title>
        <meta
          name="description"
          content="Browse our featured products collection with the latest and most popular items"
        />
      </Head>

      <ShopDiscount />
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 ltr:pr-24 rtl:pl-24 hidden lg:block w-96">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <div className="pb-7">
                <BreadcrumbItems separator="/">
                  <ActiveLink
                    href={"/"}
                    activeClassName="font-semibold text-heading"
                  >
                    {t("breadcrumb-home")}
                  </ActiveLink>
                  <ActiveLink
                    href={ROUTES.PRODUCT}
                    activeClassName="font-semibold text-heading"
                    className="capitalize"
                  >
                    Featured Products
                  </ActiveLink>
                </BreadcrumbItems>
              </div>
              <ShopFilters />
            </StickyBox>
          </div>

          <div className="w-full ltr:lg:-ml-9 rtl:lg:-mr-9">
            <SearchTopBar />
            <FeaturedProductGrid />
          </div>
        </div>
        <Subscription />
      </Container>
    </>
  );
};

FeaturedProductsPage.Layout = Layout;

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

export default FeaturedProductsPage;
