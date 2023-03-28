import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { UserContextProvider } from "./app/context/UserContext";
import useSecureStore from "./app/hooks/useSecureStore";
import AuthNavigation from "./app/navigation/AuthNavigation";

export default function App() {
  const [token, setToken, clearToken] = useSecureStore("token", null);
  const [user, setUser] = useState();
  return (
    <UserContextProvider value={{ token, setToken, clearToken, user, setUser }}>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </UserContextProvider>
  );
}
