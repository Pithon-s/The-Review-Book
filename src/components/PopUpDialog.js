import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";

import colors from "../config/colors";

const height = Dimensions.get("screen").height;

function PopUpDialog({
  title,
  flexVal = 0.8,
  children,
  icon,
  iconSize = 70,
  roundIcon = true,
  visible,
  onDismiss,
}) {
  return (
    <View>
      <Modal isVisible={visible} onBackdropPress={onDismiss}>
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
    </View>
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
