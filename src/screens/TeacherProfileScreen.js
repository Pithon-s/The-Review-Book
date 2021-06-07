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
import { List, Avatar, IconButton, TextInput } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import color from "../config/colors";

function TeacherProfileScreen(props) {
  const [total, setTotal] = useState(0);
  const isAnonymous = useSelector((state) => state.Auth.user.isAnonymous);
  const teacherData = useSelector((state) => state.Data.teacherData);

  const scrollRef = useRef();

  //----------Handlers------------
  const handleSend = () => {
    console.log("press");
  };

  const handleScroll = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

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
          <Avatar.Image size={120} source={{ uri: teacherData.imgURL }} />
        </View>

        <Text style={styles.title}>
          {teacherData.fname + " " + teacherData.lname}
        </Text>
        <Text style={{ color: color.lightgrey, marginBottom: 20 }}>
          {teacherData.dept + " Department"}
        </Text>
      </View>

      <ScrollView ref={scrollRef}>
        <View style={styles.dataDiv}>
          <View style={styles.statContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {teacherData.ratingCount}
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
                {teacherData.commentCount}
              </Text>
              <Text style={[styles.text, styles.subText]}>Comments</Text>
            </View>
          </View>

          <View style={styles.infoView}>
            <View style={styles.innerInfoView}>
              <Text style={[styles.Data, { fontWeight: "bold" }]}>
                Average Rating:
              </Text>
              <View style={{ flexDirection: "row" }}>
                <AntDesign name="star" size={26} color={color.primary} />
                <Text style={styles.Data}>
                  {parseFloat(
                    teacherData.totalRating / teacherData.ratingCount
                  )}
                </Text>
              </View>
            </View>

            <View style={styles.innerInfoView}>
              <Text style={[styles.Data, { fontWeight: "bold" }]}>Email:</Text>
              <Text style={styles.Data}>{teacherData.id}</Text>
            </View>
          </View>

          {!isAnonymous ? (
            <View style={styles.ratingView}>
              <Text style={{ fontSize: 22 }}>
                Tell us about your experience:
              </Text>
              <Text>{handleRating()}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.commentDiv}>
          <View style={styles.commentTextInput}>
            <TextInput
              mode="flat"
              placeholder="Comment here"
              selectionColor={color.primary}
              style={{
                width: "75%",
                borderColor: color.primary,
                marginLeft: 10,
              }}
              // multiline={true}
              disabled={isAnonymous}
              theme={{
                colors: { primary: color.primary },
              }}
            />
            <IconButton
              icon="send"
              color={color.primary}
              size={35}
              onPress={handleSend}
              style={{ marginTop: 10 }}
              disabled={isAnonymous}
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
        onPress={handleScroll}
        color={color.white}
        size={30}
        style={styles.upwardButton}
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
  innerInfoView: { flexDirection: "row", justifyContent: "space-between" },
  upwardButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: color.primary,
    borderRadius: 22,
    elevation: 1,
    top: Dimensions.get("screen").height * 0.84,
    left: Dimensions.get("screen").width * 0.82,
  },
});
export default TeacherProfileScreen;
