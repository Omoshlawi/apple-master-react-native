import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { Avatar, Card, List, Text } from "react-native-paper";
import colors from "../../utils/colors";
import moment from "moment";

const PaymentsScreen = () => {
  const [payments, setPayments] = useState();
  const { getPayments } = useUser();
  const { token } = useUserContext();

  const handleFetch = async () => {
    const response = await getPayments(token, { page_size: 100 });
    if (!response.ok) {
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    const {
      data: { results },
    } = response;
    setPayments(results);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View>
      <FlatList
        data={payments}
        keyExtractor={({ url }) => url}
        renderItem={({ item }) => {
          const {
            url,
            payment_id,
            transactions,
            total_cost,
            amount_paid,
            balance,
            completed,
            created,
            order: { order },
          } = item;
          return (
            <TouchableOpacity>
              <Card.Title
                style={styles.card}
                title={payment_id}
                titleVariant="bodyLarge"
                subtitleVariant="bodySmall"
                subtitle={moment(created).format("Do MMM YYYY")}
                subtitleStyle={{ color: colors.medium }}
                left={(props) => (
                  <Avatar.Icon {...props} icon="wallet" style={styles.icon} />
                )}
                right={(props) => (
                  <Text {...props} style={styles.price} variant="bodyMedium">
                    Ksh. {total_cost}
                  </Text>
                )}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  price: {
    color: colors.medium,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  icon: {
    backgroundColor: colors.light,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 20,
  },
});
