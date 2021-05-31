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
            .set({ email, username, imageURI: downloadURI });
        });
      });
  });
};

export const Login = (email, password, keepSigned, setLoading) => {
  return async (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((current) => {
        if (keepSigned) secureStorage.storeUser({ email, password });

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
      .catch((error) => {
        setLoading(false);
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

export const Signup = (
  username,
  imageURI,
  email,
  password,
  setLoading,
  setIsModelVisible
) => {
  return async (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((current) => {
        _createUser(email, username, imageURI)
          .then(() => {
            current.user.sendEmailVerification().then(() => {
              setLoading(false);
              setIsModelVisible(true);
            });

            dispatch({
              type: "SIGNUP",
              payload: {
                email,
                username,
                // profilePictureURI : download able profile picture URI
              },
            });
          })
          .catch(() => {
            setLoading(false);
            setIsModelVisible(true);
          });
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error !!", error.message);
      });
  };
};

// export

export const AutoLogin = () => {
  return async (dispatch) => {
    console.log("inside auto login");

    const result = await secureStorage.readUser();
    if (!result) {
      console.log("auto login failed");
      dispatch({
        type: "AUTO_LOGIN_FAILED",
      });
      return;
    }

    console.log("auto login passed");
    const parsed = JSON.parse(result);
    dispatch(Login(parsed.email, parsed.password, false));
  };
};
