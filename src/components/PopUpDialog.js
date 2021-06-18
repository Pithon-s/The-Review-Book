import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Modal, Portal } from "react-native-paper";

import colors from "../config/colors";

const height = Dimensions.get("screen").height;

function PopUpDialog({
  title,
  flexVal = 0.85,
  children,
  icon,
  iconSize = 70,
  roundIcon = true,
  visible,
  onDismiss,
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          alignSelf: "center",
        }}
      >
        <View style={[styles.container, { flex: flexVal }]}>
          <View style={styles.topContainer}>
            <Text style={styles.topTitle}>{title}</Text>
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
                  borderRadius: roundIcon ? iconSize / 2 : 0,
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
