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
  const addToCart = ({ product: { image, product }, quantity }) => {
    if (cartItems.findIndex((item) => item.product === product) === -1) {
      // New product
      setCartItems([...cartItems, { image, product, quantity }]);
    } else {
      // update
      setCartItems([
        ...cartItems.filter((item) => item.product !== product),
        { image, product, quantity },
      ]);
    }
  };
  const deleteFromCart = ({ product: { image, product } }) => {
    setCartItems(cartItems.filter((item) => item.product !== product));
  };
  return { cartItems, setCartItems, addToCart, deleteFromCart };
};
