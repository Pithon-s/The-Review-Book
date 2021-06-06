import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, TextInput, HelperText, Provider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import colors from "../config/colors";
import { AnonymousLogin, Login } from "../actions/AuthActions";
import EmailVerificationScreen from "./EmailVerificationScreen";
import validateEmail from "../utilities/validateEmail";
import CheckboxWithDesc from "../components/CheckboxWithDesc";

const height = Dimensions.get("screen").height;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [keepLogged, setKeepLogged] = useState(true);
  const [isInvalidEmail, setIsInvalidEmail] = useState(true);
  const [anonymousLoading, setAnonymousLoading] = useState(false);

  const isLoading = useSelector((state) => state.Auth.isLoading);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!email || !password || !validateEmail(email)) return;

    dispatch(Login(email.toLowerCase(), password, keepLogged, "login_screen"));
  };

  const handleAnonymous = () => {
    dispatch(AnonymousLogin(setAnonymousLoading));
  };

  return (
    <Provider>
      <ScrollView style={styles.container}>
        <EmailVerificationScreen />

        <StatusBar style="light" backgroundColor={colors.primary} />
        <View style={styles.logoContainer}></View>
        <View style={styles.fieldContainer}>
          <TextInput
            mode="outlined"
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

          <TextInput
            mode="outlined"
            label="Enter your password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder=""
            secureTextEntry
            style={[styles.textField, { marginBottom: 10 }]}
            theme={{
              colors: { primary: colors.primary },
            }}
          />

          <CheckboxWithDesc
            status={keepLogged}
            description="Keep me signed in"
            handlePress={() => {
              setKeepLogged(!keepLogged);
            }}
          />

          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              loading={isLoading}
              onPress={handleSubmit}
              style={[styles.button, { width: 120 }]}
              theme={{
                colors: { primary: colors.primary },
              }}
            >
              sign in
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate("ForgetPassword")}
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
            onPress={() => navigation.navigate("Register")}
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
            onPress={handleAnonymous}
            style={[styles.button, { width: "100%" }]}
            loading={anonymousLoading}
            icon="lock"
            theme={{
              colors: { primary: colors.primary },
            }}
          >
            <Text style={{ color: colors.primary }}>log in anonymously</Text>
          </Button>
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
  },
  button: {
    borderRadius: 20,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    height: height * 0.25,
    justifyContent: "center",
    alignItems: "center",
  },

  fieldContainer: {
    justifyContent: "center",
    height: height * 0.4,
    width: "90%",
    alignSelf: "center",
  },
  bottomContainer: {
    justifyContent: "center",
    height: height * 0.3,
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
