import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { LogBox, Text, View, StyleSheet } from "react-native";
import firebase from "firebase";
import AppLoading from "expo-app-loading";
import MainScreen from "./src/screen/MainScreen";

// const firebaseConfig = () => {
//   firebase.initializeApp({
//     apiKey: "AIzaSyDqNkSJMtZmaE4F_cA9u1_ZOwZJGtpFkoY",
//     authDomain: "the-review-book.firebaseapp.com",
//     projectId: "the-review-book",
//     storageBucket: "the-review-book.appspot.com",
//     messagingSenderId: "475844666441",
//     appId: "1:475844666441:web:bcb6d27e3a098fabb48b98",
//     measurementId: "G-XZ1J7062DV",
//   });
// };

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
const Stack = createStackNavigator();
export default function App() {
  ///asdasdasd
  //   const [isReady, setIsReady] = useState(false);
  //   LogBox.ignoreLogs([""]);

  //   useEffect(() => {
  //     if (!firebase.app.length) firebaseConfig();
  //   }, []);

  //   const authUser = async () => {
  //     firebaseConfig();
  //     /*
  //     const result = await secureStorage.readUser();
  //     if (!result) return;
  //     const parsed = JSON.parse(result);

  //     setUser(parsed);
  //     _logIn(parsed.email, parsed.password, setUser);
  // */
  //   };

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={authUser}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.log("")}
  //     />
  //   );
  // }

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <LoginScreen />
    </View>
=======
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="mainscreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="mainscreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> bilal
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
