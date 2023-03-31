import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import {
  Checkbox,
  DataTable,
  List,
  Text,
} from "react-native-paper";
import moment from "moment/moment";
import QuanterSizer from "../../components/input/QuanterSizer";
import routes from "../../navigation/routes";

const Header = DataTable.Header;
const Title = DataTable.Title;
const Row = DataTable.Row;
const Cell = DataTable.Cell;

const OrdersScreen = ({ navigation }) => {
  const { token } = useUserContext();
  const { getOrders } = useUser();
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [currMenu, setCurMenu] = useState();

  const handleFetch = async () => {
    const response = await getOrders(token, { page_size: q });
    if (!response.ok) {
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    const {
      data: { results },
    } = response;
    setOrders(results);
  };
  const [q, setq] = useState(0);

  useEffect(() => {
    handleFetch();
  }, [q]);
  return (
    <View>
      <DataTable>
        <Header>
          <Title>
            <Checkbox
              status={selectAll ? "checked" : "unchecked"}
              onPress={() => setSelectAll(!selectAll)}
            />
          </Title>
          <Title>#</Title>
          <Title>Order</Title>
          <Title>Created</Title>
          <Title>Items Count</Title>
          <Title>Total Cost</Title>
          <Title>Amount Paid</Title>
          <Title>Balance</Title>
          <Title>Status</Title>
        </Header>

        {orders.map((order, index) => {
          const {
            order_id,
            updated,
            items,
            total_cost,
            amount_paid,
            balance,
            paid,
          } = order;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(routes.ORDER_SCREEN, order)}
            >
              <Row>
                <Cell>
                  <Checkbox
                    status={
                      selectAll || selected.indexOf(index) !== -1
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => {
                      selected.indexOf(index) !== -1
                        ? setSelected(selected.filter((ind) => ind !== index))
                        : setSelected([...selected, index]);
                    }}
                  />
                </Cell>
                <Cell>{index + 1}</Cell>
                <Cell>{order_id}</Cell>
                <Cell>{moment(updated).format("Do MMM YYYY")}</Cell>
                <Cell>{items.length}</Cell>
                <Cell>{total_cost}</Cell>
                <Cell>{amount_paid}</Cell>
                <Cell>{balance}</Cell>
                <Cell>
                  {paid ? (
                    <List.Icon icon="check-circle" color="green" />
                  ) : (
                    <List.Icon icon="close-circle" color="red" />
                  )}
                </Cell>
              </Row>
            </TouchableOpacity>
          );
        })}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <Text>Rows per page</Text>
          <QuanterSizer
            value={q}
            onIncrement={() => setq(q + 1)}
            onDecrement={() => setq(q - 1)}
          />
        </View>
      </DataTable>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
