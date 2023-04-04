import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import TextInputField from "../../components/input/TextInputField";
import AppSafeArea from "../../components/AppSafeArea";
import colors from "../../utils/colors";
import { Chip, IconButton } from "react-native-paper";
import { useShop } from "../../api/hooks";

const SearchScreen = () => {
  const { getTags, getProducts, getCategories } = useShop();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeChips, setActiveChips] = useState([]);

  const fetchProducts = async () => {
    const productsResponse = await getProducts({ tags: activeChips.join(",") });
    if (!productsResponse.ok) {
      console.log(
        "SearchScreen: ",
        productsResponse.problem,
        productsResponse.data
      );
    }
    setProducts(productsResponse.data.results);
  };

  const handlFetch = async () => {
    const tagsResponse = await getTags({ page_size: 1000 });
    const categoryResponse = await getCategories();
    if (!tagsResponse.ok) {
      console.log("SearchScreen: ", tagsResponse.problem, tags.data);
    }
    if (!categoryResponse.ok) {
      console.log(
        "SearchScreen: ",
        categoryResponse.problem,
        categoryResponse.data
      );
    }
    setTags(tagsResponse.data.results);
    setCategories(categoryResponse.data.results);
    await fetchProducts();
  };

  const handleTagClick = (tag) => {
    const tagIndex = activeChips.indexOf(tag);
    if (tagIndex === -1) {
      setActiveChips([...activeChips, tag]);
    } else {
      const activeTags = [...activeChips];
      activeTags.pop(tagIndex);
      setActiveChips(activeTags);
    }
  };

  useEffect(() => {
    handlFetch();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeChips]);

  return (
    <AppSafeArea>
      <View style={styles.header}>
        <View style={styles.search}>
          <TextInput style={styles.input} placeholder="Search..." />
          <IconButton
            style={styles.searchButton}
            icon="magnify"
            mode="outlined"
          />
        </View>
        <IconButton
          style={styles.filterButton}
          icon="filter"
          mode="outlined"
          iconColor={colors.white}
          size={27}
        />
      </View>
      <View>
        <FlatList
          data={tags}
          keyExtractor={({ name }) => name}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: { name } }) => (
            <Chip
              style={[
                styles.chip,
                activeChips.indexOf(name) !== -1
                  ? { backgroundColor: colors.light }
                  : {},
              ]}
              selected={activeChips.indexOf(name) !== -1}
              showSelectedOverlay
              onPress={() => {
                handleTagClick(name);
              }}
            >
              {name}
            </Chip>
          )}
        />
      </View>
    </AppSafeArea>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.white,
    flexDirection: "row",

    borderRadius: 10,
    flex: 1,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  searchButton: {
    borderRadius: 10,
    backgroundColor: colors.light,
  },
  filterButton: {
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  header: {
    margin: 10,
    flexDirection: "row",
  },
  chip: {
    backgroundColor: colors.white,
    margin: 2,
  },
});
