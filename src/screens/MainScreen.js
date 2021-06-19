import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { Searchbar, Card, Title } from "react-native-paper";

import color from "../config/colors";
import deptArray from "../utilities/DepartmentData";

function MainScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.primary} />

      <View style={styles.mainView}>
        <Searchbar
          placeholder="Search"
          style={styles.searchBar}
          onTouchStart={() =>
            navigation.navigate("SearchScreen", { type: "search", code: "" })
          }
          iconColor={color.primary}
        />
      </View>

      <View style={styles.cardView}>
        <FlatList
          data={deptArray}
          keyExtractor={(key) => key.id.toString()}
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
    paddingVertical: 10,
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
});
export default MainScreen;
