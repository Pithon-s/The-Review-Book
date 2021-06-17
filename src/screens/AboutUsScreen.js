import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import PopUpDialog from "../components/PopUpDialog";

const width = Dimensions.get("screen").width;

function AboutUsScreen({ isVisible, setIsVisible }) {
  const handleContinue = () => {
    setIsVisible(false);
  };

  return (
    <PopUpDialog
      icon={require("../assets/group.png")}
      iconSize={80}
      flexVal={0.93}
      visible={isVisible}
      title="About Us"
      onDismiss={() => setIsVisible(false)}
    >
      <View style={styles.container}>
        <ScrollView style={styles.textContainer}>
          <Text style={[styles.msgText, { textAlign: "center" }]}>
            {`A warm and heartiest welcome to \n“The Review Book”`}
          </Text>
          <Text style={styles.msgText}>
            {`The core purpose of this application is to assist students of CUI. \nApplication gathers and contains the experiences of the students with their faculty members. Reviewbook will help students in finding their supervisors, mentors, etc. Furthermore students will now no need to waste time in Facebook groups while asking about the teachers. \n\nWe, as the developers and founders of “The Review Book” will always expect the positive impact of this platform on our prestigious institute. \n\nLet’s make promise to ourselves that we’ll use this platform positively for the betterment and assistance ofstudents.`}
          </Text>
          {/* <Text style={styles.msgText}>
            {"Contact us: \ninfo.thereviewbook@gmail.com"}
          </Text> */}
          <Text style={styles.msgText}>{"Best Regards \nTeam Reviewbook"}</Text>
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
    marginBottom: 10,
  },
});

export default AboutUsScreen;
