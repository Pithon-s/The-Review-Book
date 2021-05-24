import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import ImagePicker from "../components/ImagePicker";

const height = Dimensions.get("screen").height;

function RegisterScreen({}) {
  const [imageUri, setImageUri] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    height: height * 0.25,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default RegisterScreen;
