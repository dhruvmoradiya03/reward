import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTenantConfig } from "../hooks/use-tenant-config";

interface RedirectParams {
  tenant?: string;
  user_id?: string;
  token?: string;
  return_url?: string;
}

const RedirectHandler: React.FC = () => {
  const router = useRouter();
  const { currentTenant, isLoading } = useTenantConfig();
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [message, setMessage] = useState("Processing redirect...");

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const { tenant, user_id, token, return_url } =
          router.query as RedirectParams;

        // Validate required parameters
        if (!tenant) {
          throw new Error("Tenant parameter is required");
        }

        // Store user session data
        if (user_id && token) {
          localStorage.setItem("user_id", user_id as string);
          localStorage.setItem("auth_token", token as string);
          localStorage.setItem("tenant", tenant as string);
        }

        // Set success message
        setStatus("success");
        setMessage(`Successfully redirected to ${tenant} tenant`);

        // Redirect to return URL or home page
        const redirectUrl = return_url || "/";

        setTimeout(() => {
          router.push(redirectUrl as string);
        }, 2000);
      } catch (error) {
        console.error("Redirect error:", error);
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Redirect failed");
      }
    };

    if (router.isReady) {
      handleRedirect();
    }
  }, [router.isReady, router.query, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tenant configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === "processing" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <h2 className="text-xl font-semibold text-gray-900 mt-4">
              Processing Redirect
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-gray-900">
              Redirect Successful
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-sm text-gray-500 mt-4">
              Redirecting to your dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="text-red-600 text-4xl mb-4">✗</div>
            <h2 className="text-xl font-semibold text-gray-900">
              Redirect Failed
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Home
            </button>
          </>
        )}

        {currentTenant && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">Current Tenant</h3>
            <p className="text-sm text-gray-600">{currentTenant.name}</p>
            <p className="text-xs text-gray-500">
              {currentTenant.subdomain}.rewargenix.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedirectHandler;
