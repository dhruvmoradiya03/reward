import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import BrandGridBlock from "@containers/brand-grid-block";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
import BannerSliderBlock from "@containers/banner-slider-block";
import FeaturedExperiences from "@containers/featured-experiences";
import FeaturedGiftCards from "../components/gift-cards/featured-gift-cards";
import DealOfTheDay from "../components/deal-of-the-day/deal-of-the-day";
import UnifiedCategoryBlock from "../containers/unified-category-block";
import { homeThreeBanner as banner } from "@framework/static/banner";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";

export default function Home() {
  return (
    <>
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

        <BannerCard
          key={`banner--key${banner[1].id}`}
          banner={banner[1]}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        {/* Featured Gift Cards Section */}
        <FeaturedGiftCards
          sectionHeading="Featured Gift Cards"
          className="mb-12"
        />

        <BannerCard
          key={`banner--key${banner[0].id}`}
          banner={banner[0]}
          href={`${ROUTES.COLLECTIONS}/${banner[0].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <DealOfTheDay sectionHeading="Deal of the day" className="mb-12" />
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
