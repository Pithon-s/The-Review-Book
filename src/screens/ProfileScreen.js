import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Card, Title, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { Logout } from "../actions/AuthActions";
import color from "../config/colors";

function ProfileScreen(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const myData = {
    title: "Department of Computer Science",
    uri: require("../assets/dept.jpg"),
  };

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titlebar}></View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profilePic}>
            <Image
              source={
                user.profilePictureURI
                  ? { uri: user.profilePictureURI }
                  : require("../assets/man.png")
              }
              style={styles.image}
              resizeMode="center"
            />
          </View>
          <View style={styles.active} />
        </View>
        <View style={styles.info}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 30 }]}>
            {user.username}
          </Text>
          {user.email && (
            <Text
              style={[
                styles.text,
                { fontSize: 18, color: "#AEB5BC", textTransform: "uppercase" },
              ]}
            >
              {user.email.substr(0, user.email.indexOf("@"))}
            </Text>
          )}
          <Text style={[styles.text, { fontSize: 14, color: "#AEB5BC" }]}>
            CS Department (TODO)
          </Text>
        </View>

        {!user.isAnonymous ? (
          <Button
            onPress={() => console.log("edit profile pressed")}
            color={color.primary}
            style={{ width: 200, borderRadius: 50, alignSelf: "center" }}
          >
            Edit Profile
          </Button>
        ) : null}

        <View style={styles.cardView}>
          <Card onPress={() => console.log("pressed")} style={styles.card}>
            <Card.Cover source={myData.uri} />
            <Card.Content>
              <Title
                style={{
                  color: color.primary,
                  alignSelf: "center",
                  marginTop: 15,
                }}
              >
                {myData.title}
              </Title>
            </Card.Content>
          </Card>
        </View>

        <Button
          icon="logout"
          onPress={handleLogout}
          color="red"
          style={{ width: 200, borderRadius: 50, alignSelf: "center" }}
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Roboto",
    color: "black",
  },
  subText: {
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "500",
    color: "#AEB5BC",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  titlebar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 100,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 85,
    left: 1,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    bottom: 0,
    right: 0,
    height: 50,
    width: 50,
    borderRadius: 30,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    height: 100,
    justifyContent: "space-around",
  },
  statContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 12,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  card: {
    height: 270,
    width: "95%",
    marginBottom: 10,
    alignSelf: "center",
  },
  cardView: {
    marginTop: 30,
    // backgroundColor: "tomato",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default ProfileScreen;
