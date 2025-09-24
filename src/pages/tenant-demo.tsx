import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { TenantProvider } from "../contexts/tenant.context";

// Dynamically import components to avoid SSR issues
const ConditionalPricing = dynamic(
  () => import("../components/pricing/conditional-pricing"),
  { ssr: false }
);

const TenantDemoContent = dynamic(
  () => import("../components/tenant-demo-content"),
  { ssr: false }
);

const TenantDemo: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tenant Configuration Demo - Rewards Platform</title>
        <meta
          name="description"
          content="Demo of different client configurations and pricing displays"
        />
      </Head>

      <TenantProvider>
        <TenantDemoContent />
      </TenantProvider>
    </>
  );
};

export default TenantDemo;
