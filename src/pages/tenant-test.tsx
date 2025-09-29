import React, { useEffect, useState } from "react";
import { useTenantConfig } from "../hooks/use-tenant-config";
import ClientOnly from "../components/common/client-only";
import SubdomainSwitcher from "../components/common/subdomain-switcher";
import Link from "next/link";

const TenantTest: React.FC = () => {
  const { currentTenant, theme, isLoading } = useTenantConfig();
  const [urlInfo, setUrlInfo] = useState<{
    hostname: string;
    search: string;
    pathname: string;
  }>({ hostname: "", search: "", pathname: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrlInfo({
        hostname: window.location.hostname,
        search: window.location.search,
        pathname: window.location.pathname,
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tenant configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">
                Tenant Configuration Test
              </h1>
            </div>
            <SubdomainSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ClientOnly
          fallback={
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          }
        >
          <div className="space-y-6">
            {/* URL Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Current URL Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hostname
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {urlInfo.hostname}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Search Params
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{urlInfo.search}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pathname
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {urlInfo.pathname}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Tenant Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Current Tenant Configuration
              </h2>
              {currentTenant ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Basic Information
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Name:
                          </span>{" "}
                          <span className="text-sm text-gray-900">
                            {currentTenant.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Subdomain:
                          </span>{" "}
                          <span className="text-sm text-gray-900">
                            {currentTenant.subdomain}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Domain:
                          </span>{" "}
                          <span className="text-sm text-gray-900">
                            {currentTenant.domain}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Payment Configuration
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Client Type:
                          </span>{" "}
                          <span
                            className="text-sm font-semibold px-2 py-1 rounded"
                            style={{
                              backgroundColor: theme?.primaryColor + "20",
                              color: theme?.primaryColor,
                            }}
                          >
                            {
                              currentTenant.clientConfig.paymentConfig
                                .clientType
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Payment Gateway:
                          </span>{" "}
                          <span className="text-sm text-gray-900">
                            {currentTenant.clientConfig.paymentConfig
                              .paymentGateway?.provider || "None"}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Points Enabled:
                          </span>{" "}
                          <span className="text-sm text-gray-900">
                            {currentTenant.clientConfig.pointsConfig.isEnabled
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Theme Colors
                    </h3>
                    <div className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{
                            backgroundColor: theme?.primaryColor,
                          }}
                        ></div>
                        <span className="text-sm text-gray-700">Primary</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{
                            backgroundColor: theme?.secondaryColor,
                          }}
                        ></div>
                        <span className="text-sm text-gray-700">Secondary</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{
                            backgroundColor: theme?.accentColor,
                          }}
                        ></div>
                        <span className="text-sm text-gray-700">Accent</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No tenant configuration loaded</p>
              )}
            </div>

            {/* Test URLs */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Test Different Clients
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a
                  href="/?client=demo"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">Demo Client</h3>
                  <p className="text-sm text-gray-600">Pay + Points</p>
                </a>
                <a
                  href="/?client=hdfc"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">HDFC Bank</h3>
                  <p className="text-sm text-gray-600">Pay + Points</p>
                </a>
                <a
                  href="/?client=axis"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">AXIS Bank</h3>
                  <p className="text-sm text-gray-600">Points Only</p>
                </a>
                <a
                  href="/?client=icici"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">ICICI Bank</h3>
                  <p className="text-sm text-gray-600">Pay Only</p>
                </a>
              </div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
  );
};

export default TenantTest;
