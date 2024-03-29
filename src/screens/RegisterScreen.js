import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import ImagePicker from "../components/ImagePicker";
import FormTextInput from "../components/common/FormTextInput";
import colors from "../config/colors";
import EmailVerificationScreen from "./EmailVerificationScreen";
import { Signup } from "../actions/AuthActions";
import validateEmail from "../utilities/validateEmail";
import CheckboxWithDesc from "../components/CheckboxWithDesc";
import TextWithTouchable from "../components/TextWithTouchable";
import AgreementScreen from "./AgreementScreen";
import ContactUsScreen from "./ContactUsScreen";

const height = Dimensions.get("screen").height;
const iconSize = 95;

function RegisterScreen({ navigation }) {
  const [imageUri, setImageUri] = useState();
  const [isAgree, setIsAgree] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [pressableColor, setPressableColor] = useState("#9BAFE8");

  const isLoading = useSelector((state) => state.Auth.isLoading);
  const dispatch = useDispatch();

  const handleSubmit = (data, { resetForm }) => {
    if (
      isLoading ||
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword ||
      !validateEmail(data.email)
    )
      return;

    dispatch(
      Signup(
        data.username,
        imageUri,
        data.email.toLowerCase(),
        data.password.toLowerCase(),
        resetForm,
        setImageUri
      )
    );
  };

  return (
    <View style={styles.container}>
      <EmailVerificationScreen />
      <AgreementScreen
        isVisible={showTerms}
        setIsVisible={setShowTerms}
        setIsAgree={setIsAgree}
      />
      <ContactUsScreen
        isVisible={showContactUs}
        setIsVisible={setShowContactUs}
      />

      <View style={styles.topContainer}>
        <Pressable
          onPress={() => setShowContactUs(true)}
          onPressIn={() => setPressableColor(colors.white)}
          onPressOut={() => setPressableColor("#9BAFE8")}
          style={styles.contactUs}
        >
          <MaterialIcons name="email" size={20} color={pressableColor} />
          <Text style={{ color: pressableColor, fontSize: 14 }}>
            Contact Us
          </Text>
        </Pressable>

        <View style={styles.iconContainer}>
          <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
        </View>
      </View>
      <View style={{ height: 45 }} />
      <ScrollView>
        <View style={styles.bottomContainer}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, setFieldValue, values, touched }) => (
              <View>
                <FormTextInput
                  mode="flat"
                  label="Public name"
                  title="username"
                  placeholder="Username to show with comments"
                  error={!values["username"] && touched["username"]}
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
                  error={
                    (!values["email"] && touched["email"]) || !isInvalidEmail
                  }
                  onChangeText={(email) => {
                    setFieldValue("email", email);

                    if (!validateEmail(email)) setIsInvalidEmail(false);
                    else setIsInvalidEmail(true);
                  }}
                  style={styles.textField}
                  theme={{
                    colors: { primary: colors.primary },
                  }}
                />

                {!isInvalidEmail ? (
                  <HelperText type="error" style={{ marginBottom: -15 }}>
                    Use domain xxxx-xxx-xxx@cuilahore.edu.pk
                  </HelperText>
                ) : (
                  <HelperText type="info" style={{ marginBottom: -15 }}>
                    Your email and SID is completely CONFIDENTIAL
                  </HelperText>
                )}

                <FormTextInput
                  mode="flat"
                  label="Password"
                  title="password"
                  secureTextEntry={!showPassword}
                  style={styles.textField}
                  error={!values["password"] && touched["password"]}
                  theme={{
                    colors: { primary: colors.primary },
                  }}
                  right={
                    <TextInput.Icon
                      name={() => (
                        <Ionicons
                          name={
                            showPassword
                              ? "ios-eye-off-outline"
                              : "ios-eye-outline"
                          }
                          size={20}
                          color={colors.darkgrey}
                        />
                      )}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />

                <FormTextInput
                  mode="flat"
                  label="Confirm Password"
                  title="confirmPassword"
                  secureTextEntry={!showPassword}
                  style={styles.textField}
                  error={values["password"] !== values["confirmPassword"]}
                  theme={{
                    colors: { primary: colors.primary },
                  }}
                  right={
                    <TextInput.Icon
                      name={() => (
                        <Ionicons
                          name={
                            showPassword
                              ? "ios-eye-off-outline"
                              : "ios-eye-outline"
                          }
                          size={20}
                          color={colors.darkgrey}
                        />
                      )}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />

                <CheckboxWithDesc
                  status={isAgree}
                  fontSize={14}
                  style={{ marginVertical: 10 }}
                  descriptionComp={
                    <TextWithTouchable
                      description="I agree to "
                      touchableDescription="terms and conditions"
                      handlePress={() => setShowTerms(true)}
                    />
                  }
                  handlePress={() => {
                    setIsAgree(!isAgree);
                  }}
                />

                <Button
                  mode="contained"
                  loading={isLoading}
                  disabled={!isAgree}
                  onPress={handleSubmit}
                  style={styles.button}
                  theme={{
                    colors: { primary: colors.primary },
                  }}
                >
                  register
                </Button>

                <TextWithTouchable
                  description="ALREADY HAVE AN ACCOUNT?  "
                  touchableDescription="SIGN IN"
                  handlePress={() => navigation.navigate("Login")}
                  fontSize={14}
                  style={{ marginTop: 15, justifyContent: "center" }}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contactUs: {
    position: "absolute",
    alignSelf: "flex-end",
    alignItems: "center",
    top: 10,
    right: 10,
  },
  button: {
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
});

export default RegisterScreen;
