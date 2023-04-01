import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-paper";
import ScrollableThumbnails from "../../components/ScrollableThumbnails";
import colors from "../../utils/colors";

const ProductDetailScreen = ({ navigation, route }) => {
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
  } = route.params;
  const imageHeight = Dimensions.get("window").height * 0.4;
  const [currHeroImage, setcurrHeroImage] = useState(image);
  console.log(image);
  return (
    <ScrollView style={styles.screen}>
      <Card>
        <Card.Cover
          style={{ width: "100%", height: imageHeight }}
          source={{ uri: currHeroImage }}
          resizeMode="cover"
        />
        <ScrollableThumbnails
          uris={[...images.map(({ image: img }) => img), image]}
          onPress={(uri) => setcurrHeroImage(uri)}
        />
      </Card>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
