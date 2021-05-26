import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";
const iconSize = 85;

const height = Dimensions.get("screen").height;

function ForgotPasswordScreen({}) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setLoading(true);

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert("Note !!", "Please check you email."))
      .catch((error) => {
        Alert.alert("Error !!", error.message);
      });

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.primary} />
      <View style={styles.topContainer}>
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
            top: iconSize / 2,
          }}
        >
          <Image
            source={require("../assets/lock.png")}
            style={{
              height: iconSize,
              width: iconSize,
              borderRadius: iconSize / 2,
            }}
          />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.msgText}>
          Please enter your email address. We will send you an email to reset
          your password
        </Text>

        <TextInput
          mode="flat"
          label="Enter your email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder="xxxx-xxx-xxx@cuilahore.edu.pk"
          keyboardType="email-address"
          style={styles.textField}
          theme={{
            colors: { primary: colors.primary },
          }}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          style={styles.button}
          theme={{
            colors: { primary: colors.primary },
          }}
        >
          Send email
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  button: {
    borderRadius: 20,
    width: "100%",
    marginTop: 30,
  },
  topContainer: {
    alignItems: "center",
    height: height * 0.25,
    backgroundColor: colors.primary,
  },
  topTitle: {
    color: colors.white,
    fontSize: 22,
    marginTop: 30,
    fontWeight: "bold",
  },
  textField: {
    backgroundColor: colors.white,
  },
  bottomContainer: {
    paddingTop: 80,
    height: height * 0.75,
    alignSelf: "center",
    width: "85%",
  },
  msgText: {
    color: colors.darkgrey,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
  },
});

export default ForgotPasswordScreen;
