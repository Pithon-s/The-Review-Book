import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function TextWithTouchable({
  description,
  touchableDescription,
  handlePress,
  fontSize,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={{ color: colors.darkgrey, fontSize }}>{description}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: "#5B7CDA", fontWeight: "bold", fontSize }}>
          {touchableDescription}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TextWithTouchable;
