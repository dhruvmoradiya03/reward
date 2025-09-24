import React from "react";
import { useUI } from "@contexts/ui.context";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import Link from "@components/ui/link";

interface AccountButtonProps {
  className?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ className = "" }) => {
  const { isAuthorized, openModal, setModalView } = useUI();
  const { t } = useTranslation("common");

  const handleLogin = () => {
    setModalView("LOGIN_VIEW");
    return openModal();
  };

  // Get user initials (you can customize this based on your user data)
  const getUserInitials = () => {
    // This would typically come from user context or props
    // For now, using a default "SB" as shown in your image
    return "SB";
  };

  if (isAuthorized) {
    // Show circular account button with user initials
    return (
      <Link href={ROUTES.ACCOUNT} className={`${className}`}>
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
          <span className="text-white font-bold text-sm">
            {getUserInitials()}
          </span>
        </div>
      </Link>
    );
  }

  // Show login button for non-authorized users
  return (
    <button
      onClick={handleLogin}
      className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 ${className}`}
      aria-label="Login"
    >
      <svg
        className="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </button>
  );
};

export default AccountButton;
