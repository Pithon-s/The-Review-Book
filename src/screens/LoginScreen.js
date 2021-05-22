import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Checkbox, TextInput } from "react-native-paper";

import colors from "../config/colors";
import Screen from "../components/common/Screen";
import Seperator from "../components/common/Seperator";

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

function LoginScreen({}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [keepLogged, setKeepLogged] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <Screen style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.black} />
      <View style={styles.logoContainer}></View>
      <View style={styles.fieldContainer}>
        <TextInput
          mode="outlined"
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
        <TextInput
          mode="outlined"
          label="Enter your passwrod"
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder=""
          secureTextEntry
          style={[styles.textField, { marginVertical: 10 }]}
          theme={{
            colors: { primary: colors.primary },
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            status={keepLogged ? "checked" : "unchecked"}
            color={colors.primary}
            onPress={() => {
              setKeepLogged(!keepLogged);
            }}
          />
          <Text style={styles.text}>Keep me signed in</Text>
        </View>

        <View style={styles.buttonsConatiner}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() => alert("sign in pressed.. TODO")}
            style={[styles.button, { width: 120 }]}
            theme={{
              colors: { primary: colors.primary },
            }}
          >
            sign in
          </Button>

          <Button
            mode="text"
            onPress={() => alert("forget password pressed.. TODO")}
            style={styles.button}
            theme={{
              colors: { primary: colors.primary },
            }}
          >
            forget password?
          </Button>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.seperator} />
          <Text numberOfLines={1} style={styles.or}>
            {"  Don't have an account  "}
          </Text>
          <View style={styles.seperator} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  button: {
    height: 40,
    justifyContent: "center",
  },
  buttonsConatiner: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    height: height * 0.25,
  },
  fieldContainer: {
    height: height * 0.35,
    width: width * 0.9,
    alignSelf: "center",
  },
  bottomContainer: {
    height: height * 0.4,
    width: width * 0.9,
    alignSelf: "center",
  },
  textField: {
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 16,
    color: colors.darkgrey,
  },
  or: {
    fontSize: 16,
    color: colors.darkgrey,
  },
  seperator: {
    backgroundColor: colors.darkgrey,
    height: 1,
    flex: 1,
  },
});

export default LoginScreen;
