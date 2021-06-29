import firebase from "firebase";
import { Alert } from "react-native";

import secureStorage from "../utilities/secureStorage";
import selectAvatar from "../utilities/selectAvatar";

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
const _createUser = async (email, password, username, imageURI) => {
  let current = firebase.auth().currentUser;
  let db = firebase.firestore();

  db.collection("tokens").doc(email).set({
    password,
  });

  if (!imageURI) {
    const avatar = selectAvatar();

    db.collection("users")
      .doc(email)
      .set({ email, username })
      .then(() => {
        current.updateProfile({
          displayName: username,
          photoURL: avatar,
        });
      });

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
          db.collection("users")
            .doc(email)
            .set({ email, username, profilePictureURI: downloadURI })
            .then(() => {
              current.updateProfile({
                displayName: username,
                photoURL: downloadURI,
              });
            });
        });
      });
  });
};

export const Login = (email, password, keepSigned, type) => {
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
        dispatch({
          type: "LOGIN",
          payload: {
            email,
            username: current.user.displayName,
            profilePictureURI: current.user.photoURL,
          },
        });

        // login action is required multiple places,
        // so to differentiate usage type is requried
        if (!current.user.emailVerified && type != "again") {
          dispatch(sendVerification());
        } else if (current.user.emailVerified) {
          if (keepSigned) secureStorage.storeUser({ email, password });

          dispatch({
            type: "USER_VERIFIED",
          });
        } else {
          Alert.alert(
            "Login Failed",
            "Possible reason, your email is not verified. "
          );
        }
      })
      .catch((error) => {
        secureStorage.removeUser();
        dispatch({
          type: "LOGIN_FAILED",
        });

        if (error.code == "auth/user-not-found")
          Alert.alert(
            "Login Failed",
            "There is no user record corresponding to this email."
          );
        else if (error.code == "auth/wrong-password")
          Alert.alert("Login Failed", "Wrong Password.");
        else Alert.alert("Login Failed", error.message);
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
      .then(() => {
        _createUser(email, password, username, imageURI).then(() => {
          dispatch(sendVerification());

          dispatch({
            type: "SIGNUP",
            payload: {
              email,
            },
          });

          resetForm();
          setImageUri(null);
        });
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use")
          Alert.alert(
            "Registration Failed",
            "Email already in use. \nUse 'Forget Password' to recover your account.'."
          );
        else if (error.code == "auth/weak-password")
          Alert.alert(
            "Registration Failed",
            "Password MUST be atleast 6 characters long."
          );
        else Alert.alert("Registration Failed", error.message);
      })
      .finally(() => {
        dispatch({
          type: "SET_LOADING",
          payload: {
            value: false,
          },
        });
      });
  };
};
export const Logout = () => {
  return async (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        secureStorage.removeUser();
        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((error) => console.log(error));
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

export const Verified = () => {
  return async (dispatch) => {
    dispatch({
      type: "USER_VERIFIED",
    });
  };
};
