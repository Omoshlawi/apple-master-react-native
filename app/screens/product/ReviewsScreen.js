import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useShop } from "../../api/hooks";
import { Snackbar, Text, Card, List, Avatar } from "react-native-paper";
import { useUserContext } from "../../context/hooks";
import RatingBar from "../../components/ratingbar/RatingBar";
import moment from "moment/moment";
import colors from "../../utils/colors";

const ReviewsScreen = ({ navigation, route }) => {
  const [reviews, setReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useUserContext();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const { getReviews } = useShop();
  const handleFetch = async () => {
    const revResponse = await getReviews();
    if (!revResponse.ok) {
      console.log("ReviewsScreen: ", revResponse.problem, revResponse.data);
    } else {
      setReviews(revResponse.data.results);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.reviewsContainer}>
        <FlatList
          data={reviews}
          contentContainerStyle={{ padding: 5 }}
          refreshing={refreshing}
          onRefresh={handleFetch}
          renderItem={({ item: review }) => {
            const {
              rating,
              review: message,
              created,
              author: { name, image },
            } = review;
            return (
              <Card>
                <Card.Title
                  left={(props) =>
                    image ? (
                      <Avatar.Image source={{ uri: image }} {...props} />
                    ) : (
                      <Avatar.Icon icon="account" {...props} />
                    )
                  }
                  subtitleVariant="bodyLarge"
                  subtitle={name}
                />
                <Card.Content>
                  <View style={styles.reviewRatingRow}>
                    <RatingBar starSize={15} defaultRating={rating} />
                    <Text style={{ color: colors.medium, paddingLeft: 10 }}>
                      {moment(created).format("Do MMMM YYYY")}
                    </Text>
                  </View>
                  <Text style={{ paddingVertical: 10 }}>{message}</Text>
                </Card.Content>
              </Card>
            );
          }}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Rating:</Text>
        <RatingBar
          align="flex-start"
          //   defaultRating={formState.rating}
          onRatingChange={(rating) => setFormState({ ...formState, rating })}
        />
        <Text style={styles.label}>Review:</Text>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: "Dismiss",
          onPress: () => {
            // setVisible(false);
          },
        }}
      >
        {message}
      </Snackbar>
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  reviewRatingRow: {
    flexDirection: "row",
  },
  reviewsContainer: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  form: {
    paddingBottom: 20,
  },
});
