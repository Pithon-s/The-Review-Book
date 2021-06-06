import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import colors from "../config/colors";
import { Login, sendVerification } from "../actions/AuthActions";
import PopUpDialog from "../components/PopUpDialog";

const height = Dimensions.get("screen").height;

function EmailVerificationScreen() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.Auth.user.email);
  const password = useSelector((state) => state.Auth.user.password);
  const isLoading = useSelector((state) => state.Auth.isLoading);

  const handleContinue = () => {
    dispatch(Login(email, password, true, "again"));
  };
  const handleResend = () => {
    dispatch(sendVerification());
  };

  return (
    <PopUpDialog icon={require("../assets/email.png")}>
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={styles.msgText}>
            We just sent you the verification link. Please check your email and
            'CONTINUE' after verify.
          </Text>

          <Button
            mode="contained"
            onPress={handleContinue}
            loading={isLoading}
            style={styles.button}
            theme={{
              colors: { primary: colors.primary },
            }}
          >
            continue
          </Button>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.darkgrey, fontSize: 16 }}>
              {"Didn't get the link?  "}
            </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text
                style={{
                  color: "#5B7CDA",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PopUpDialog>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderRadius: 20,
    width: "100%",
  },
  bottomContainer: {
    paddingTop: 60,
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

export default EmailVerificationScreen;
