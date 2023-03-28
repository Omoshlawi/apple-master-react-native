import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import ListItem from "../../components/ListItem";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import routes from "../../navigation/routes";

const AccountScreen = ({ navigation }) => {
  const { user } = useUserContext();
  const { getUser } = useUser();
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
  return (
    <AppSafeArea>
      {user && (
        <ListItem
          image={require("../../assets/logo-black.png")}
          title={`${user.first_name} ${user.last_name}`}
          subTitle={user.email}
          icon="account"
          onPress={() =>
            navigation.navigate(routes.USER_NAVIGATION, {
              screen: routes.PROFILE_SCREEN,
              params: user,
            })
          }
        />
      )}
    </AppSafeArea>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
