import { createContext, useState, useContext } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItem, setCartItem] = useState([]);

  function addToCart(productId) {
    const existing = cartItem.find((item) => item.id === productId);
    if (existing) {
      const curentQuantity = existing.quantity;
      const updatedCartItem = cartItem.map((item) =>
        item.id === productId
          ? { id: productId, quantity: curentQuantity + 1 }
          : item,
      );
      setCartItem(updatedCartItem);
    } else {
      setCartItem([...cartItem, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithproducts() {
    return cartItem
      .map((item) => ({ ...item, product: getProductById(item.id) }))
      .filter((item) => item.product);
  }

  function removeFromCart(productId) {
    setCartItem(cartItem.filter((item) => item.id !== productId));
  }

  function updateCartItemQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCartItem = cartItem.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );
    setCartItem(updatedCartItem);
  }

  function totalPrice() {
    return cartItem.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  function clearCart() {
    setCartItem([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        getCartItemsWithproducts,
        removeFromCart,
        updateCartItemQuantity,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
