import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import React from "react";
import firebase from "firebase";
import AppLoading from "expo-app-loading";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import NavigationTheme from "./src/navigations/NavigationTheme";
import AuthNavigation from "./src/navigations/AuthNavigation";
import ProfileNavigation from "./src/navigations/ProfileNavigation";
import Reducers from "./src/reducers";
import { AutoLogin } from "./src/actions/AuthActions";

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
  const isReady = useSelector((state) => state.Auth.isReady);
  const dispatch = useDispatch();

  const authUser = async () => {
    firebaseConfig();
    dispatch(AutoLogin());
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={authUser}
        onFinish={() => console.log("")}
        onError={() => console.log("")}
      />
    );
  }

  return (
    <NavigationContainer theme={NavigationTheme}>
      {isLogged ? <ProfileNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default function App() {
  LogBox.ignoreLogs([""]);

  const store = createStore(Reducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <NavigationImp />
    </Provider>
  );
}
