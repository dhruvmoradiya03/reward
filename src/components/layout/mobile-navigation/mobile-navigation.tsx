import Link from "@components/ui/link";
import SearchIcon from "@components/icons/search-icon";
import MenuIcon from "@components/icons/menu-icon";
import HomeIcon from "@components/icons/home-icon";
import WishIcon from "@components/icons/wish-icon";
import CartIcon from "@components/icons/cart-icon";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import dynamic from "next/dynamic";
import { Drawer } from "@components/common/drawer/drawer";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import { useCart } from "@contexts/cart/cart.context";

const MobileMenu = dynamic(
  () => import("@components/layout/header/mobile-menu")
);

const BottomNavigation: React.FC = () => {
  const { openSidebar, closeSidebar, displaySidebar, openSearch } = useUI();

  const { totalItems } = useCart();
  const router = useRouter();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };

  // Check if current route is active
  const isActive = (path: string) => {
    if (path === ROUTES.HOME && router.pathname === ROUTES.HOME) return true;
    if (path === ROUTES.WISHLIST && router.pathname === ROUTES.WISHLIST)
      return true;
    if (path === ROUTES.SEARCH && router.pathname === ROUTES.SEARCH)
      return true;
    if (path === "/cart" && router.pathname.includes("cart")) return true;
    if (path === "/menu" && router.pathname.includes("menu")) return true;
    return false;
  };

  function handleMobileMenu() {
    return openSidebar();
  }

  function handleWishlist() {
    router.push(ROUTES.WISHLIST);
  }

  return (
    <>
      <div className="lg:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-gray-700 body-font bg-white w-full h-20 px-4 md:px-8">
        {/* Home */}
        <Link
          href={ROUTES.HOME}
          className={`flex flex-col items-center justify-center flex-shrink-0 ${
            isActive(ROUTES.HOME) ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div className="flex flex-col items-center">
            <HomeIcon className="w-4 h-5" />
            <span className="text-xs mt-1 font-medium">Home</span>
          </div>
        </Link>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className={`flex flex-col items-center justify-center flex-shrink-0 ${
            isActive(ROUTES.WISHLIST) ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <WishIcon
            color={isActive(ROUTES.WISHLIST) ? "#2563eb" : "#9ca3af"}
            className="w-5 h-5"
          />
          <span className="text-xs mt-1 font-medium">Wishlist</span>
        </button>

        {/* Search */}
        <button
          onClick={openSearch}
          className={`flex flex-col items-center justify-center flex-shrink-0 ${
            isActive(ROUTES.SEARCH) ? "text-blue-600" : "text-gray-400"
          }`}
          aria-label="search-button"
        >
          <SearchIcon />
          <span className="text-xs mt-1 font-medium">Search</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => {
            // TODO: Implement cart open functionality
            console.log("Cart clicked");
          }}
          className={`flex flex-col items-center justify-center flex-shrink-0 relative ${
            isActive("/cart") ? "text-blue-600" : "text-gray-400"
          }`}
          aria-label="cart-button"
        >
          <CartIcon />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
          <span className="text-xs mt-1 font-medium">Cart</span>
        </button>

        {/* Menu */}
        <button
          onClick={handleMobileMenu}
          className={`flex flex-col items-center justify-center flex-shrink-0 ${
            isActive("/menu") ? "text-blue-600" : "text-gray-400"
          }`}
          aria-label="Menu"
        >
          <MenuIcon />
          <span className="text-xs mt-1 font-medium">Menu</span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        placement={dir === "rtl" ? "right" : "left"}
        open={displaySidebar}
        onClose={closeSidebar}
        styles={{
          wrapper: contentWrapperCSS,
        }}
        {...motionProps}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default BottomNavigation;
