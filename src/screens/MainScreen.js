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
  { id: 1, title: "Department of Computer Science", uri: "../assets/dept.jpg" },
  {
    id: 2,
    title: "Department of Electrical & Computer Engineering",
    uri: "../assets/dept.jpg",
  },
  {
    id: 4,
    title: "Department of Chemical Engineering",
    uri: "../assets/dept.jpg",
  },
  {
    id: 5,
    title: "Department of Management Sciences",
    uri: "../assets/dept.jpg",
  },
  { id: 6, title: "Department of Ecnomics", uri: "../assets/dept.jpg" },
  { id: 7, title: "Department of Humanities", uri: "../assets/dept.jpg" },
  { id: 8, title: "Department of Physics", uri: "../assets/dept.jpg" },
  { id: 9, title: "Department of Pharmacy", uri: "../assets/dept.jpg" },
  { id: 10, title: "Department of Mathematics", uri: "../assets/dept.jpg" },
  { id: 11, title: "Department of Chemistery", uri: "../assets/dept.jpg" },
  { id: 12, title: "Department of Architecture", uri: "../assets/dept.jpg" },
  { id: 13, title: "Department of Art & Design", uri: "../assets/dept.jpg" },
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
                  onPress={() => props.navigation.navigate("TeacherProfile")}
                  rippleColor={color.primaryLight}
                />
              )}
            />
          )
        ) : (
          <FlatList
            data={deptArray}
            keyExtractor={(key) => key.id.toString()}
            ListFooterComponent={
              <View
                style={{ height: Dimensions.get("screen").height * 0.15 }}
              />
            }
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
                </Card.Content>
              </Card>
            )}
          />
        )}
      </View>
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
  searchBar: {
    width: "95%",
    borderRadius: 20,
  },
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
