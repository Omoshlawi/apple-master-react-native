import { createStackNavigator } from "@react-navigation/stack";
import OrderDetailScreen from "../screens/user/OrderDetailScreen";
import OrdersScreen from "../screens/user/OrdersScreen";
import PaymentsScreen from "../screens/user/PaymentsScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import TransactionsScreen from "../screens/user/TransactionsScreen";
import routes from "./routes";

const Stack = createStackNavigator();

const Navigator = Stack.Navigator;
const Screen = Stack.Screen;

const UserNavigation = () => {
  return (
    <Navigator>
      <Screen
        name={routes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
      <Screen
        name={routes.TRANSACTIONS_SCREEN}
        component={TransactionsScreen}
        options={{ title: "Transactions" }}
      />
      <Screen
        name={routes.PAYMENTS_SCREEN}
        component={PaymentsScreen}
        options={{ title: "Payments" }}
      />
      <Screen
        name={routes.ORDERS_SCREEN}
        component={OrdersScreen}
        options={{ title: "Orders" }}
      />
      <Screen
        name={routes.ORDER_SCREEN}
        component={OrderDetailScreen}
        options={({ route }) => ({
          title: route.params.order_id,
        })}
      />
    </Navigator>
  );
};

export default UserNavigation;
