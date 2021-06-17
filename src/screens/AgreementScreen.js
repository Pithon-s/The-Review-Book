import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button } from "react-native-paper";

import colors from "../config/colors";
import PopUpDialog from "../components/PopUpDialog";

const width = Dimensions.get("screen").width;

const terms = [
  "Abusive language and disrespectful comments are strictly prohibited.",
  "If a user has given single or same stars to every teacher then it will be considered as spam and fake.",
  "Fake ratings will be notified and deleted immediately by the admin panel.",
  "In case of violation of any rule, the individual would be responsible for the consequences and his/her account would be suspended immediately.",
  "Be humble, honest and always respect your teachers.",
];

function AgreementScreen({ isVisible, setIsVisible, setIsAgree }) {
  const handleContinue = () => {
    setIsAgree(true);
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
        <ScrollView style={styles.textContainer}>
          <Text style={styles.msgText}>
            • Abusive language and disrespectful comments are strictly
            prohibited.
          </Text>
          <Text style={styles.msgText}>
            • If a user has given single or same stars to every teacher then it
            will be considered as spam and fake.
          </Text>
          <Text style={styles.msgText}>
            • Fake ratings will be notified and deleted immediately by the admin
            panel.
          </Text>
          <Text style={styles.msgText}>
            • In case of violation of any rule, the individual would be
            responsible for the consequences and his/her account would be
            suspended immediately.
          </Text>
          <Text style={styles.msgText}>
            • Be humble, honest and always respect your teachers.
          </Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.button}
            theme={{
              colors: { primary: colors.primary },
            }}
          >
            i agree
          </Button>
        </View>
      </View>
    </PopUpDialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    width: width * 0.85,
    padding: 10,
  },
  button: {
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 0.15,
    justifyContent: "center",
  },
  textContainer: {
    flex: 0.85,
    overflow: "hidden",
  },
  msgText: {
    color: "#262626",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default AgreementScreen;
