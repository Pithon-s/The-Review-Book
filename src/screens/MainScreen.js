import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from "react-native";
import { IconButton, Card, Title } from "react-native-paper";
import colors from "../config/colors";

import color from "../config/colors";
import deptArray from "../utilities/DepartmentData";

function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.primary} />

      <View style={styles.mainView}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo_blue.png")}
              style={styles.logo}
              resizeMode="center"
            />
          </View>
          <Title style={styles.title}>The Review Book</Title>
        </View>
        <IconButton
          size={30}
          icon="magnify"
          color={color.primary}
          style={{
            backgroundColor: color.white,
            borderColor: color.primary,
            borderWidth: 0.1,
          }}
          onPress={() =>
            navigation.navigate("SearchScreen", { type: "search", code: "" })
          }
        />
      </View>

      <View style={styles.cardView}>
        <FlatList
          data={deptArray}
          keyExtractor={(key) => key.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Card
              onPress={() => {
                navigation.navigate("SearchScreen", {
                  type: "byDept",
                  deptcode: item.code,
                });
              }}
              style={styles.card}
            >
              <Card.Cover source={item.uri} />
              <Card.Content>
                <Title style={{ color: color.primary }}>{item.title}</Title>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  mainView: {
    paddingVertical: 5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  searchBar: {
    borderRadius: 20,
  },
  cardView: {
    flex: 1,
  },
  card: {
    height: 270,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    alignSelf: "center",
    color: colors.primary,
    fontWeight: "900",
    marginLeft: 5,
  },
  logoContainer: { height: 35, width: 35 },
  logo: { height: "100%", width: "100%", flexDirection: "row" },
});
export default MainScreen;
