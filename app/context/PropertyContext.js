import React, { createContext } from "react";

const PropertyContext = createContext();
export const PropertyContextProvider = PropertyContext.Provider;
export const PropertyContextConsumer = PropertyContext.Consumer;

export default PropertyContext;
