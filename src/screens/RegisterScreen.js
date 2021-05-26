import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { Formik } from "formik";

import ImagePicker from "../components/ImagePicker";
import FormTextInput from "../components/common/FormTextInput";
import colors from "../config/colors";
import { color } from "react-native-reanimated";

const height = Dimensions.get("screen").height;

function RegisterScreen({ navigation }) {
  const [imageUri, setImageUri] = useState();
  const [loading, setLoading] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setRegistrationFailed(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ImagePicker imageUri={imageUri} setImageUri={setImageUri} />
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
                    {"ALREADY HAVE AN ACCOUNT  "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={{ color: colors.primary, fontWeight: "bold" }}>
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
    paddingBottom: 5,
  },
  bottomContainer: {
    alignSelf: "center",
    paddingBottom: 50,
    width: "90%",
  },
  textField: {
    backgroundColor: colors.white,
    marginTop: 5,
  },
  errortext: {
    alignSelf: "center",
    color: colors.danger,
    fontSize: 16,
  },
});

export default RegisterScreen;
