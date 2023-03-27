import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Logo from "../components/Logo";
import TextInputField from "../components/input/TextInputField";
import PasswordInputField from "../components/input/PasswordInputField";
import colors from "../utils/colors";
import AppButton from "../components/input/AppButton";
import routes from "../navigation/routes";
import { useUser } from "../api/hooks";

const LoginScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const { login } = useUser();

  const handleLogin = async () => {
    try {
      const response = await login(formState);
      console.log(response.data);
    } catch ({ response: { data, status } }) {
      console.log(data, status);
    }
  };

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
        <PasswordInputField
          icon="lock"
          placeholder="Enter Password"
          value={formState.password}
          onChangeText={(password) => {
            setFormState({ ...formState, password });
          }}
        />
        <AppButton title="Login" onPress={handleLogin} />

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Text>Don't have and account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.REGISTER_SCREEN);
            }}
          >
            <Text style={{ color: colors.primary }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
