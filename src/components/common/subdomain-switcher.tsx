import React, { useState } from "react";
import { useTenantConfig } from "../../hooks/use-tenant-config";
import ClientOnly from "./client-only";

const SubdomainSwitcher: React.FC = () => {
  const { currentTenant } = useTenantConfig();
  const [isOpen, setIsOpen] = useState(false);

  const tenants = [
    { subdomain: "demo", name: "Demo Client", type: "Pay + Points" },
    { subdomain: "hdfc", name: "HDFC Bank", type: "Pay + Points" },
    { subdomain: "axis", name: "AXIS Bank", type: "Points Only" },
    { subdomain: "icici", name: "ICICI Bank", type: "Pay Only" },
  ];

  const switchToTenant = (subdomain: string) => {
    if (typeof window !== "undefined") {
      const currentHost = window.location.hostname;
      const currentPort = window.location.port;
      const protocol = window.location.protocol;

      // For localhost development - use query parameter instead
      if (currentHost === "localhost" || currentHost.includes("127.0.0.1")) {
        const newUrl = `${protocol}//localhost:${currentPort}${window.location.pathname}?client=${subdomain}`;
        window.location.href = newUrl;
      } else {
        // For production
        const newUrl = `${protocol}//${subdomain}.rewargenix.com${window.location.pathname}`;
        window.location.href = newUrl;
      }
    }
  };

  if (!currentTenant) return null;

  return (
    <ClientOnly
      fallback={
        <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
      }
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-sm font-medium">{currentTenant.name}</span>
          <svg
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
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

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Switch Tenant
              </div>
              {tenants.map((tenant) => (
                <button
                  key={tenant.subdomain}
                  onClick={() => {
                    switchToTenant(tenant.subdomain);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    currentTenant.subdomain === tenant.subdomain
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{tenant.name}</div>
                      <div className="text-xs text-gray-500">{tenant.type}</div>
                    </div>
                    {currentTenant.subdomain === tenant.subdomain && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-gray-200 p-2">
              <div className="text-xs text-gray-500">
                <div>Current: {currentTenant.subdomain}.rewargenix.com</div>
                <div>
                  Type: {currentTenant.clientConfig.paymentConfig.clientType}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
};

export default SubdomainSwitcher;
