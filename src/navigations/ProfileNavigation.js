import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./AppNavigation";
import TeacherProfileScreen from "../screens/TeacherProfileScreen";

const Stack = createStackNavigator();
function ProfileNavigation(props) {
  return (
    <Stack.Navigator
      initialRoute="TabNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigator" component={AppNavigator} />
      <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({ maincontainer: {} });
export default ProfileNavigation;
