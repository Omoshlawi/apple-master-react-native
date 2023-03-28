import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/user/ProfileScreen";
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
    </Navigator>
  );
};

export default UserNavigation;
