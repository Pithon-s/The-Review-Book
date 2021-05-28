import React, { useState, useRef } from "react";
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
import AntDesign from "react-native-vector-icons/AntDesign";
function TeacherProfileScreen(props) {
  const [deptArray, setArray] = useState([
    { id: 1, title: "EE Department" },
    { id: 2, title: "CS Department" },
    { id: 3, title: "Department" },
    // { id: 4, title: "Department" },
  ]);
  const [text, setText] = React.useState("");
  const [isAllowed, setIsAllowed] = React.useState(false);
  const [total, setTotal] = useState(0);
  const teacherData = {
    imgUrl: "https://picsum.photos/200/300",
    name: "Nadeem Ghafoor",
    department: "CS Department",
    reviews: "85",
    nComments: "113",
    avgRating: "4.8",
    email: "nadeem.cuilahore.edu.pk",
    comments: [
      {
        id: 1,
        username: "Muhammad Bilal",
        comment: "good",
        userImgUrl: "https://picsum.photos/200/300",
      },
      {
        id: 2,
        username: "Ali",
        comment: "good",
        userImgUrl: "https://picsum.photos/200/300",
      },
      {
        id: 3,
        username: "Ibrahim",
        comment: "good",
        userImgUrl: "https://picsum.photos/200/300",
      },
      {
        id: 4,
        username: "Haseeb",
        comment: "good",
        userImgUrl: "https://picsum.photos/200/300",
      },
    ],
  };
  const scrollRef = useRef();
  const handleRating = () => {
    const ratingIcons = [];
    for (let i = 1; i <= 5; i++)
      ratingIcons.push(
        <AntDesign
          name="star"
          size={26}
          color={i <= total ? color.primary : color.darkgrey}
          key={i}
          onPress={() => {
            setTotal(i);
            console.log(i);
          }}
        />
      );

    return ratingIcons;
  };

  return (
    <View style={styles.maincontainer}>
      <StatusBar backgroundColor={color.primary} />
      <View style={styles.imageDiv}>
        <IconButton
          icon="arrow-left"
          color={color.white}
          size={30}
          onPress={() => props.navigation.navigate("TabNavigator")}
          style={{ alignSelf: "flex-start", position: "absolute" }}
        />
        <View style={styles.imageBackgroundDiv}>
          <Avatar.Image size={120} source={{ uri: teacherData.imgUrl }} />
        </View>

        <Text style={styles.title}>{teacherData.name}</Text>
        <Text style={{ color: color.lightgrey, marginBottom: 20 }}>
          {teacherData.department}
        </Text>
      </View>
      <ScrollView ref={scrollRef}>
        <View style={styles.dataDiv}>
          <View style={styles.statContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {teacherData.reviews}
              </Text>
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
              <Text style={[styles.text, { fontSize: 24 }]}>
                {teacherData.nComments}
              </Text>
              <Text style={[styles.text, styles.subText]}>Comments</Text>
            </View>
          </View>
          <View style={styles.infoView}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.Data, { fontWeight: "bold" }]}>
                Average Rating:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <AntDesign name="star" size={26} color={color.primary} />
                <Text style={styles.Data}> {teacherData.avgRating}</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.Data, { fontWeight: "bold" }]}>Email:</Text>
              <Text style={styles.Data}>{teacherData.email}</Text>
            </View>

            {/* <Text style={styles.Data}>Subjects:</Text> */}
          </View>
          <View style={styles.ratingView}>
            <Text style={{ fontSize: 22 }}>Tell us about your experience:</Text>
            <Text>{handleRating(4)}</Text>
          </View>
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
            data={teacherData.comments}
            ListFooterComponent={() => <View style={{ height: 80 }} />}
            keyExtractor={(key) => key.id.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.username}
                description={item.comment}
                left={(props) => (
                  <Avatar.Image size={60} source={{ uri: item.userImgUrl }} />
                )}
              />
            )}
          />
        </View>
      </ScrollView>
      <IconButton
        icon="arrow-up"
        onPress={() => {
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
        }}
        color={color.white}
        size={30}
        style={{
          position: "absolute",
          alignSelf: "center",
          backgroundColor: color.primary,
          borderRadius: 22,
          elevation: 1,
          top: Dimensions.get("screen").height * 0.84,
          left: Dimensions.get("screen").width * 0.82,
        }}
      />
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
    marginTop: 15,
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
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  ratingView: {
    width: "90%",
    alignSelf: "center",
    //  backgroundColor: "gold",
    alignItems: "center",
    marginTop: 20,
  },
  Data: {
    fontSize: 20,
    fontWeight: "900",
  },
  infoView: {
    padding: 25,
    // backgroundColor: "dodgerblue",
    justifyContent: "space-around",
    height: 150,
  },
});
export default TeacherProfileScreen;
