import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { useCartContext } from "../../context/hooks";
import AppSafeArea from "../../components/AppSafeArea";
import { Avatar, Card, IconButton, List, Text } from "react-native-paper";
import colors from "../../utils/colors";
import RatingBar from "../../components/ratingbar/RatingBar";
import QuanterSizer from "../../components/input/QuanterSizer";

const CartScreen = () => {
  const { cartItems, addToCart, deleteFromCart } = useCartContext();
  return (
    <AppSafeArea>
      <FlatList
        data={cartItems}
        keyExtractor={({ product: { url } }) => url}
        renderItem={({ item }) => {
          const {
            quantity,
            product: {
              name,
              image,
              description,
              price,
              rating,
              tags,
              images,
              updated,
              category: { name: category },
              reviews: { count: reviews },
            },
          } = item;
          // console.log(item);
          return (
            <List.Item
              style={styles.item}
              title={() => (
                <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
                  {name}
                </Text>
              )}
              description={() => (
                <List.Item
                  title={() => <Text>{`${category} | ${price}`}</Text>}
                  description={() => (
                    <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                      Ksh. {parseFloat(price) * parseFloat(quantity)}
                    </Text>
                  )}
                />
              )}
              left={(props) => (
                <Avatar.Image {...props} source={{ uri: image }} size={70} />
              )}
              right={(props) => (
                <Card.Actions
                  style={{
                    flexDirection: "column",
                    padding: 0,
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <QuanterSizer
                    value={quantity}
                    onIncrement={() => {
                      addToCart({ ...item, quantity: quantity + 1 });
                    }}
                    onDecrement={() => {
                      if (quantity > 1)
                        addToCart({ ...item, quantity: quantity - 1 });
                    }}
                  />
                  <IconButton
                    {...props}
                    icon="delete"
                    style={{ marginRight: 0 }}
                    iconColor={colors.danger}
                    onPress={() => {
                      deleteFromCart(item.product);
                    }}
                  />
                </Card.Actions>
              )}
            />
          );
        }}
      />
    </AppSafeArea>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 20,
  },
});
