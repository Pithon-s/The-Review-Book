import firebase from "firebase";
import { Alert } from "react-native";

import secureStorage from "../utilities/secureStorage";

export const Login = (email, password, keepSigned) => {
  return async (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((current) => {
        if (keepSigned) {
          secureStorage.storeUser({ email, password });
        }

        // firebase
        //   .database()                        //FIRESTORE  --TODO
        //   .ref("/users/" + current.uid)
        //   .once("value")
        //   .then((snapshot) => {
        //     dispatch({
        //       type: "LOGIN",
        //       payload: {
        //         email,
        //         username: snapshot.val().username,
        //         profilePictureURI: snapshot.val().profilePictureURI,
        //       },
        //     });
        //   });

        dispatch({
          type: "LOGIN",
          payload: {
            email,
          },
        });
      })
      .catch((error) => Alert.alert("Error !!", error.message));
  };
};

export const Logout = () => {
  return async (dispatch) => {
    secureStorage.removeUser();
    dispatch({
      type: "LOGOUT",
    });
  };
};

export const Signin = () => {
  return async (dispatch) => {};
};

export const AutoLogin = () => {
  return async (dispatch) => {
    console.log("inside auto login");

    const result = await secureStorage.readUser();
    if (!result) {
      console.log("auto login failed");
      dispatch({
        type: "AUTO_LOGIN_FAILED",
      });
    }

    const parsed = JSON.parse(result);
    dispatch(Login(parsed.email, parsed.password, true));
  };
};
