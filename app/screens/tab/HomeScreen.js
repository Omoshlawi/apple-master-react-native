import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { useShop, useUser } from "../../api/hooks";
import { Avatar, Chip, IconButton } from "react-native-paper";
import { useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import ScrollableIconButtons from "../../components/button/ScrollableIconButtons";

const HomeScreen = () => {
  const { getCategories, getProducts } = useShop();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useUserContext();
  const { getUser } = useUser();

  const handleFetch = async () => {
    const categoryResponse = await getCategories();
    if (!categoryResponse.ok) {
      console.log(
        "Home screen: ",
        categoryResponse.problem,
        categoryResponse.data
      );
    }
    const {
      data: { results: categoryResult },
    } = categoryResponse;
    setCategories(categoryResult);
    const productResponse = await getProducts();
    if (!productResponse.ok) {
      console.log(
        "Home screen: ",
        productResponse.problem,
        productResponse.data
      );
    }
    const {
      data: { results: productResult },
    } = productResponse;
    setProducts(productResult);
  };

  useEffect(() => {
    if (!user) getUser();
    handleFetch();
  }, []);

  return (
    <AppSafeArea>
      <View style={styles.headerontainer}>
        {user && user.profile.image ? (
          <Avatar.Image source={{ uri: user.profile.image }} size={45} />
        ) : (
          <Avatar.Icon
            icon="account"
            size={45}
            style={{ backgroundColor: colors.light }}
          />
        )}
        <IconButton
          icon="magnify"
          style={styles.searchButn}
          iconColor={colors.white}
          mode="outlined"
          onPress={() => {}}
          size={30}
        />
      </View>
      <ScrollableIconButtons
        title="Product Categories"
        data={categories}
        imageExtractor={({ image }) => image}
        keyExtractor={({ url }) => url}
        titleExtractor={({ name }) => name}
        selectable={true}
        onItemClicked={(item) => {
          console.log(item);
        }}
        disabled
      />
    </AppSafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchButn: {
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
  },
});
