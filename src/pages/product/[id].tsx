import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/layout/layout";
import ProductDetailPage from "@components/product/product-detail-page";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

interface ProductPageProps {
  productId: string;
}

const ProductPage: NextPage<ProductPageProps> = ({ productId }) => {
  return (
    <Layout>
      <Head>
        <title>Product Details - Your Product</title>
        <meta
          name="description"
          content="View detailed information about this product"
        />
      </Head>
      <ProductDetailPage productId={productId} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const productId = params?.id as string;

  return {
    props: {
      productId,
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};

export default ProductPage;
