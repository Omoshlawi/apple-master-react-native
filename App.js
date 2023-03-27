import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AuthNavigation from "./app/navigation/AuthNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}
