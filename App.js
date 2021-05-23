import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { LogBox, Text, View, StyleSheet } from "react-native";
import firebase from "firebase";
import AppLoading from "expo-app-loading";

import LoginScreen from "./src/screens/LoginScreen";
import MainScreen from "./src/screens/MainScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const firebaseConfig = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyDqNkSJMtZmaE4F_cA9u1_ZOwZJGtpFkoY",
    authDomain: "the-review-book.firebaseapp.com",
    projectId: "the-review-book",
    storageBucket: "the-review-book.appspot.com",
    messagingSenderId: "475844666441",
    appId: "1:475844666441:web:bcb6d27e3a098fabb48b98",
    measurementId: "G-XZ1J7062DV",
  });
};

/*
// we can't use useAuthentication's login, because useAuthentication use useUser
// which have state (user) inside which is defined here in this file
// so using useAuthentication will create a loop of state (user), and cause ERROR.
const _logIn = (email, password) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      Alert.alert("Error !!", error.message);
    });
};
*/

export default function App() {
  const [isReady, setIsReady] = useState(false);
  LogBox.ignoreLogs([""]);

  useEffect(() => {
    if (!firebase.app.length) firebaseConfig();
  }, []);

  const authUser = async () => {
    firebaseConfig();
    /*
    const result = await secureStorage.readUser();
    if (!result) return;
    const parsed = JSON.parse(result);

    setUser(parsed);
    _logIn(parsed.email, parsed.password, setUser);
*/
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={authUser}
        onFinish={() => setIsReady(true)}
        onError={console.log("")}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      {/* <MainScreen /> */}
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
