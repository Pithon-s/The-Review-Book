import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from "react-native";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  List,
  Avatar,
  IconButton,
} from "react-native-paper";

import color from "../config/colors";

const deptArray = [
  { id: 1, title: "EE Department" },
  { id: 2, title: "CS Department" },
  { id: 3, title: "Department" },
  // { id: 4, title: "Department" },
];

function MainScreen(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsBlur, setItemsBlur] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.primary} />
      <View style={styles.mainView}>
        {isLoading == true ? (
          <IconButton
            icon="arrow-left"
            color={color.primary}
            size={30}
            onPress={() => {
              setLoading(false);
              setItemsBlur(false);
              setSearchQuery("");
            }}
            style={{ backgroundColor: color.white, marginLeft: 45 }}
          />
        ) : null}
        <Searchbar
          placeholder="Search"
          //Cancel button me msla ha
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          onSubmitEditing={() => setLoading(false)}
          onTextInput={() => {
            if (searchQuery === "") {
              setItemsBlur(false);
              setLoading(false);
            } else {
              setItemsBlur(true);
              setLoading(true);
            }
          }}
          iconColor={color.primary}
          onTouchCancel={() => console.log(searchQuery)}
        />
      </View>
      <View style={styles.cardView}>
        {itemsBlur == true ? (
          isLoading == true ? (
            <>
              <ActivityIndicator animating={true} color={color.primary} />
            </>
          ) : (
            <FlatList
              data={deptArray}
              keyExtractor={(key) => key.id.toString()}
              renderItem={({ item }) => (
                <List.Item
                  title="Naddem Gafoor"
                  description="CS Department"
                  left={(props) => (
                    <Avatar.Image
                      size={60}
                      source={{ uri: "https://picsum.photos/700" }}
                    />
                  )}
                  onPress={() => console.log("press")}
                  rippleColor={color.secondary}
                />
              )}
            />
          )
        ) : (
          <FlatList
            data={deptArray}
            keyExtractor={(key) => key.id.toString()}
            renderItem={({ item }) => (
              <Card
                onPress={() => {
                  setItemsBlur(true);
                  setLoading(true);
                  // item.onPress();
                }}
                style={styles.card}
              >
                <Card.Cover source={require("../assets/dept.jpg")} />
                <Card.Content>
                  <Title style={{ color: color.primary }}>{item.title}</Title>
                  <Paragraph>Card content</Paragraph>
                </Card.Content>
              </Card>
            )}
          />
        )}
      </View>
      <View style={{ height: 300, width: 10 }} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.white,
    overflow: "hidden",
  },
  mainView: {
    flexDirection: "row",
    alignItems: "center",
    height: Dimensions.get("screen").height * 0.1,
    width: "100%",
    //backgroundColor: "tomato",
    justifyContent: "center",
  },
  searchBar: { width: "95%", borderRadius: 20 },
  cardView: {
    height: Dimensions.get("screen").height * 0.9,
    width: "100%",
  },
  card: {
    height: 270,
    width: "95%",
    marginBottom: 10,
    alignSelf: "center",
  },
});
export default MainScreen;
