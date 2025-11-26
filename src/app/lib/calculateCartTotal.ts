import { CartItem } from "../context/CartContext";

export const calculateCartTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    const productTotal =
      (item.productData?.finalPrice || 0) * (item.quantity || 0);

    const addonsTotal = (item.addonProducts || []).reduce((sum, addon) => {
      return sum + (addon.finalPrice || 0) * (addon.quantity || 0);
    }, 0);

    return total + productTotal + addonsTotal;
  }, 0);
};
