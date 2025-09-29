import React from "react";
import { useTenantConfig } from "../../hooks/use-tenant-config";
import { useUI } from "@contexts/ui.context";
import ClientOnly from "@components/common/client-only";
import Container from "@components/ui/container";

interface ClientCatalogProps {
  className?: string;
}

const ClientCatalog: React.FC<ClientCatalogProps> = ({ className = "" }) => {
  const { currentTenant, theme } = useTenantConfig();
  const { isAuthorized } = useUI();

  // Sample catalog data based on client type
  const getCatalogData = () => {
    const clientType = currentTenant?.clientConfig?.paymentConfig?.clientType;

    switch (clientType) {
      case "Points Only":
        return {
          title: "Points Redemption Catalog",
          description: "Redeem your points for amazing rewards",
          items: [
            {
              id: 1,
              name: "Amazon Gift Card",
              points: 1000,
              image: "/assets/images/products/amazon-gift.jpg",
            },
            {
              id: 2,
              name: "Flipkart Voucher",
              points: 1500,
              image: "/assets/images/products/flipkart-voucher.jpg",
            },
            {
              id: 3,
              name: "Uber Credits",
              points: 800,
              image: "/assets/images/products/uber-credits.jpg",
            },
            {
              id: 4,
              name: "Netflix Subscription",
              points: 2000,
              image: "/assets/images/products/netflix.jpg",
            },
          ],
        };

      case "Pay Only":
        return {
          title: "Premium Products Catalog",
          description: "Shop with exclusive bank offers",
          items: [
            {
              id: 1,
              name: "iPhone 15 Pro",
              price: 99999,
              discount: 10,
              image: "/assets/images/products/iphone.jpg",
            },
            {
              id: 2,
              name: "Samsung Galaxy S24",
              price: 79999,
              discount: 15,
              image: "/assets/images/products/samsung.jpg",
            },
            {
              id: 3,
              name: "MacBook Air M2",
              price: 89999,
              discount: 5,
              image: "/assets/images/products/macbook.jpg",
            },
            {
              id: 4,
              name: "Sony WH-1000XM5",
              price: 29999,
              discount: 20,
              image: "/assets/images/products/sony-headphones.jpg",
            },
          ],
        };

      default: // Pay + Points
        return {
          title: "Rewards & Products Catalog",
          description: "Redeem points or pay for amazing products",
          items: [
            {
              id: 1,
              name: "Amazon Gift Card",
              points: 1000,
              price: 1000,
              image: "/assets/images/products/amazon-gift.jpg",
            },
            {
              id: 2,
              name: "iPhone 15 Pro",
              price: 99999,
              points: 50000,
              image: "/assets/images/products/iphone.jpg",
            },
            {
              id: 3,
              name: "Uber Credits",
              points: 800,
              price: 800,
              image: "/assets/images/products/uber-credits.jpg",
            },
            {
              id: 4,
              name: "MacBook Air M2",
              price: 89999,
              points: 45000,
              image: "/assets/images/products/macbook.jpg",
            },
          ],
        };
    }
  };

  const catalogData = getCatalogData();

  if (!isAuthorized) {
    return (
      <Container className={className}>
        <div className="text-center py-12">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme?.primaryColor + "20" || "#e0f2fe" }}
          >
            <svg
              className="w-8 h-8"
              style={{ color: theme?.primaryColor || "#3b82f6" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3
            className="text-xl font-semibold mb-2"
            style={{ color: theme?.textColor || "#1f2937" }}
          >
            Login Required
          </h3>
          <p
            className="text-sm mb-6"
            style={{ color: theme?.textSecondaryColor || "#6b7280" }}
          >
            Please login to view your personalized catalog
          </p>
          <a
            href="/signin"
            className="inline-flex items-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: theme?.primaryColor || "#3b82f6" }}
          >
            Login Now
          </a>
        </div>
      </Container>
    );
  }

  return (
    <ClientOnly
      fallback={
        <Container className={className}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg h-64 animate-pulse"
              ></div>
            ))}
          </div>
        </Container>
      }
    >
      <Container className={className}>
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: theme?.textColor || "#1f2937" }}
          >
            {catalogData.title}
          </h2>
          <p
            className="text-lg"
            style={{ color: theme?.textSecondaryColor || "#6b7280" }}
          >
            {catalogData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {catalogData.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <div
                  className="w-full h-48 bg-gray-200 flex items-center justify-center"
                  style={{
                    backgroundColor: theme?.backgroundColor + "40" || "#f3f4f6",
                  }}
                >
                  <span className="text-4xl">📱</span>
                </div>
              </div>
              <div className="p-4">
                <h3
                  className="font-semibold text-lg mb-2"
                  style={{ color: theme?.textColor || "#1f2937" }}
                >
                  {item.name}
                </h3>

                {/* Payment Options */}
                <div className="space-y-2">
                  {item.points && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Points:</span>
                      <span
                        className="font-semibold"
                        style={{ color: theme?.primaryColor || "#3b82f6" }}
                      >
                        {item.points.toLocaleString()} pts
                      </span>
                    </div>
                  )}

                  {item.price && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Price:</span>
                      <div className="text-right">
                        <span className="font-semibold text-lg">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.discount && (
                          <span className="text-sm text-green-600 ml-2">
                            ({item.discount}% off)
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="w-full mt-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: theme?.primaryColor || "#3b82f6" }}
                >
                  {item.points && item.price
                    ? "Choose Option"
                    : item.points
                    ? "Redeem Points"
                    : "Buy Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default ClientCatalog;
