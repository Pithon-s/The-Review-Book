import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button } from "react-native-paper";

import colors from "../config/colors";
import PopUpDialog from "../components/PopUpDialog";

const width = Dimensions.get("screen").width;

function ContactUsScreen({ isVisible, setIsVisible }) {
  const handleContinue = () => {
    setIsVisible(false);
  };

  return (
    <PopUpDialog
      icon={require("../assets/email.png")}
      iconSize={80}
      flexVal={0.85}
      visible={isVisible}
      title="Contact Us"
      onDismiss={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <ScrollView style={styles.textContainer}>
          <Text
            style={[
              styles.msgText,
              { textAlign: "center", fontWeight: "bold", marginTop: 10 },
            ]}
          >
            {"Want To Get In Touch?"}
          </Text>

          <Text style={[styles.msgText, { textAlign: "center" }]}>
            We'd love to hear from you. Here's how you can reach us...
          </Text>

          <Text
            style={[styles.msgText, { fontWeight: "bold", marginBottom: 0 }]}
          >
            {"\nEmail:"}
          </Text>
          <Text style={styles.msgText}>info.thereviewbook@gmail.com</Text>

          <Text
            style={[styles.msgText, { fontWeight: "bold", marginBottom: 0 }]}
          >
            Best Regards:
          </Text>
          <Text style={styles.msgText}>Team Reviewbook</Text>
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
            close
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
    paddingHorizontal: 15,
  },
  button: {
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
  },
  textContainer: {
    flex: 0.8,
    overflow: "hidden",
  },
  msgText: {
    textAlign: "justify",
    color: "#262626",
    fontSize: 16,
    marginBottom: 15,
  },
});

export default ContactUsScreen;
