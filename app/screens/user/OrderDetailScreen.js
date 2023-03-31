import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import {
  Avatar,
  Badge,
  Card,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";
import Logo from "../../components/Logo";

const OrderDetailScreen = ({ navigation, route }) => {
  const { order_id, updated, items, total_cost, amount_paid, balance, paid } =
    route.params;
  return (
    <View>
      <View style={styles.container}>
        <Logo variant="black" />
      </View>
      <Card.Content>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View>
            <View style={styles.row}>
              <Text style={styles.title} variant="bodyLarge">
                OrderId:{" "}
              </Text>
              <Text variant="bodyLarge">{order_id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title} variant="bodyLarge">
                Created:{" "}
              </Text>
              <Text variant="bodyLarge">
                {moment(updated).format("Do MMM YYYY")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title} variant="bodyLarge">
                Items Count:{" "}
              </Text>
              <Text variant="bodyLarge">{items.length}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title} variant="bodyLarge">
                TotalCost:{" "}
              </Text>
              <Text variant="bodyLarge">{total_cost}</Text>
            </View>
          </View>
          <View>
            <View style={styles.row}>
              <Text style={styles.title} variant="bodyLarge">
                Ammount Paid:{" "}
              </Text>
              <Text variant="bodyLarge">{amount_paid}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title} variant="bodyLarge">
                Balance:{" "}
              </Text>
              <Text variant="bodyLarge">{balance}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.title} variant="bodyLarge">
                Paid:{" "}
              </Text>
              <Text variant="bodyLarge">
                {paid ? (
                  <View
                    style={[
                      styles.badge,
                      paid ? { backgroundColor: colors.success } : {},
                    ]}
                  >
                    <Text style={styles.badgeText}>paid</Text>
                  </View>
                ) : (
                  <View
                    style={[
                      styles.badge,
                      !paid ? { backgroundColor: colors.danger } : {},
                    ]}
                  >
                    <Text style={styles.badgeText}>pending</Text>
                  </View>
                )}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>

      <FlatList
        data={items}
        keyExtractor={({ url }) => url}
        renderItem={(
          {
            item: {
              price,
              quantity,
              total_cost,
              product: { name: productName, image },
            },
          },
          index
        ) => (
          <Card.Title
            style={styles.card}
            key={index}
            title={productName}
            titleVariant="headlineSmall"
            subtitleStyle={{ color: colors.medium }}
            subtitle={`${quantity} * ${price}`}
            left={(props) =>
              image ? (
                <Avatar.Image source={{ uri: image }} {...props} size={50} />
              ) : (
                <Avatar.Icon {...props} size={50} icon="shopping" />
              )
            }
            right={(props) => (
              <Text
                {...props}
                style={{
                  paddingHorizontal: 10,
                  fontWeight: "bold",
                  color: colors.medium,
                }}
                variant="bodyLarge"
              >
                Ksh. {total_cost}
              </Text>
            )}
          />
        )}
      />
    </View>
  );
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  container: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    padding: 5,
  },

  title: {
    fontWeight: "bold",
    color: colors.medium,
  },
  badge: {
    borderRadius: 5,
    padding: 5,
  },
});
