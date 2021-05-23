import React, { useEffect } from "react";
import { View, StyleSheet, TouchableHighlight, Alert } from "react-native";
import { Avatar } from "react-native-paper";
import * as imagePicker from "expo-image-picker";

import colors from "../config/colors";
//import colors from "../config/colors";

function ImagePicker({ imageUri, setImageUri }) {
  useEffect(() => {
    imagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) => {
      console.log(status);
    });
  }, []);

  const pickImage = async () => {
    try {
      imagePicker
        .launchImageLibraryAsync({
          mediaTypes: imagePicker.MediaTypeOptions.Images,
          quality: 0.5,
          allowsMultipleSelection: false,
        })
        .then(({ cancelled, uri }) => {
          if (!cancelled) setImageUri(uri);
        });
    } catch (error) {
      Alert.alert(
        "Error !!!",
        "An unexpected error occurred while picking your image."
      );
    }
  };

  const handleOnPress = () => {
    !imageUri
      ? pickImage()
      : Alert.alert("Delete", "Are you sure?", [
          { text: "No" },
          {
            text: "Yes",
            onPress: () => setImageUri(null),
          },
        ]);
  };

  return (
    <TouchableHighlight onPress={() => handleOnPress()} underlayColor="#F0F0F0">
      <View style={styles.container}>
        {imageUri && <Avatar.Image size={80} source={{ uri: imageUri }} />}
        {!imageUri && (
          <Avatar.Image
            size={80}
            source={require("../assets/user2.png")}
            theme={{
              colors: { primary: "transparent" },
            }}
          />
        )}
        {!imageUri && (
          <Avatar.Icon
            icon="plus"
            size={25}
            color={colors.white}
            theme={{
              colors: { primary: colors.primaryLight },
            }}
            style={{ position: "absolute", bottom: 60, left: 65 }}
          />
        )}
        {imageUri && (
          <Avatar.Icon
            icon="close"
            size={25}
            color={colors.white}
            theme={{
              colors: { primary: colors.danger },
            }}
            style={{ position: "absolute", bottom: 55, left: 55 }}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderRadius: 40,
    // borderWidth: 3,
    // borderColor: colors.primaryLight,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
