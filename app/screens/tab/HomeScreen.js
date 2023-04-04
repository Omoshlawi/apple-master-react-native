import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import AppSafeArea from "../../components/AppSafeArea";
import { useShop, useUser } from "../../api/hooks";
import {
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  List,
  Text,
} from "react-native-paper";
import { useUserContext } from "../../context/hooks";
import colors from "../../utils/colors";
import ScrollableIconButtons from "../../components/button/ScrollableIconButtons";
import RatingBar from "../../components/ratingbar/RatingBar";
import moment from "moment/moment";
import routes from "../../navigation/routes";

const HomeScreen = ({ navigation }) => {
  const { getCategories, getProducts } = useShop();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useUserContext();
  const { getUser } = useUser();

  const itemWidth = Dimensions.get("window").width / 2 - 10; // subtracting margin
  const itemHeight = Dimensions.get("window").height / 3 - 10; // subtracting margin

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
          onPress={() => {
            navigation.navigate(routes.SEARCH_SCREEN);
          }}
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
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <List.Icon icon="chevron-right" />
      </View>
      <View style={styles.productsContainer}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={({ url }) => url}
          contentContainerStyle={{
            alignItems: "center",
          }}
          renderItem={({ item }) => {
            const {
              name,
              image,
              description,
              price,
              rating,
              tags,
              images,
              updated,
              category: { name: categry },
              reviews: { count: reviews },
            } = item;
            return (
              <Card
                onPress={() => {
                  navigation.navigate(routes.PRODUCT_NAVIGATION, {
                    screen: routes.PRODUCT_SCREEN,
                    params: item,
                  });
                }}
                style={[
                  {
                    width: itemWidth,
                    /*height: itemHeight,*/ margin: 5,
                  },
                ]}
              >
                <Card.Content>
                  <Text variant="titleMedium">{name}</Text>
                  <Text variant="bodyMedium" style={{ color: colors.medium }}>
                    {categry}
                  </Text>
                </Card.Content>
                <Card.Cover source={{ uri: image }} resizeMode="contain" />
                <Card.Actions>
                  <Text style={{ color: colors.medium }}>
                    {`${moment(updated).format("Do MMM YYYY")} | `}
                  </Text>
                  <RatingBar starSize={15} defaultRating={rating} disabled />
                  <Text>({reviews})</Text>
                </Card.Actions>
                <Card.Actions
                  style={{
                    flexDirection: "row-reverse",
                  }}
                >
                  <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
                    Ksh. {price}
                  </Text>
                </Card.Actions>
              </Card>
            );
          }}
        />
      </View>
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
  productsContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
  },
});
