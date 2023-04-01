import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductDetailScreen = ({ navigation, route }) => {
  const product = route.params;
  return (
    <View>
      <Text>ProductDetailScreen</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({});
