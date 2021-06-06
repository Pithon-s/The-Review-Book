import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-paper";

import colors from "../config/colors";
import PopUpDialog from "../components/PopUpDialog";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

function AgreementScreen({ isVisible, setIsVisible }) {
  const handleContinue = () => {
    setIsVisible(false);
  };

  return (
    <PopUpDialog
      icon={require("../assets/1425720.png")}
      roundIcon={false}
      visible={isVisible}
      title="Terms and Conditions"
      onDismiss={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={styles.msgText}>Term and conditions (TODO)</Text>

          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.button}
            theme={{
              colors: { primary: colors.primary },
            }}
          >
            continue
          </Button>
        </View>
      </View>
    </PopUpDialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.85,
    alignItems: "center",
    padding: 10,
  },
  button: {
    borderRadius: 20,
    width: width * 0.75,
  },
  bottomContainer: {
    paddingTop: 60,
    flex: 1,
  },
  msgText: {
    color: colors.darkgrey,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
});

export default AgreementScreen;
