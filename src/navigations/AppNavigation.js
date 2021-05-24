import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import ProfileScreen from "../screens/ProfileScreen";
import MainScreen from "../screens/MainScreen";

const Tab = createMaterialBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator initialRouteName="MainScreen" shifting={true}>
    <Tab.Screen
      name="Home"
      component={MainScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <Entypo name="home" color={color} size={20} />
        ),
      }}
    />

    <Tab.Screen
      name="Account"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Account",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
