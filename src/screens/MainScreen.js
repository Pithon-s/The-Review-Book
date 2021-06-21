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
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachersList } from "../actions/DataActions";

import color from "../config/colors";
import deptArray from "../utilities/DepartmentData";

function MainScreen({ navigation }) {
  const list = useSelector((state) => state.Data.list);
  const dispatch = useDispatch();

  const handleSearch = () => {
    navigation.navigate("SearchScreen", { type: "search", code: "" });
    if (!list.length) dispatch(fetchTeachersList());
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.primary} />

      <View style={styles.mainView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          onPress={handleSearch}
        />
      </View>

      <View style={styles.cardView}>
        <FlatList
          data={deptArray}
          keyExtractor={(key) => key.id.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<View style={{ height: 10 }} />}
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
  },
  mainView: {
    backgroundColor: color.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  searchBar: {
    borderRadius: 20,
  },
  cardView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  card: {
    height: 270,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: color.primary,
  },
  logoContainer: {
    height: 40,
    width: 40,
    marginLeft: 15,
    marginRight: 10,
  },
  logo: {
    height: "100%",
    width: "100%",
  },
});
export default MainScreen;
