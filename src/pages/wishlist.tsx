import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/layout/layout";
// import Container from "@components/ui/container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import WishlistGrid from "@components/wishlist/wishlist-grid";

const WishlistPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Wishlist - Your Saved Items</title>
        <meta
          name="description"
          content="View and manage your wishlist items"
        />
      </Head>

      <WishlistGrid />
    </Layout>
  );
};

// WishlistPage.Layout = Layout;

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

export default WishlistPage;
