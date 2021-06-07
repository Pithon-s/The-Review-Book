import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import firebase from "firebase";

import colors from "../config/colors";
import validateEmail from "../utilities/validateEmail";
const iconSize = 85;

const height = Dimensions.get("screen").height;

function ForgotPasswordScreen({}) {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(true);

  const handleSubmit = () => {
    if (!email || !validateEmail(email)) return;
    setLoading(true);

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert("Recovery email sent", "Please check you email."))
      .catch((error) => {
        Alert.alert("Password reset failed !!", error.message);
      });

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.primary} />
      <View style={styles.topContainer}>
        <View
          style={{
            top: iconSize / 2,
            borderRadius: iconSize / 2,
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
          onChangeText={(email) => {
            setEmail(email);

            if (!validateEmail(email)) setIsInvalidEmail(false);
            else setIsInvalidEmail(true);
          }}
          error={!isInvalidEmail}
          placeholder="xxxx-xxx-xxx@cuilahore.edu.pk"
          keyboardType="email-address"
          style={styles.textField}
          theme={{
            colors: { primary: colors.primary },
          }}
        />
        <HelperText type="error" visible={!isInvalidEmail}>
          Use domain xxxx-xxx-xxx@cuilahore.edu.pk
        </HelperText>

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
    marginTop: 20,
  },
  topContainer: {
    height: height * 0.25,
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
    alignItems: "center",
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
