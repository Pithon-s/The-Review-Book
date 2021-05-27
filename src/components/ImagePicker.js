import React from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import * as imagePicker from "expo-image-picker";

import colors from "../config/colors";

function ImagePicker({ imageUri, setImageUri }) {
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

  const handleOnPressImp = () => {
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

  const handleOnPress = () => {
    imagePicker.getMediaLibraryPermissionsAsync().then(({ status }) => {
      if (status != "granted") {
        imagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) => {
          if (status != "granted")
            Alert.alert("Error !!", "Media library permission required.");
          else handleOnPressImp();
        });
      } else handleOnPressImp();
    });
  };

  return (
    <TouchableOpacity onPress={() => handleOnPress()}>
      <View>
        {imageUri && <Avatar.Image size={80} source={{ uri: imageUri }} />}
        {!imageUri && (
          <Avatar.Image
            size={80}
            source={require("../assets/user.png")}
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
            style={{ position: "absolute", bottom: 55, left: 60 }}
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
            style={{ position: "absolute", bottom: 55, left: 60 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
