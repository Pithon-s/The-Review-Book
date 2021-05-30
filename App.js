import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import AppLoading from "expo-app-loading";
import { Provider, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import NavigationTheme from "./src/navigations/NavigationTheme";
import AuthNavigation from "./src/navigations/AuthNavigation";
import ProfileNavigation from "./src/navigations/ProfileNavigation";
import Reducers from "./src/reducers";

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

const NavigationImp = () => {
  const isLogged = useSelector((state) => state.Auth.isLogged);

  return (
    <NavigationContainer theme={NavigationTheme}>
      {isLogged ? <ProfileNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  LogBox.ignoreLogs([""]);

  const store = createStore(Reducers, applyMiddleware(thunk));

  useEffect(() => {
    if (!firebase.app.length) firebaseConfig();
  }, []);

  const authUser = async () => {
    firebaseConfig();

    // add autologin here
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
    <Provider store={store}>
      <NavigationImp />
    </Provider>
  );
}
