import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Logout } from "../actions/AuthActions";
import color from "../config/colors";
import AboutUsScreen from "./AboutUsScreen";

const height = Dimensions.get("screen").height;
const imageSize = 120;

function ProfileScreen() {
  const [aboutUsVisible, setAboutUsVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

  //---------Handlers--------
  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <AboutUsScreen
        isVisible={aboutUsVisible}
        setIsVisible={setAboutUsVisible}
      />

      <View style={styles.topContainer}>
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
                <MaterialCommunityIcons
                  name="email"
                  size={20}
                  color={color.lightgrey}
                />
                <Text style={styles.email}>{user.email}</Text>
              </View>
            </>
          )}
        </View>
        <View style={styles.profilePic}>
          <View style={styles.profilePicContainer}>
            <Image
              source={{ uri: user.profilePictureURI }}
              style={styles.image}
              resizeMode="center"
            />
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          icon="information-outline"
          onPress={() => setAboutUsVisible(true)}
          color={color.primary}
          style={{
            borderRadius: 20,
            alignSelf: "center",
            width: "80%",
          }}
        >
          about us
        </Button>

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
    color: color.white,
    fontWeight: "200",
    fontSize: 30,
    textTransform: "capitalize",
  },
  rollno: {
    color: color.lightgrey,
    fontSize: 18,
    textTransform: "uppercase",
    marginVertical: 5,
  },
  email: {
    fontSize: 14,
    color: color.lightgrey,
    paddingLeft: 5,
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
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  profilePic: {
    justifyContent: "flex-end",
  },
  profilePicContainer: {
    borderWidth: 6,
    backgroundColor: color.lightgrey,
    borderColor: color.lightgrey,
    borderRadius: imageSize / 2,
    height: imageSize,
    width: imageSize,
    elevation: 10,
    overflow: "hidden",
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
  aboutUs: {
    backgroundColor: color.primary,
    position: "absolute",
    alignSelf: "flex-end",
    elevation: 0,
  },
});

export default ProfileScreen;
