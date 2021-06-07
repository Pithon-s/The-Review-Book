import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { Checkbox } from "react-native-paper";

import colors from "../config/colors";

function CheckboxWithDesc({
  status,
  description = null,
  descriptionComp = null,
  handlePress,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      <Checkbox
        status={status ? "checked" : "unchecked"}
        color={colors.primary}
        onPress={handlePress}
      />
      {description && (
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.text}>{description}</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {descriptionComp}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: colors.darkgrey,
  },
});

export default CheckboxWithDesc;
