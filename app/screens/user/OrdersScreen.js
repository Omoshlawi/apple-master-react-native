import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../context/hooks";
import { useUser } from "../../api/hooks";
import { Checkbox, DataTable, IconButton } from "react-native-paper";

const Header = DataTable.Header;
const Title = DataTable.Title;
const Row = DataTable.Row;
const Cell = DataTable.Cell;
const Pagination = DataTable.Pagination;

const numberOfItemsPerPageList = [2, 3, 4];

const OrdersScreen = () => {
  const { token } = useUserContext();
  const { getOrders } = useUser();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);

  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, orders.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const handleFetch = async () => {
    const response = await getOrders(token, { page_size: 100 });
    if (!response.ok) {
      return console.log("OrderScreen: ", response.problem, response.data);
    }
    const {
      data: { results },
    } = response;
    setOrders(results);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View>
      <DataTable>
        <Header>
          <Title></Title>
          <Title>#</Title>
          <Title>Created</Title>
          <Title>Items Count</Title>
          <Title>Total Cost</Title>
          <Title>Amount Paid</Title>
          <Title>Balance</Title>
          <Title>Status</Title>
          <Title>Actions</Title>
        </Header>

        {orders.map(
          (
            { updated, items, total_cost, amount_paid, balance, paid },
            index
          ) => (
            <Row key={index}>
              <Cell>
                <Checkbox
                  status={
                    selected.indexOf(index) !== -1 ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    selected.indexOf(index) !== -1
                      ? setSelected(selected.filter((ind) => ind !== index))
                      : setSelected([...selected, index]);
                  }}
                />
              </Cell>
              <Cell>{index}</Cell>
              <Cell>{updated}</Cell>
              <Cell>{items.length}</Cell>
              <Cell>{total_cost}</Cell>
              <Cell>{amount_paid}</Cell>
              <Cell>{balance}</Cell>
              <Cell>{"" + paid}</Cell>
              <Cell>
                <IconButton icon="dots-vertical" onPress={() => {}} />
              </Cell>
            </Row>
          )
        )}

        <Pagination
          page={page}
          numberOfPages={Math.ceil(orders.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${orders.length}`}
          //   showFastPaginationControls
          //   numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          //   selectPageDropdownLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
