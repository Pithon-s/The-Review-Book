import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import AppLoading from "expo-app-loading";

import NavigationTheme from "./src/navigations/NavigationTheme";
import AuthNavigation from "./src/navigations/AuthNavigation";
import { StateProvider } from "./src/hooks/useUser";
import ProfileNavigation from "./src/navigations/ProfileNavigation";
//done

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
  const [user, setUser] = useState();
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
    <StateProvider user={user} setUser={setUser}>
      <NavigationContainer theme={NavigationTheme}>
        {user ? <ProfileNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </StateProvider>
  );
}
