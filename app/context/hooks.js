import { useContext } from "react";
import UserContext from "./UserContext";
import CartContext from "./CartContext";

export const useUserContext = () => {
  const { clearToken, user, setUser, token, setToken } =
    useContext(UserContext);
  return { clearToken, user, setUser, token, setToken };
};

export const useCartContext = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const addToCart = ({ product, quantity }) => {
    if (
      cartItems.findIndex(({ product: prod }) => prod.url === product.url) ===
      -1
    ) {
      // New product
      setCartItems([...cartItems, { product, quantity }]);
    } else {
      // update
      setCartItems([
        ...cartItems.filter(({ product: prod }) => prod.url !== product.url),
        { product, quantity },
      ]);
    }
  };
  const deleteFromCart = (product) => {
    setCartItems(
      cartItems.filter(({ product: prod }) => prod.url !== product.url)
    );
  };
  return { cartItems, setCartItems, addToCart, deleteFromCart };
};
