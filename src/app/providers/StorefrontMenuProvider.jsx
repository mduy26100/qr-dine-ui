import React, { createContext, useCallback, useMemo, useState } from "react";

const StorefrontMenuContext = createContext(null);

export { StorefrontMenuContext };

export const StorefrontMenuProvider = ({ children }) => {
  const [menuCategories, setMenuCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const setMenu = useCallback((categories) => {
    setMenuCategories(categories || []);
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateCartQuantity = useCallback(
    (productId, quantity) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      menuCategories,
      setMenu,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [
      menuCategories,
      setMenu,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotal,
      cartCount,
    ],
  );

  return (
    <StorefrontMenuContext.Provider value={value}>
      {children}
    </StorefrontMenuContext.Provider>
  );
};
