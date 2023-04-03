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
    const currentIndex = cartItems.findIndex(
      ({ product: prod }) => prod.url === product.url
    );
    if (currentIndex === -1) {
      // New product
      setCartItems([...cartItems, { product, quantity }]);
    } else {
      // update
      const items = [...cartItems];
      const itemToUpdate = items[currentIndex];
      items[currentIndex] = { ...itemToUpdate, quantity };
      setCartItems(items);
    }
  };
  const deleteFromCart = (product) => {
    setCartItems(
      cartItems.filter(({ product: prod }) => prod.url !== product.url)
    );
  };
  return { cartItems, setCartItems, addToCart, deleteFromCart };
};
