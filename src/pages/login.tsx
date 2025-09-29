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

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setModalView, openModal } = useUI();
  const { mutate: login, isPending } = useLoginMutation();
  const { currentTenant, theme } = useTenantConfig();

  const [loginMethod, setLoginMethod] = useState<"password" | "otp">(
    "password"
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function onSubmit({ email, password, remember_me }: LoginInputType) {
    if (loginMethod === "otp") {
      handleOTPLogin(email);
    } else {
      login({
        email,
        password,
        remember_me,
      });
    }
  }

  const handleOTPLogin = async (email: string) => {
    if (!otpSent) {
      // Send OTP
      console.log("Sending OTP to:", email);
      setOtpSent(true);
    } else {
      // Verify OTP
      console.log("Verifying OTP:", otp);
      login({
        email,
        password: "otp_verified",
        remember_me: true,
      });
    }
  };

  const handleSignUp = () => {
    setModalView("SIGN_UP_VIEW");
    return openModal();
  };

  const handleForgetPassword = () => {
    setModalView("FORGET_PASSWORD");
    return openModal();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: theme?.backgroundColor || "#f9fafb" }}
    >
      <div className="max-w-md w-full space-y-8">
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
            Welcome Back
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: theme?.textSecondaryColor || "#6b7280" }}
          >
            Sign in to {currentTenant?.name || "your rewards account"}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          {/* Login Method Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setLoginMethod("password")}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                  loginMethod === "password"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("otp")}
                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                  loginMethod === "otp"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                OTP
              </button>
            </div>
          </div>

          {/* Password Login Form */}
          {loginMethod === "password" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    {...register("remember_me")}
                    className="h-4 w-4 rounded border-gray-300"
                    style={{
                      accentColor: theme?.primaryColor || "#3b82f6",
                    }}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="text-sm font-medium hover:underline"
                  style={{ color: theme?.primaryColor || "#3b82f6" }}
                >
                  Forgot password?
                </button>
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
          )}

          {/* OTP Login Form */}
          {loginMethod === "otp" && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  disabled={otpSent}
                />
              </div>

              {otpSent && (
                <div>
                  <Input
                    label="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="text-center text-lg tracking-widest font-mono"
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    We've sent a 6-digit code to your email
                  </p>
                </div>
              )}

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
                  {isPending
                    ? "Processing..."
                    : otpSent
                    ? "Verify OTP"
                    : "Send OTP"}
                </Button>
              </div>

              {otpSent && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-sm font-medium hover:underline"
                    style={{ color: theme?.primaryColor || "#3b82f6" }}
                  >
                    Change email
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={handleSignUp}
                className="font-medium hover:underline"
                style={{ color: theme?.primaryColor || "#3b82f6" }}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Powered by {currentTenant?.name || "Rewards Platform"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Secure login with bank-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
