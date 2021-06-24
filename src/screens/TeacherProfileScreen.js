import React, { useState, useRef, createRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { List, Avatar, IconButton, TextInput } from "react-native-paper";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

import { useDispatch, useSelector } from "react-redux";
import color from "../config/colors";
import { sendComment, setRating } from "../actions/DataActions";
import timeSince from "../utilities/timeSince";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

function TeacherProfileScreen(props) {
  const [comment, setComment] = useState("");
  const [arrowVisible, setArrowVisible] = useState(true);
  const isAnonymous = useSelector((state) => state.Auth.user.isAnonymous);
  const teacherData = useSelector((state) => state.Data.teacherData);
  const profileComments = useSelector((state) => state.Data.comments);
  const userData = useSelector((state) => state.Auth.user);
  const rating = useSelector((state) => state.Data.rating);

  let id = 0;

  const textInput = createRef();
  const scrollRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setArrowVisible(false));
    Keyboard.addListener("keyboardDidHide", () => setArrowVisible(true));
  }, []);

  //----------Handlers------------
  const handleSend = () => {
    if (!comment) return;

    let commentData = {
      commentText: comment,
      imgURL: userData.profilePictureURI,
      name: userData.username,
      timeStamp: Date.now(),
    };

    dispatch(sendComment(commentData, teacherData.id));
    setComment("");
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
    let id = 0;
    for (let i = 1; i <= 5; i++)
      ratingIcons.push(
        <View style={{ marginLeft: 10 }}>
          <AntDesign
            name="star"
            size={26}
            color={i <= rating ? color.primary : color.darkgrey}
            key={id++}
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
      <ScrollView
        ref={scrollRef}
        style={styles.maincontainer}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar barStyle="dark-content" backgroundColor={color.white} />

        <View style={styles.imageDiv}>
          <IconButton
            icon="arrow-left"
            color={color.white}
            size={30}
            onPress={() => {
              props.navigation.navigate("SearchScreen");
            }}
            style={{ alignSelf: "flex-start", position: "absolute", top: 3 }}
          />
          <View style={styles.imageBackgroundDiv}>
            <Avatar.Image size={120} source={{ uri: teacherData.imgURL }} />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text
              style={[
                styles.title,
                { fontSize: teacherData.name.length > 20 ? 20 : 24 },
              ]}
            >
              {teacherData.name}
            </Text>
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
                ).toPrecision(2)}
              </Text>
              <Text style={styles.subText}>Rating</Text>
            </View>
          </View>
        </View>

        {!isAnonymous ? (
          <View style={[styles.ratingView, { paddingBottom: 20 }]}>
            <Text style={{ fontSize: 22, color: color.darkgrey }}>
              Tell us about your experience:
            </Text>
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
              height: profileComments.length === 0 ? height * 0.3 : null,
            },
          ]}
        >
          <View style={styles.commentTextInput}>
            <TextInput
              ref={textInput}
              mode="flat"
              placeholder="Comment here..."
              multiline
              disabled={isAnonymous}
              onChangeText={(text) => setComment(text)}
              style={{
                flex: 1,
                marginLeft: 10,
                backgroundColor: "transparent",
              }}
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
            data={profileComments}
            ListFooterComponent={() => <View style={{ height: 20 }} />}
            keyExtractor={() => {
              id++;
              return id.toString();
            }}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <List.Item
                title={
                  <View style={styles.commentTitle}>
                    <Text style={{ fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: color.darkgrey }}>
                      {timeSince(item.timeStamp)}
                    </Text>
                  </View>
                }
                description={item.commentText}
                descriptionStyle={{ fontSize: 16 }}
                descriptionNumberOfLines={4}
                left={() => (
                  <Avatar.Image size={55} source={{ uri: item.imgURL }} />
                )}
              />
            )}
          />
        </View>
        <View style={{ height: 20 }} />
      </ScrollView>

      {arrowVisible && (
        <MaterialCommunityIcons
          name="arrow-up"
          onPress={handleScroll}
          size={30}
          style={styles.upwardButton}
          color={color.white}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  text: {
    color: color.white,
  },
  imageDiv: {
    height: height * 0.5,
    backgroundColor: color.primary,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 25,
    elevation: 7,
  },
  commentDiv: {
    backgroundColor: color.lightgrey,
    paddingTop: 20,
    borderRadius: 25,
  },
  imageBackgroundDiv: {
    elevation: 15,
    borderRadius: 80,
    marginTop: 15,
  },
  title: {
    color: color.white,
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
  commentTextInput: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  commentTitle: {
    width: width * 0.7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  ratingView: {
    alignItems: "center",
    padding: 20,
  },
  upwardButton: {
    position: "absolute",
    backgroundColor: color.primary,
    padding: 5,
    borderRadius: 20,
    bottom: 15,
    right: 15,
  },
  subText: {
    color: color.lightgrey,
  },
});

export default TeacherProfileScreen;
