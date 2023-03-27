import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Logo from "../components/Logo";
import TextInputField from "../components/input/TextInputField";
import PasswordInputField from "../components/input/PasswordInputField";
import colors from "../utils/colors";
import AppButton from "../components/input/AppButton";
import routes from "../navigation/routes";

const RegisterScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  return (
    <View style={styles.container}>
      <Logo size={150} variant="black" />
      <View style={styles.form}>
        <TextInputField
          icon="account"
          placeholder="Enter username"
          value={formState.username}
          onChangeText={(username) => {
            setFormState({ ...formState, username });
          }}
        />
        <TextInputField
          icon="email"
          placeholder="Enter email"
          value={formState.email}
          onChangeText={(email) => {
            setFormState({ ...formState, email });
          }}
          keyboardType="email-address"
        />
        <PasswordInputField
          icon="lock"
          placeholder="Enter Password"
          value={formState.password}
          onChangeText={(password) => {
            setFormState({ ...formState, password });
          }}
        />
        <PasswordInputField
          icon="lock"
          placeholder="Confirm Password"
          value={formState.confirm_password}
          onChangeText={(confirm_password) => {
            setFormState({ ...formState, confirm_password });
          }}
        />
        <AppButton
          title="Sign Up"
          onPress={() => {
            console.log(formState);
          }}
        />

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>Already have and account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.LOGIN_SCREEN);
            }}
          >
            <Text style={{ color: colors.primary }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.background,
    paddingTop: 50,
    flex: 1,
  },
  form: {
    width: "90%",
  },
});
