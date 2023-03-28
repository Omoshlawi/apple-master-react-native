import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  Card,
  Text,
  Avatar,
  List,
  Button,
  TextInput,
} from "react-native-paper";
import colors from "../../utils/colors";
import TextInputField from "../../components/input/TextInputField";

const ProfileScreen = ({ navigation, route }) => {
  const {
    first_name,
    last_name,
    email,
    profile: { gender, image, phone_number },
    username,
  } = route.params;
  const [edit, setEdit] = useState(true);
  return (
    <View>
      {!edit && (
        <Card
          style={styles.card}
          elevation={1}
          // contentStyle={{ paddingHorizontal: 20 }}
        >
          <Card.Content>
            <View style={styles.avatarContainer}>
              {image ? (
                <Avatar.Image size={130} source={image} style={styles.avatar} />
              ) : (
                <Avatar.Icon size={130} icon="account" style={styles.avatar} />
              )}
            </View>
            <List.Item
              title={username}
              left={(props) => (
                <List.Icon {...props} icon="account" color={colors.medium} />
              )}
            />
            <List.Item
              title={`${first_name} ${last_name}`}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="account-edit"
                  color={colors.medium}
                />
              )}
            />
            <List.Item
              title={email}
              left={(props) => (
                <List.Icon {...props} icon="email" color={colors.medium} />
              )}
            />
            <List.Item
              title={phone_number}
              left={(props) => (
                <List.Icon {...props} icon="phone" color={colors.medium} />
              )}
            />
            <List.Item
              title={gender}
              left={(props) => (
                <List.Icon {...props} icon="human-edit" color={colors.medium} />
              )}
            />
          </Card.Content>
        </Card>
      )}

      {edit && (
        <View style={styles.card} elevation={0}>
          <TextInputField placeholder="First name" icon="account-edit" />
          <TextInputField placeholder="Last Name" icon="account-edit" />
          <TextInputField placeholder="Gender" icon="human-edit" />
          <TextInputField placeholder="Phone Number" icon="phone" />
        </View>
      )}

      <Card style={styles.card} elevation={1}>
        <Card.Content>
          <Button dark mode="outlined" icon="pen">
            Edit Profile
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  icon: {
    color: colors.medium,
  },
  avatarContainer: {
    alignSelf: "center",
  },
  card: {
    margin: 20,
  },
  avatar: {
    backgroundColor: colors.light,
  },
});
