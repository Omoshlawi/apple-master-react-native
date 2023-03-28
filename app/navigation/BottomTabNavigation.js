import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tab/HomeScreen";
import routes from "./routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../utils/colors";
import AccountScreen from "../screens/tab/AccountScreen";
import CartScreen from "../screens/tab/CartScreen";
import SearchScreen from "../screens/tab/SearchScreen";

const Tab = createBottomTabNavigator();
const Navigator = Tab.Navigator;
const Screen = Tab.Screen;
function BottomTabNavigation() {
  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.medium,
        headerShown: false
      }}
    >
      <Screen
        component={HomeScreen}
        name={routes.HOME_SCREEN}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Screen
        component={SearchScreen}
        name={routes.SEARCH_SCREEN}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
        }}
      />
      <Screen
        component={CartScreen}
        name={routes.CART_SCREEN}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
      <Screen
        component={AccountScreen}
        name={routes.ACCOUNT_SCREEN}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}

export default BottomTabNavigation;
