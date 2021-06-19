import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import firebase from "firebase";
import AppLoading from "expo-app-loading";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { LogBox } from "react-native";

import NavigationTheme from "./src/navigations/NavigationTheme";
import AuthNavigation from "./src/navigations/AuthNavigation";
import ProfileNavigation from "./src/navigations/ProfileNavigation";
import Reducers from "./src/reducers";
import { AutoLogin } from "./src/actions/AuthActions";
import { fetchTeachersList } from "./src/actions/DataActions";

const firebaseConfig = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyC6-BGVSAFcLsRSmBHSRPut5BO_s58QyZY",
    authDomain: "the-review-book-f2959.firebaseapp.com",
    projectId: "the-review-book-f2959",
    storageBucket: "the-review-book-f2959.appspot.com",
    messagingSenderId: "984255567435",
    appId: "1:984255567435:web:3c3c7c22ee5f31e7a09fce",
    measurementId: "G-N7E3JE7128",
  });
};

const NavigationImp = () => {
  const isLogged = useSelector((state) => state.Auth.isLogged);
  const isReady = useSelector((state) => state.Auth.isReady);
  const dispatch = useDispatch();

  const authUser = async () => {
    firebaseConfig();
    dispatch(AutoLogin());
    dispatch(fetchTeachersList());
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
  const store = createStore(Reducers, applyMiddleware(thunk));
  LogBox.ignoreLogs([
    "Setting a timer for a long period of time",
    "VirtualizedLists should never be nested inside",
    'Each child in a list should have a unique "key" prop',
    "undefined is not a function (near '...}).catch(function (error) {...')",
    "Function Query.where() called with invalid data",
  ]);

  return (
    <Provider store={store}>
      <NavigationImp />
    </Provider>
  );
}
