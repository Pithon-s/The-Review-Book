import React from "react";
import { View, StyleSheet } from "react-native";
const Stack = createStackNavigator();
function ProfileNavigation(props) {
  return (
    <Stack.Navigator initialRouteName="main">
      <Stack.Screen name="main" component={MainScreen} />
      <Stack.Screen name="t-profile" component={TeacherProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({ maincontainer: {} });
export default ProfileNavigation;
