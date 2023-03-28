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
import DropDown from "../../components/input/DropDown";

const ProfileScreen = ({ navigation, route }) => {
  const {
    first_name,
    last_name,
    email,
    profile: { gender, image, phone_number },
    username,
  } = route.params;
  const [edit, setEdit] = useState(true);
  const [genders, setGenders] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);
  const [formState, setFormState] = useState({
    first_name,
    last_name,
    gender,
    phone_number,
    image,
  });
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
          <TextInputField
            placeholder="First name"
            icon="account-edit"
            value={formState.first_name}
            onChangeText={(first_name) =>
              setFormState({ ...formState, first_name })
            }
          />
          <TextInputField
            placeholder="Last Name"
            icon="account-edit"
            value={formState.last_name}
            onChangeText={(last_name) =>
              setFormState({ ...formState, last_name })
            }
          />
          <DropDown
            placeholder="Gender"
            icon="human-edit"
            // value is a string and not object
            value={formState.gender}
            // parameter is a fn that returns value, not object
            setValue={(value) =>
              setFormState({ ...formState, gender: value() })
            }
            data={genders}
            setData={setGenders}
          />
          <TextInputField
            placeholder="Phone Number"
            icon="phone"
            value={formState.phone_number}
            onChangeText={(phone_number) =>
              setFormState({ ...formState, phone_number })
            }
          />
        </View>
      )}

      <Card style={styles.card} elevation={1}>
        <Card.Content>
          <Button
            dark
            mode="outlined"
            icon="pen"
            onPress={() => {
              console.log(formState);
            }}
          >
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
