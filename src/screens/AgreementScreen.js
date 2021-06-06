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
      icon={require("../assets/terms.png")}
      roundIcon={false}
      visible={isVisible}
      title="Terms and Conditions"
      onDismiss={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={styles.msgText}>
            {"1. Koi bakchodi ni krni. " +
              "\n2. Yaki karo gai hum uni ko shekayat laga den gai. " +
              "\n3. Uni waly tumhari degree kha jain gai. " +
              "\n4. Abba ka paisa barbad. "}
          </Text>

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
    padding: 15,
  },
  button: {
    borderRadius: 20,
  },
  bottomContainer: {
    paddingTop: 60,
    flex: 1,
    width: width * 0.8,
  },
  msgText: {
    color: colors.darkgrey,
    fontSize: 16,
    marginBottom: 40,
  },
});

export default AgreementScreen;
