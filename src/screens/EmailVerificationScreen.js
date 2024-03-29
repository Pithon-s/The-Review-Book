import React from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";

import colors from "../config/colors";
import { sendVerification, Verified } from "../actions/AuthActions";
import PopUpDialog from "../components/PopUpDialog";
import TextWithTouchable from "../components/TextWithTouchable";

const height = Dimensions.get("screen").height;

function EmailVerificationScreen() {
  const dispatch = useDispatch();
  const isModelVisible = useSelector((state) => state.Auth.isModelVisible);

  const handleContinue = () => {
    const auth = firebase.auth();

    auth.currentUser.reload().then(() => {
      if (auth.currentUser.emailVerified) dispatch(Verified());
      else {
        Alert.alert(
          "Email not verified",
          "Please check your email to verify yourself. "
        );
      }
    });
  };

  const handleResend = () => {
    dispatch(sendVerification());
  };

  return (
    <PopUpDialog
      icon={require("../assets/email.png")}
      visible={isModelVisible}
      flexVal={0.75}
      title="Email Verification"
      onDismiss={() =>
        dispatch({
          type: "SET_IS_MODEL_VISIBLE",
          payload: {
            value: false,
          },
        })
      }
    >
      <View style={styles.container}>
        <View style={styles.bottomContainer}>
          <Text style={styles.msgText}>
            We just sent you the verification link. Please check your email and
            'CONTINUE' after verify.
          </Text>

          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.button}
            theme={{
              colors: { primary: colors.primary },
            }}
          >
            continue
          </Button>

          <TextWithTouchable
            description="Didn't get the link?  "
            touchableDescription="Resend code"
            fontSize={15}
            handlePress={handleResend}
            style={{
              marginTop: 15,
              justifyContent: "center",
            }}
          />
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
