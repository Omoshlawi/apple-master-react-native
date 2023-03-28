import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import ListItem from "../../components/ListItem";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";

const AccountScreen = () => {
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
        />
      )}
    </AppSafeArea>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({});
