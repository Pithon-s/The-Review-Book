import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Button, List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { Logout } from "../actions/AuthActions";
import color from "../config/colors";

const height = Dimensions.get("screen").height;
const imageSize = 120;

function ProfileScreen(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

  //---------Handlers--------
  const handleEditProfile = () => console.log("edit profile pressed");
  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Ionicons
          name="information-circle-outline"
          size={28}
          color="#9BAFE8"
          style={styles.infoIcon}
          onPress={() => alert("info pressed")}
        />

        <View style={styles.info}>
          <Text style={styles.title}>{user.username}</Text>
          {!user.isAnonymous && (
            <>
              <Text style={styles.rollno}>
                {user.email.substr(0, user.email.indexOf("@"))}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo name="location-pin" size={20} color={color.lightgrey} />
                <Text style={styles.dept}>CS Department (TODO)</Text>
              </View>
            </>
          )}
        </View>
        <View style={styles.profilePic}>
          <View style={styles.profilePicContainer}>
            <Image
              source={
                user.profilePictureURI
                  ? { uri: user.profilePictureURI }
                  : require("../assets/user.png")
              }
              style={styles.image}
              resizeMode="center"
            />
          </View>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.details}>
          <List.Item
            title="200"
            description="Total rated"
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDesc}
            style={{ flex: 0.5 }}
          />
          <List.Item
            title="123"
            description="Total comments"
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDesc}
            style={{ flex: 0.5 }}
          />
        </View>
      </View>
      {/* {!user.isAnonymous && (
        <Button
          onPress={handleEditProfile}
          color={color.primary}
          style={{ width: 200, borderRadius: 50, alignSelf: "center" }}
        >
          Edit Profile
        </Button>
      )} */}

      <View style={styles.bottomContainer}>
        <Button
          icon="logout"
          onPress={handleLogout}
          color="red"
          style={{
            borderRadius: 20,
            alignSelf: "center",

            width: "80%",
          }}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    paddingBottom: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Roboto",
    color: color.white,
    fontWeight: "200",
    fontSize: 30,
    textTransform: "capitalize",
  },
  rollno: {
    color: color.lightgrey,
    fontFamily: "Roboto",
    fontSize: 18,
    textTransform: "uppercase",
    marginVertical: 5,
  },
  dept: {
    fontSize: 14,
    color: color.lightgrey,
    fontFamily: "Roboto",
    paddingLeft: 2,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  listItemTitle: {
    color: color.primary,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  listItemDesc: {
    color: color.darkgrey,
    alignSelf: "center",
  },
  image: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize * 2,
  },
  profilePic: {
    justifyContent: "flex-end",
  },
  profilePicContainer: {
    backgroundColor: color.white,
    borderRadius: imageSize / 2 + 5,
    height: imageSize + 10,
    width: imageSize + 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  topContainer: {
    backgroundColor: color.primary,
    height: height * 0.3,
    alignItems: "center",
  },
  middleContainer: {
    paddingTop: imageSize / 2,
    height: height * 0.25,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.3 - imageSize / 2,
  },
  infoIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    right: 10,
    top: 5,
  },
});

export default ProfileScreen;
