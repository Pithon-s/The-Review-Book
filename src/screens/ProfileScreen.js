import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

function ProfileScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titlebar}>
          <Ionicons name="ios-arrow-back" size={24} color="black" />
          <Feather name="more-vertical" size={24} color="black" />
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profilePic}>
            <Image
              source={require("../assets/man.png")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.active} />
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 30 }]}>
            Ali Asad
          </Text>
          <Text style={[styles.text, { fontSize: 14, color: "#AEB5BC" }]}>
            CS Department
          </Text>
        </View>
        <View style={styles.statContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>85</Text>
            <Text style={[styles.text, styles.subText]}>Reviews</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderRightWidth: 1,
                borderLeftWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>123</Text>
            <Text style={[styles.text, styles.subText]}>Comments</Text>
          </View>
        </View>
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
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titlebar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profilePic: {
    height: 200,
    width: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 28,
    left: 10,
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
});

export default ProfileScreen;
