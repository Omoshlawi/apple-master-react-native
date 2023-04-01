import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import routes from "./routes";
import ProductDetailScreen from "../screens/product/ProductDetailScreen";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const ProductNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PRODUCT_SCREEN}
        component={ProductDetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Navigator>
  );
};

export default ProductNavigation;
