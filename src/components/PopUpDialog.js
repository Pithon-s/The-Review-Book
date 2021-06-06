import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Modal, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import colors from "../config/colors";

const height = Dimensions.get("screen").height;

function PopUpDialog({ children, icon, iconSize = 70 }) {
  const dispatch = useDispatch();
  const isModelVisible = useSelector((state) => state.Auth.isModelVisible);

  return (
    <Portal>
      <Modal
        visible={isModelVisible}
        onDismiss={() =>
          dispatch({
            type: "SET_IS_MODEL_VISIBLE",
            payload: {
              value: false,
            },
          })
        }
        contentContainerStyle={{
          alignSelf: "center",
        }}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.topTitle}>Email Verification</Text>
            <View
              style={{
                justifyContent: "flex-end",
                flex: 1,
                top: iconSize / 2,
              }}
            >
              <Image
                source={icon}
                style={{
                  borderRadius: iconSize / 2,
                  height: iconSize,
                  width: iconSize,
                }}
              />
            </View>
          </View>

          {children}
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.85,
    backgroundColor: colors.white,
  },
  topContainer: {
    alignItems: "center",
    height: height * 0.2,
    backgroundColor: colors.primary,
  },
  topTitle: {
    color: colors.white,
    fontSize: 22,
    marginTop: 30,
    fontWeight: "bold",
  },
});

export default PopUpDialog;
