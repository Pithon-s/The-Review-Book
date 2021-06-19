import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./AppNavigation";
import TeacherProfileScreen from "../screens/TeacherProfileScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator();
function ProfileNavigation(props) {
  return (
    <Stack.Navigator
      initialRoute="TabNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TabNavigator" component={AppNavigator} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="TeacherProfile" component={TeacherProfileScreen} />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;
