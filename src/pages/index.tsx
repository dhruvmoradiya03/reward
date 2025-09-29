import Container from "@components/ui/container";
import Layout from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
import BannerSliderBlock from "@containers/banner-slider-block";
import FeaturedExperiences from "@containers/featured-experiences";
import UnifiedCategoryBlock from "../containers/unified-category-block";
import SubdomainSwitcher from "@components/common/subdomain-switcher";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useTenantConfig } from "../hooks/use-tenant-config";
import { useUI } from "@contexts/ui.context";
import ClientOnly from "@components/common/client-only";
import { useEffect, useState } from "react";
import ClientCatalog from "@components/catalog/client-catalog";

export default function Home() {
  const { currentTenant, theme } = useTenantConfig();
  const { isAuthorized } = useUI();
  const [subdomain, setSubdomain] = useState<string>("demo");

  // Detect subdomain on client-side and listen for URL changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateSubdomain = () => {
        const hostname = window.location.hostname;
        if (hostname === "localhost" || hostname.includes("127.0.0.1")) {
          // Check query parameter for localhost
          const urlParams = new URLSearchParams(window.location.search);
          const clientParam = urlParams.get("client");
          if (clientParam) {
            setSubdomain(clientParam);
          } else {
            setSubdomain("demo");
          }
        } else {
          const parts = hostname.split(".");
          if (parts.length >= 3) {
            setSubdomain(parts[0]);
          } else {
            setSubdomain("demo");
          }
        }
      };

      // Initial detection
      updateSubdomain();

      // Listen for URL changes
      const handleUrlChange = () => {
        updateSubdomain();
      };

      window.addEventListener("popstate", handleUrlChange);

      // Listen for pushstate/replacestate
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      window.history.pushState = function (...args) {
        originalPushState.apply(window.history, args);
        handleUrlChange();
      };

      window.history.replaceState = function (...args) {
        originalReplaceState.apply(window.history, args);
        handleUrlChange();
      };

      return () => {
        window.removeEventListener("popstate", handleUrlChange);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, []);

  return (
    <>
      {/* Client-Specific Welcome Banner */}
      <ClientOnly
        fallback={
          <div className="bg-gray-100 border-b border-gray-200 py-4">
            <Container>
              <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
            </Container>
          </div>
        }
      >
        <div
          className="border-b py-6"
          style={{
            backgroundColor: theme?.backgroundColor || "#f8fafc",
            borderColor: theme?.primaryColor + "20" || "#e2e8f0",
          }}
        >
          <Container>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: theme?.primaryColor || "#3b82f6" }}
                >
                  {currentTenant?.name?.charAt(0) || "D"}
                </div>
                <div>
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: theme?.textColor || "#1f2937" }}
                  >
                    Welcome to {currentTenant?.name || "Demo"} Rewards
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: theme?.textSecondaryColor || "#6b7280" }}
                  >
                    {isAuthorized
                      ? "Browse your personalized catalog"
                      : "Please login to access your rewards"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SubdomainSwitcher />
                {!isAuthorized && (
                  <Link
                    href="/signin"
                    className="px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: theme?.primaryColor || "#3b82f6",
                    }}
                  >
                    Login
                  </Link>
                )}
                <Link
                  href="/tenant-demo"
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  View Demo
                </Link>
              </div>
            </div>

            {/* Client Configuration Info */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Client Type</h4>
                <p className="text-sm text-gray-600">
                  {currentTenant?.clientConfig?.paymentConfig?.clientType ||
                    "Pay + Points"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">
                  Payment Options
                </h4>
                <p className="text-sm text-gray-600">
                  {currentTenant?.clientConfig?.paymentConfig?.clientType ===
                  "only-points"
                    ? "Points Only"
                    : currentTenant?.clientConfig?.paymentConfig?.clientType ===
                      "only-pay"
                    ? "Pay Only"
                    : "Points + Pay"}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-medium text-gray-900 mb-2">Subdomain</h4>
                <p className="text-sm text-gray-600">
                  {subdomain}.rewargenix.com
                </p>
              </div>
            </div>
          </Container>
        </div>
      </ClientOnly>

      {/* Client-Specific Catalog */}
      <ClientCatalog className="py-12" />

      <BannerBlock data={masonryBanner} />

      <Container>
        {/* Unified Category Block with Dynamic Categories */}
        <UnifiedCategoryBlock
          sectionHeading="text-shop-by-category"
          useDynamicCategories={true}
          dynamicCategoriesLimit={4}
        />
        {/* <ProductsFlashSaleBlock date={"2025-12-01T01:02:03"} /> */}
        <BannerWithProducts
          sectionHeading="text-featured-products"
          categorySlug="/search"
        />
      </Container>
      <BannerSliderBlock />
      <Container>
        {/* <ProductsFeatured sectionHeading="text-featured-products" limit={5} /> */}
        {/* <BannerWithProducts
          sectionHeading="text-featured-products"
          categorySlug="/search"
        /> */}
        {/* Deal of the Day Section */}
        {/* Featured Experiences Section */}
        <FeaturedExperiences
          sectionHeading="Featured Experiences"
          className="mb-12"
        />
        {/* <BannerCard
          key={`banner--key${banner[1].id}`}
          banner={banner[1]}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        /> */}
        {/* Featured Gift Cards Section */}
        {/* <FeaturedGiftCards
          sectionHeading="Featured Gift Cards"
          className="mb-12"
        /> */}
        {/* 
        <BannerCard
          key={`banner--key${banner[0].id}`}
          banner={banner[0]}
          href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        /> */}
        {/* <DealOfTheDay sectionHeading="Deal of the day" className="mb-12" /> */}
        {/* ---------------------------- */}
        {/* <BrandGridBlock sectionHeading="text-top-brands" /> */}
        {/* <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
        /> */}
        {/* <ExclusiveBlock /> */}
        {/* <NewArrivalsProductFeed /> */}
        {/* <DownloadApps /> */}
        {/* <Support />  */}
        {/* <Instagram /> */}
        {/* <Subscription className="px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16" /> */}
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

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
