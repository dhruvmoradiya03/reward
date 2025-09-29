import CartIcon from "@components/icons/cart-icon";
import { useCart } from "@contexts/cart/cart.context";
import { useUI } from "@contexts/ui.context";
import ClientOnly from "@components/common/client-only";

export default function CartButton() {
  const { openCart } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    return openCart();
  }
  return (
    <ClientOnly
      fallback={
        <button
          className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
          aria-label="cart-button"
        >
          <CartIcon />
        </button>
      }
    >
      <button
        className="relative flex items-center justify-center flex-shrink-0 h-auto transform focus:outline-none"
        onClick={handleCartOpen}
        aria-label="cart-button"
      >
        <CartIcon />
        {totalItems > 0 && (
          <span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 rounded-full ltr:-right-2.5 ltr:xl:-right-3 rtl:-left-2.5 rtl:xl:-left-3 font-bold">
            {totalItems}
          </span>
        )}
      </button>
    </ClientOnly>
  );
}
