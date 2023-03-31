import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../../api/hooks";
import { useUserContext } from "../../context/hooks";
import { List } from "react-native-paper";

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
          return <List.Item title={payment_id} />;
        }}
      />
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({});
