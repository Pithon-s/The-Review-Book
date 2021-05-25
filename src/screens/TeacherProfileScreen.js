import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import color from "../config/colors";
import {
  Searchbar,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  List,
  Avatar,
  IconButton,
  Button,
  TextInput,
} from "react-native-paper";

function TeacherProfileScreen(props) {
  const [deptArray, setArray] = useState([
    { id: 1, title: "EE Department" },
    { id: 2, title: "CS Department" },
    { id: 3, title: "Department" },
    // { id: 4, title: "Department" },
  ]);
  const [text, setText] = React.useState("");
  const [isAllowed, setIsAllowed] = React.useState(false);
  return (
    <View style={styles.maincontainer}>
      <StatusBar backgroundColor={color.primary} />
      <View style={styles.imageDiv}>
        <View style={styles.imageBackgroundDiv}>
          <Avatar.Image
            size={120}
            source={{ uri: "https://picsum.photos/700" }}
          />
        </View>
        <Text style={styles.title}>Nadeem Gafhoor</Text>
        <Text style={{ color: color.lightgrey, marginBottom: 20 }}>
          CS Department
        </Text>
      </View>
      <ScrollView>
        <View style={styles.dataDiv}>
          <ScrollView>
            <Paragraph></Paragraph>
          </ScrollView>
        </View>
        <View style={styles.commentDiv}>
          <View style={styles.commentTextInput}>
            <TextInput
              mode="flat"
              placeholder="Comment here"
              // textStyle={{ width: "75%" }}
              selectionColor={color.primary}
              style={{
                width: "75%",
                borderColor: color.primary,
                marginLeft: 10,
              }}
              // multiline={true}
              disabled={isAllowed}
              theme={{
                colors: { primary: color.primary },
              }}
            />
            <IconButton
              icon="send"
              color={color.primary}
              size={35}
              onPress={() => console.log("press")}
              style={{ marginTop: 10 }}
              disabled={isAllowed}
            />
          </View>
          <FlatList
            data={deptArray}
            keyExtractor={(key) => key.id.toString()}
            renderItem={({ item }) => (
              <List.Item
                title="Naddem Gafoor"
                description="hellosad adsadasdsad
                             asdasdsa sdsadsad sadasdasd asdsadsadsadsadsadasdasdasdasdasdsadadasdsadasdas
                             sadasda"
                left={(props) => (
                  <Avatar.Image
                    size={60}
                    source={{ uri: "https://picsum.photos/700" }}
                  />
                )}
              />
            )}
          />
          <Button
            icon="arrow-down"
            onPress={() =>
              setArray([
                ...deptArray,
                { id: 4, title: "Department" },
                { id: 5, title: "Department" },
                { id: 6, title: "Department" },
              ])
            }
            color={color.primary}
          >
            View More
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer: { flex: 1, backgroundColor: color.white },
  imageDiv: {
    height: Dimensions.get("screen").height * 0.3,
    width: "100%",
    backgroundColor: color.primary,
    justifyContent: "space-around",
    alignItems: "center",
  },
  dataDiv: {
    height: Dimensions.get("screen").height * 0.4,
    width: "100%",
    backgroundColor: color.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  commentDiv: {
    width: "100%",
    backgroundColor: color.lightgrey,
    paddingTop: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageBackgroundDiv: {
    height: 130,
    width: 130,
    backgroundColor: color.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 80,
  },
  title: { color: color.white, fontSize: 24, fontWeight: "500" },
  commentTitle: {
    fontSize: 24,
    paddingBottom: 15,
    marginLeft: 15,
  },
  commentTextInput: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 25,
  },
});
export default TeacherProfileScreen;
