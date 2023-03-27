import { Image } from "react-native";
import React from "react";

const getVariant = (variant) => {
  if (variant === "black") {
    return require("../assets/logo-black.png");
  }
  if (variant === "white") {
    return require("../assets/logo-white.png");
  }
  return require("../assets/logo-white.png");
};

const Logo = ({ variant, size = 100 }) => {
  return (
    <Image style={{ width: size, height: size }} source={getVariant(variant)} />
  );
};

export default Logo;
