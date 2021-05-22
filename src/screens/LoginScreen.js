import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Checkbox, TextInput } from "react-native-paper";

import colors from "../config/colors";

const height = Dimensions.get("screen").height;

function LoginScreen({}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [keepLogged, setKeepLogged] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <ScrollView style={styles.container}>
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
          label="Enter your password"
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
          <TouchableWithoutFeedback
            onPress={() => {
              setKeepLogged(!keepLogged);
            }}
          >
            <View style={styles.checkboxContainer}>
              <Text style={styles.text}>Keep me signed in</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.buttonsContainer}>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <View style={styles.seperator} />
          <Text numberOfLines={1} style={styles.msgText}>
            {"  Don't have an account  "}
          </Text>
          <View style={styles.seperator} />
        </View>

        <Button
          mode="contained"
          onPress={() => alert("sign up pressed.. TODO")}
          style={[styles.button, { width: "100%" }]}
          theme={{
            colors: { primary: "#DDDDDD" },
          }}
        >
          <Text style={{ color: "#5F5F5F" }}>sign up</Text>
        </Button>

        <Text style={styles.or}>OR</Text>

        <Button
          mode="text"
          onPress={() => alert("anonomous pressed.. TODO")}
          style={[styles.button, { width: "100%" }]}
          icon="lock"
          theme={{
            colors: { primary: colors.primary },
          }}
        >
          <Text style={{ color: colors.primary }}>log in anonymously</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
  },
  button: {
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    height: height * 0.25,
  },
  checkboxContainer: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  fieldContainer: {
    height: height * 0.4,
    width: "90%",
    alignSelf: "center",
  },
  bottomContainer: {
    height: height * 0.35,
    width: "90%",
    alignSelf: "center",
  },
  textField: {
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 16,
    color: colors.darkgrey,
  },
  msgText: {
    fontSize: 16,
    color: colors.darkgrey,
  },
  or: {
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 10,
    fontSize: 16,
    color: colors.darkgrey,
  },
  seperator: {
    backgroundColor: colors.darkgrey,
    height: 0.7,
    flex: 1,
  },
});

export default LoginScreen;
