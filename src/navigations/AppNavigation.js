import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import color from "../config/colors";
import ProfileScreen from "../screens/ProfileScreen";
import MainScreen from "../screens/MainScreen";

const Tab = createMaterialBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    shifting={true}
    activeColor={color.white}
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
