import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { useCartContext, useUserContext } from "../../context/hooks";
import AppSafeArea from "../../components/AppSafeArea";
import {
  Avatar,
  Card,
  FAB,
  IconButton,
  List,
  Text,
  Portal,
  Provider,
  Snackbar,
} from "react-native-paper";
import colors from "../../utils/colors";
import RatingBar from "../../components/ratingbar/RatingBar";
import QuanterSizer from "../../components/input/QuanterSizer";
import routes from "../../navigation/routes";
import { useShop } from "../../api/hooks";

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    addToCart,
    deleteFromCart,
    clearAll,
    postItems,
    totalCost,
  } = useCartContext();
  const [state, setState] = React.useState({ open: false });
  const [visible, setVisible] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);
  const onStateChange = ({ open }) => setState({ open });
  const { token } = useUserContext();
  const { postOrder } = useShop();
  const handleAddOrder = async () => {
    const response = await postOrder(token, postItems);
    if (!response.ok) {
      setSnackMessage(response.data.items.join(";"));
      onToggleSnackBar();
      return console.log("CartScreen: ", response.problem, response.data);
    }
    setSnackMessage(" Your order was received successfully");
    onToggleSnackBar();
    clearAll();
  };

  const { open } = state;
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
      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            fabStyle={styles.fab}
            label={`Ksh. ${totalCost}`}
            backdropColor={colors.transparent}
            visible
            icon={open ? "close" : "dots-vertical"}
            actions={[
              {
                icon: "plus",
                onPress: () => navigation.navigate(routes.HOME_SCREEN),
              },
              {
                icon: "notification-clear-all",
                label: "Clear",
                onPress: clearAll,
              },
              {
                icon: "share-all",
                label: "Order now",
                onPress: handleAddOrder,
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: "Dismiss",
          onPress: () => {
            // Do something
          },
        }}
      >
        {snackMessage}
      </Snackbar>
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
  fab: {
    backgroundColor: colors.white,
    marginVertical: 3,
  },
  fabContainer: {
    margin: 5,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
