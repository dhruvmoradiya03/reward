import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTenantConfig } from "../hooks/use-tenant-config";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";

const TestLogin: React.FC = () => {
  const router = useRouter();
  const { setModalView, openModal } = useUI();
  const { mutate: login, isPending } = useLoginMutation();
  const { currentTenant, theme } = useTenantConfig();

  const [selectedUser, setSelectedUser] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginInputType>();

  // Test users for different scenarios
  const testUsers = [
    {
      id: "demo-user",
      name: "Demo User",
      email: "demo@demo.com",
      password: "demo123",
      role: "Customer",
      points: 5000,
      description: "Standard demo user",
    },
    {
      id: "hdfc-user",
      name: "HDFC Customer",
      email: "customer@hdfc.com",
      password: "hdfc123",
      role: "HDFC Customer",
      points: 15000,
      description: "HDFC Bank customer with points",
    },
    {
      id: "axis-user",
      name: "AXIS Customer",
      email: "customer@axis.com",
      password: "axis123",
      role: "AXIS Customer",
      points: 25000,
      description: "AXIS Bank customer with Edge Rewards",
    },
    {
      id: "icici-user",
      name: "ICICI Customer",
      email: "customer@icici.com",
      password: "icici123",
      role: "ICICI Customer",
      points: 0,
      description: "ICICI Bank customer (no points)",
    },
    {
      id: "admin-user",
      name: "Admin User",
      email: "admin@rewargenix.com",
      password: "admin123",
      role: "Admin",
      points: 100000,
      description: "System administrator",
    },
  ];

  function onSubmit({ email, password, remember_me }: LoginInputType) {
    console.log("Login attempt:", { email, password, remember_me });

    // Simulate login success
    login({
      email,
      password,
      remember_me,
    });
  }

  const handleUserSelect = (user: (typeof testUsers)[0]) => {
    setSelectedUser(user.id);
    setValue("email", user.email);
    setValue("password", user.password);
  };

  const handleQuickLogin = (user: (typeof testUsers)[0]) => {
    setValue("email", user.email);
    setValue("password", user.password);

    // Auto-submit the form
    setTimeout(() => {
      login({
        email: user.email,
        password: user.password,
        remember_me: true,
      });
    }, 100);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme?.backgroundColor || "#f9fafb" }}
    >
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div
            className="mx-auto h-16 w-16 flex items-center justify-center rounded-full mb-4"
            style={{ backgroundColor: theme?.primaryColor || "#3b82f6" }}
          >
            <Logo className="h-8 w-8 text-white" />
          </div>
          <h2
            className="text-3xl font-bold"
            style={{ color: theme?.textColor || "#111827" }}
          >
            Test Login System
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: theme?.textSecondaryColor || "#6b7280" }}
          >
            Test with different user accounts for{" "}
            {currentTenant?.name || "Rewards Platform"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Users Panel */}
          <div className="bg-white py-6 px-6 shadow-xl rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Test Users</h3>
            <div className="space-y-3">
              {testUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedUser === user.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        {user.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {user.points.toLocaleString()} pts
                      </div>
                      <div className="text-xs text-gray-500">{user.role}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickLogin(user);
                      }}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Quick Login
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setValue("email", user.email);
                        setValue("password", user.password);
                      }}
                      className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Fill Form
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white py-6 px-6 shadow-xl rounded-2xl border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Manual Login</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>

              <div>
                <PasswordInput
                  label="Password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={errors.password?.message}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("remember_me")}
                  className="h-4 w-4 rounded border-gray-300"
                  style={{
                    accentColor: theme?.primaryColor || "#3b82f6",
                  }}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </div>

              <div>
                <Button
                  type="submit"
                  loading={isPending}
                  className="w-full py-3 text-base font-medium"
                  style={{
                    backgroundColor: theme?.primaryColor || "#3b82f6",
                    color: "white",
                  }}
                >
                  {isPending ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>

            {/* Current Tenant Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Current Tenant</h4>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Name:</strong> {currentTenant?.name}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  {currentTenant?.clientConfig.paymentConfig.clientType}
                </p>
                <p>
                  <strong>Points Enabled:</strong>{" "}
                  {currentTenant?.clientConfig.pointsConfig.isEnabled
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  <strong>Payment Enabled:</strong>{" "}
                  {currentTenant?.clientConfig.paymentConfig.paymentGateway
                    .isActive
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">How to Test:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>
              • <strong>Quick Login:</strong> Click "Quick Login" to
              automatically sign in with that user
            </li>
            <li>
              • <strong>Fill Form:</strong> Click "Fill Form" to populate the
              login form with user credentials
            </li>
            <li>
              • <strong>Manual Login:</strong> Enter any email/password manually
            </li>
            <li>
              • <strong>Switch Tenants:</strong> Use the subdomain switcher on
              the homepage to test different bank configurations
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Test Login System for {currentTenant?.name || "Rewards Platform"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            All test users have password: [username]123
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestLogin;
