import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TextInput,
  Text,
  Image,
} from "react-native";
import { ActivityIndicator, List, Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../config/colors";
import {
  serachByDept,
  showSelectedTeacherData,
  fetchTeacherData,
  fetchTeacherRating,
  clearTeachers,
} from "../actions/DataActions";

function SearchScreen({ route, navigation }) {
  const { type, deptcode } = route.params;
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchType, setSearchType] = useState(type);
  const [teacherList, setTeacherList] = useState([]);
  const searchRef = useRef();

  const profileComments = useSelector((state) => state.Data.comments);
  const list = useSelector((state) => state.Data.list);
  const deptList = useSelector((state) => state.Data.teachers);
  const sID = useSelector((state) => state.Auth.user.email);

  useEffect(() => {
    dispatch(clearTeachers());

    if (searchType == "search") searchRef.current.focus();
    else {
      teacherList.length = 0;
      setLoading(true);
      dispatch(serachByDept(deptcode, setLoading, setNotFound));
    }
  }, []);

  const onChangeSearch = (query) => {
    if (searchQuery.length <= 1) {
      setSearchType("search");
      setNotFound(false);
    }

    handleFilter();
    setSearchQuery(query);
  };

  const handleFilter = () => {
    const toFind = searchQuery.toLowerCase();
    setTeacherList(
      list.filter((v) => (v = v.name.toLowerCase().includes(toFind)))
    );
  };

  const onShowHandler = (tdata) => {
    setLoading(true);
    profileComments.length = 0;
    dispatch(fetchTeacherData(tdata.id));
    dispatch(fetchTeacherRating(tdata.id, sID));
    dispatch(showSelectedTeacherData(tdata.id, navigation, setLoading));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={color.primary} />

      <View style={styles.mainView}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={color.primary}
          onPress={() => navigation.navigate("TabNavigator")}
        />

        <TextInput
          placeholder="Search..."
          ref={searchRef}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          onSubmitEditing={() => {
            if (teacherList.length) return setNotFound(false);
            setNotFound(true);
          }}
        />
      </View>

      <View style={styles.cardView}>
        <ActivityIndicator animating={isLoading} color={color.primary} />

        {notFound ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              style={{ width: 200, height: 200 }}
              source={require("../assets/not_found.jpg")}
            />
            <Text style={{ fontSize: 18, color: color.darkgrey }}>
              No Result Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={searchType === "search" ? teacherList : deptList}
            keyExtractor={(key) => key.id.toString()}
            ListFooterComponent={<View style={{ height: 10 }} />}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                left={() =>
                  searchType === "search" ? (
                    <Avatar.Icon
                      size={50}
                      icon="magnify"
                      color={color.primary}
                      style={{
                        backgroundColor: color.white,
                        borderColor: color.primary,
                        borderWidth: 0.1,
                      }}
                    />
                  ) : (
                    <Avatar.Image
                      size={50}
                      style={{ backgroundColor: color.lightgrey }}
                      source={{ uri: item.imgURL }}
                    />
                  )
                }
                onPress={() => onShowHandler(item)}
                rippleColor={color.primaryLight}
              />
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
    width: "100%",
    paddingHorizontal: 10,
  },
  mainView: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    borderRadius: 20,
    flex: 0.98,
    height: 40,
    backgroundColor: color.white,
    elevation: 2,
    paddingLeft: 10,
  },
  cardView: {
    flex: 1,
  },
  card: {
    height: 270,
    marginBottom: 10,
  },
});
export default SearchScreen;
