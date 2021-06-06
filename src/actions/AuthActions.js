import firebase from "firebase";
import { Alert } from "react-native";

import secureStorage from "../utilities/secureStorage";

const _uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new Error("uriToBlob failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};
const _createUser = async (email, username, imageURI) => {
  if (!imageURI) {
    firebase
      .firestore()
      .collection("users")
      .doc(email)
      .set({ email, username });

    return;
  }

  let newPostImagesDir = firebase.storage().ref("users/" + email + "/");
  const fileType = imageURI.substring(imageURI.lastIndexOf(".") + 1);

  _uriToBlob(imageURI).then((blob) => {
    newPostImagesDir
      .child("profile_picture." + fileType)
      .put(blob, {
        contentType: "image/" + fileType,
      })
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadURI) => {
          firebase
            .firestore()
            .collection("users")
            .doc(email)
            .set({ email, username, profilePictureURI: downloadURI });
        });
      });
  });
};

export const Login = (email, password, keepSigned, type) => {
  console.log("login started");
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        value: true,
      },
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((current) => {
        console.log("logged in");
        firebase
          .firestore()
          .collection("users")
          .doc(email)
          .get()
          .then((doc) => {
            dispatch({
              type: "SET_LOADING",
              payload: {
                value: false,
              },
            });

            if (doc.exists) {
              console.log("firestore read successful.");
              dispatch({
                type: "LOGIN",
                payload: {
                  email,
                  password,
                  username: doc.data().username,
                  profilePictureURI: doc.data().profilePictureURI,
                },
              });
            }

            console.log("verifing user.");
            // login action is required multiple places,
            // so to differentiate usage type is requried
            if (!current.user.emailVerified && type != "again") {
              dispatch(sendVerification());
              console.log("verification failed, sending verification email.");
            } else if (current.user.emailVerified) {
              if (keepSigned) secureStorage.storeUser({ email, password });
              console.log("verification successful");

              dispatch({
                type: "USER_VERIFIED",
              });
            } else {
              Alert.alert(
                "Login Failed",
                "Possible reason, your email is not verified. "
              );
            }
          });
      })
      .catch((error) => {
        secureStorage.removeUser();
        dispatch({
          type: "LOGIN_FAILED",
        });
        Alert.alert("Error !!", error.message);
      });
  };
};
export const AnonymousLogin = (setAnonymousLoading) => {
  setAnonymousLoading(true);
  return async (dispatch) => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        setAnonymousLoading(false);
        dispatch({
          type: "ANONYMOUS_LOGIN",
        });
      })
      .catch((error) => {
        setAnonymousLoading(false);
        Alert.alert("Anonymous Login Failed", error.message);
      });
  };
};
export const Signup = (
  username,
  imageURI,
  email,
  password,
  resetForm,
  setImageUri
) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_LOADING",
      payload: {
        value: true,
      },
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((current) => {
        _createUser(email, username, imageURI)
          .then(() => {
            dispatch(sendVerification());

            dispatch({
              type: "SIGNUP",
              payload: {
                email,
                password,
              },
            });

            resetForm();
            setImageUri(null);
          })
          .catch(() => {
            console.log("user creation on firebase failed !!!");
            dispatch({
              type: "SET_LOADING",
              payload: {
                value: false,
              },
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: "SET_LOADING",
          payload: {
            value: false,
          },
        });

        Alert.alert("Error !!", error.message);
      });
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

export const sendVerification = () => {
  return async (dispatch) => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        dispatch({
          type: "VERIFICATION_SENT",
        });
      });
  };
};
export const Verified = () => {
  return async (dispatch) => {
    dispatch({
      type: "USER_VERIFIED",
    });
  };
};
export const AutoLogin = () => {
  return async (dispatch) => {
    const result = await secureStorage.readUser();
    if (!result) {
      dispatch({
        type: "LOGIN_FAILED",
      });
      return;
    }

    const parsed = JSON.parse(result);
    dispatch(Login(parsed.email, parsed.password, false, "auto_login"));
  };
};
