import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { Button, HelperText, TextInput, Provider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";
import { AnonymousLogin, Login } from "../actions/AuthActions";
import EmailVerificationScreen from "./EmailVerificationScreen";
import validateEmail from "../utilities/validateEmail";
import CheckboxWithDesc from "../components/CheckboxWithDesc";

const height = Dimensions.get("screen").height;

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [keepLogged, setKeepLogged] = useState(true);
  const [isInvalidEmail, setIsInvalidEmail] = useState(true);
  const [anonymousLoading, setAnonymousLoading] = useState(false);

  const isLoading = useSelector((state) => state.Auth.isLoading);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!email || !password || !validateEmail(email)) return;

    dispatch(
      Login(
        email.toLowerCase(),
        password.toLowerCase(),
        keepLogged,
        "login_screen"
      )
    );
  };

  const handleAnonymous = () => {
    Alert.alert(
      "Limitations",
      "With anonymous login, you can ONLY read reviews.",
      [
        { text: "Cancel" },
        {
          text: "Continue",
          onPress: () => dispatch(AnonymousLogin(setAnonymousLoading)),
        },
      ]
    );
  };

  return (
    <Provider>
      {/* <ScrollView style={styles.container}> */}
      <View style={styles.container}>
        <EmailVerificationScreen />

        <StatusBar style="light" backgroundColor={colors.primary} />
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo_blue.png")}
            style={styles.logo}
            resizeMode="center"
          />
        </View>
        <View style={styles.fieldContainer}>
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

          <TextInput
            mode="flat"
            label="Enter your password"
            value={password}
            right={
              <TextInput.Icon
                name={() => (
                  <Ionicons
                    name={
                      showPassword ? "ios-eye-off-outline" : "ios-eye-outline"
                    }
                    size={20}
                    color={colors.darkgrey}
                  />
                )}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            onChangeText={(password) => setPassword(password)}
            placeholder=""
            secureTextEntry={!showPassword}
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
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    height: height < 650 ? height * 0.3 : height * 0.25,
    justifyContent: "flex-end",
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
    height: height * 0.25,
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
  logo: {
    height: 150,
    width: 200,
  },
});

export default LoginScreen;
