import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../utils/colors";

const AppButton = ({
  title,
  onPress,
  backgroundColor = colors.primary,
  color = colors.white,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 20,
    padding: 15,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
