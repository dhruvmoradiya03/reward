import Cart from "@components/cart/cart";
import CartMobile from "@components/cart/cart-mobile";
import { useUI } from "@contexts/ui.context";
import { Drawer } from "@components/common/drawer/drawer";
import { useRouter } from "next/router";
import { getDirection } from "@utils/get-direction";
import motionProps from "@components/common/drawer/motion";
import { useState, useEffect } from "react";

const ManagedDrawer = () => {
  const { displayCart, closeCart } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const [isMobile, setIsMobile] = useState(false);
  const contentWrapperCSS = dir === "ltr" ? { right: 0 } : { left: 0 };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Drawer
      open={displayCart}
      placement={dir === "rtl" ? "left" : "right"}
      onClose={closeCart}
      styles={{
        wrapper: contentWrapperCSS,
      }}
      {...motionProps}
    >
      {isMobile ? <CartMobile /> : <Cart />}
    </Drawer>
  );
};

export default ManagedDrawer;
