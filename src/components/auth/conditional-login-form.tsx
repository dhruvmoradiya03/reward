import React, { useState } from "react";
import { useTenantConfig } from "../../hooks/use-tenant-config";
import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import { useUI } from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import { ImGoogle2, ImFacebook2 } from "react-icons/im";
import { useTranslation } from "next-i18next";

interface ConditionalLoginFormProps {
  className?: string;
}

const ConditionalLoginForm: React.FC<ConditionalLoginFormProps> = ({
  className = "",
}) => {
  const { t } = useTranslation();
  const { setModalView, openModal, closeModal } = useUI();
  const { mutate: login, isPending } = useLoginMutation();
  const {
    features,
    clientInfo,
    shouldShowOTPLogin,
    shouldShowPasswordLogin,
    shouldShowSSOLogin,
    shouldShowRegistration,
  } = useTenantConfig();

  const [loginMethod, setLoginMethod] = useState<"otp" | "password" | "sso">(
    "password"
  );
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  const shouldShowOTP = features?.user.showOTPLogin ?? true;
  const shouldShowPassword = features?.user.showPasswordLogin ?? true;
  const shouldShowSSO = features?.user.showSSOLogin ?? false;
  const shouldShowReg = features?.user.showRegistration ?? true;

  function onSubmit({ email, password, remember_me }: LoginInputType) {
    if (loginMethod === "otp") {
      // Handle OTP login
      handleOTPLogin(email);
    } else {
      // Handle password login
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
      try {
        // Simulate OTP sending
        console.log("Sending OTP to:", email);
        setOtpSent(true);
        // In real app, call API to send OTP
      } catch (error) {
        console.error("OTP sending failed:", error);
      }
    } else {
      // Verify OTP
      try {
        console.log("Verifying OTP:", otp);
        // In real app, call API to verify OTP
        login({
          email,
          password: "otp_verified", // Special flag for OTP login
          remember_me: true,
        });
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    }
  };

  const handleSSOLogin = (provider: "google" | "facebook") => {
    console.log(`SSO login with ${provider}`);
    // In real app, redirect to SSO provider
  };

  function handleSignUp() {
    if (shouldShowReg) {
      setModalView("SIGN_UP_VIEW");
      return openModal();
    }
  }

  function handleForgetPassword() {
    setModalView("FORGET_PASSWORD");
    return openModal();
  }

  return (
    <div className={`conditional-login-form ${className}`}>
      {/* Client-specific branding */}
      <div className="text-center mb-6">
        <Logo className="mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome to {clientInfo?.name}
        </h2>
        <p className="text-gray-600 mt-2">Sign in to your rewards account</p>
      </div>

      {/* Login Method Selection */}
      {(shouldShowOTP || shouldShowPassword || shouldShowSSO) && (
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {shouldShowPassword && (
              <button
                type="button"
                onClick={() => setLoginMethod("password")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  loginMethod === "password"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Password
              </button>
            )}
            {shouldShowOTP && (
              <button
                type="button"
                onClick={() => setLoginMethod("otp")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  loginMethod === "otp"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                OTP
              </button>
            )}
            {shouldShowSSO && (
              <button
                type="button"
                onClick={() => setLoginMethod("sso")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  loginMethod === "sso"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                SSO
              </button>
            )}
          </div>
        </div>
      )}

      {/* Password Login Form */}
      {loginMethod === "password" && shouldShowPassword && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />
          <PasswordInput
            label="Password"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("remember_me")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </button>
          </div>
          <Button type="submit" loading={isPending} className="w-full">
            Sign In
          </Button>
        </form>
      )}

      {/* OTP Login Form */}
      {loginMethod === "otp" && shouldShowOTP && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
            disabled={otpSent}
          />
          {otpSent && (
            <Input
              label="Enter OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
            />
          )}
          <Button type="submit" loading={isPending} className="w-full">
            {otpSent ? "Verify OTP" : "Send OTP"}
          </Button>
          {otpSent && (
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Change email
            </button>
          )}
        </form>
      )}

      {/* SSO Login Options */}
      {loginMethod === "sso" && shouldShowSSO && (
        <div className="space-y-4">
          <Button
            type="button"
            onClick={() => handleSSOLogin("google")}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ImGoogle2 className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          <Button
            type="button"
            onClick={() => handleSSOLogin("facebook")}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <ImFacebook2 className="w-5 h-5 mr-2" />
            Continue with Facebook
          </Button>
        </div>
      )}

      {/* Registration Link */}
      {shouldShowReg && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleSignUp}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      )}

      {/* Client-specific footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>Powered by {clientInfo?.name}</p>
        <p>Secure login with bank-grade security</p>
      </div>
    </div>
  );
};

export default ConditionalLoginForm;
