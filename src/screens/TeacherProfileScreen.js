import React, { useState, useRef, createRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  Text,
  Alert,
} from "react-native";
import {
  List,
  Avatar,
  IconButton,
  TextInput,
  Caption,
} from "react-native-paper";
import { AntDesign, Entypo } from "react-native-vector-icons";

import { useDispatch, useSelector } from "react-redux";
import colors from "../config/colors";
import color from "../config/colors";
import { sendComment, setRating } from "../actions/DataActions";

function TeacherProfileScreen(props) {
  const [comment, setComment] = useState("");
  const isAnonymous = useSelector((state) => state.Auth.user.isAnonymous);
  const teacherData = useSelector((state) => state.Data.teacherData);
  const profileComments = useSelector((state) => state.Data.comments);
  const userData = useSelector((state) => state.Auth.user);
  const rating = useSelector((state) => state.Data.rating);

  const textInput = createRef();
  const scrollRef = useRef();
  const dispatch = useDispatch();

  //----------Handlers------------
  const handleSend = () => {
    let commentData = {
      commentText: comment,
      imgURL: userData.profilePictureURI,
      name: userData.username,
      timeStamp:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };

    dispatch(sendComment(commentData, teacherData.id));
    textInput.current.clear();
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
        <View style={{ marginLeft: 10 }}>
          <AntDesign
            name="star"
            size={26}
            color={i <= rating ? color.primary : color.darkgrey}
            key={i}
            onPress={() => {
              rating == 0
                ? Alert.alert(
                    "Note!",
                    "Once you rate you would not be able to change it.",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          dispatch(
                            setRating(i, teacherData.id, userData.email)
                          );
                        },
                      },
                    ]
                  )
                : null;
            }}
          />
        </View>
      );

    return ratingIcons;
  };

  return (
    <>
      <ScrollView ref={scrollRef} style={styles.maincontainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

        <View style={styles.imageDiv}>
          <IconButton
            icon="arrow-left"
            color={color.white}
            size={30}
            onPress={() => props.navigation.navigate("TabNavigator")}
            style={{ alignSelf: "flex-start", position: "absolute", top: 3 }}
          />
          <View style={styles.imageBackgroundDiv}>
            <Avatar.Image size={120} source={{ uri: teacherData.imgURL }} />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{teacherData.name}</Text>
            <Text style={styles.emailView}>{teacherData.id}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo name="location-pin" size={20} color={color.lightgrey} />
              <Text style={styles.dept}>{teacherData.dept}</Text>
            </View>
          </View>

          <View style={styles.statContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {teacherData.ratingCount}
              </Text>
              <Text style={styles.subText}>Reviews</Text>
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
              <Text style={styles.subText}>Comments</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, { fontSize: 24 }]}>
                {parseFloat(
                  teacherData.totalRating / teacherData.ratingCount
                ).toPrecision(2) || "0"}
              </Text>
              <Text style={styles.subText}>Rating</Text>
            </View>
          </View>
        </View>

        {!isAnonymous ? (
          <View style={[styles.ratingView, { paddingBottom: 20 }]}>
            <Text style={{ fontSize: 22 }}>Tell us about your experience:</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              {handleRating()}
            </View>
          </View>
        ) : (
          <View style={{ marginTop: 20 }} />
        )}

        <View
          style={[
            styles.commentDiv,
            {
              height:
                profileComments.length === 0
                  ? Dimensions.get("screen").height * 0.3
                  : null,
            },
          ]}
        >
          <View style={styles.commentTextInput}>
            <TextInput
              ref={textInput}
              mode="flat"
              placeholder="Comment here"
              selectionColor={color.primary}
              style={{
                width: "75%",
                borderColor: color.primary,
                marginLeft: 10,
              }}
              disabled={isAnonymous}
              theme={{
                colors: { primary: color.primary },
              }}
              onChangeText={(text) => setComment(text)}
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
            data={profileComments}
            ListFooterComponent={() => <View style={{ height: 20 }} />}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                description={item.commentText}
                left={(props) => (
                  <Avatar.Image size={60} source={{ uri: item.imgURL }} />
                )}
                //style={{ height: 50 }}
                right={(props) => (
                  <Caption style={styles.timeStamp}>{item.timeStamp}</Caption>
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
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: { flex: 1, backgroundColor: color.white },
  text: { color: colors.white },
  imageDiv: {
    height: Dimensions.get("screen").height * 0.5,
    width: "95%",
    backgroundColor: color.primary,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    elevation: 1,
    marginTop: 2,
  },
  dataDiv: {
    height: Dimensions.get("screen").height * 0.2,
    width: "100%",
    backgroundColor: color.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  commentDiv: {
    width: "95%",
    backgroundColor: color.lightgrey,
    paddingTop: 25,
    borderRadius: 25,
    flex: 1,
    alignSelf: "center",
  },
  imageBackgroundDiv: {
    elevation: 15,
    borderRadius: 80,
    marginTop: 15,
  },
  title: {
    color: color.white,
    fontWeight: "200",
    fontSize: 24,
    textTransform: "capitalize",
  },
  emailView: {
    color: color.lightgrey,
    fontSize: 18,
    marginVertical: 5,
  },
  dept: {
    fontSize: 14,
    color: color.lightgrey,
    paddingLeft: 2,
  },
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
    alignSelf: "flex-end",
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  ratingView: {
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
  },
  Data: {
    fontSize: 20,
    fontWeight: "900",
  },
  infoView: {
    padding: 25,
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
  subText: {
    color: colors.lightgrey,
  },
  timeStamp: {
    fontSize: 12,
  },
});
export default TeacherProfileScreen;
