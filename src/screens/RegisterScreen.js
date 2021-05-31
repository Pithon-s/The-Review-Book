import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Provider } from "react-native-paper";
import { Formik } from "formik";

import ImagePicker from "../components/ImagePicker";
import FormTextInput from "../components/common/FormTextInput";
import colors from "../config/colors";
import EmailVerificationScreen from "./EmailVerificationScreen";
import { Signup } from "../actions/AuthActions";
import { useDispatch } from "react-redux";

const height = Dimensions.get("screen").height;
const iconSize = 95;

function RegisterScreen({ navigation }) {
  const [imageUri, setImageUri] = useState();
  const [loading, setLoading] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    setLoading(true);
    setRegistrationFailed(false);

    dispatch(
      Signup(
        data.name,
        imageUri,
        data.email,
        data.password,
        setLoading,
        setIsModelVisible
      )
    );
  };

  return (
    <Provider>
      <View style={styles.container}>
        <EmailVerificationScreen
          isModelVisible={isModelVisible}
          setIsModelVisible={setIsModelVisible}
        />

        <View style={styles.topContainer}>
          <View style={styles.iconContainer}>
            <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
          </View>
        </View>
        <ScrollView>
          <View style={styles.bottomContainer}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, values, touched }) => (
                <View style={styles.inputs}>
                  {registrationFailed && (
                    <Text style={styles.errortext}>Registration Failed!</Text>
                  )}

                  <FormTextInput
                    mode="flat"
                    label="Full name"
                    title="name"
                    error={!values["name"] && touched["name"]}
                    style={styles.textField}
                    theme={{
                      colors: { primary: colors.primary },
                    }}
                  />

                  <FormTextInput
                    mode="flat"
                    label="Email"
                    title="email"
                    placeholder="xxxx-xxx-xxx@cuilahore.edu.pk"
                    keyboardType="email-address"
                    error={!values["email"] && touched["email"]}
                    style={styles.textField}
                    theme={{
                      colors: { primary: colors.primary },
                    }}
                  />

                  <FormTextInput
                    mode="flat"
                    label="Password"
                    title="password"
                    secureTextEntry
                    style={styles.textField}
                    error={!values["password"] && touched["password"]}
                    theme={{
                      colors: { primary: colors.primary },
                    }}
                  />

                  <FormTextInput
                    mode="flat"
                    label="Confirm Password"
                    title="confirmPassword"
                    secureTextEntry
                    style={styles.textField}
                    error={values["password"] !== values["confirmPassword"]}
                    theme={{
                      colors: { primary: colors.primary },
                    }}
                  />

                  <Button
                    mode="contained"
                    loading={loading}
                    onPress={handleSubmit}
                    style={styles.button}
                    theme={{
                      colors: { primary: colors.primary },
                    }}
                  >
                    register
                  </Button>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 45,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: colors.darkgrey }}>
                      {"ALREADY HAVE AN ACCOUNT?  "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={{ color: "#5B7CDA", fontWeight: "bold" }}>
                        SIGN IN
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    top: 30,
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
  topContainer: {
    height: height * 0.25,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  bottomContainer: {
    alignSelf: "center",
    paddingBottom: 50,
    paddingTop: 40,
    width: "90%",
  },
  iconContainer: {
    top: iconSize / 2,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: iconSize / 2,
    width: iconSize,
    height: iconSize,
  },
  textField: {
    backgroundColor: "transparent",
    marginTop: 5,
  },
  errortext: {
    alignSelf: "center",
    color: colors.danger,
    fontSize: 16,
  },
});

export default RegisterScreen;
