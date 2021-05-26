import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import color from "../config/colors";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import MainScreen from "../screens/MainScreen";

const Tab = createMaterialBottomTabNavigator();
// const Stack = createStackNavigator();
// const StackNavigator = () => (
//   <Stack.Navigator initialRouteName="main">
//     <Stack.Screen name="main" component={MainScreen} />
//     <Stack.Screen name="t-profile" component={TeacherProfileScreen} />
//   </Stack.Navigator>
// );
const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    shifting={true}
    activeColor={color.white}
    inactiveColor={color.secondary}
    barStyle={{ backgroundColor: color.secondary }}
  >
    <Tab.Screen
      name="Home"
      component={MainScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: () => <Entypo name="home" color={color.white} size={20} />,
      }}
    />

    <Tab.Screen
      name="Account"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Account",
        tabBarIcon: () => (
          <MaterialCommunityIcons
            name="account"
            color={color.white}
            size={24}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
