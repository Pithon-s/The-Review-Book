import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import colors from "../config/colors";

const stack = createStackNavigator();
const AuthNavigation = () => (
  <stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Register"
  >
    <stack.Screen name="Login" component={LoginScreen} />
    <stack.Screen
      name="Register"
      options={{
        headerShown: true,
        headerTransparent: true,
        title: "Register Now",
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontSize: 24,
        },
      }}
      component={RegisterScreen}
    />
    <stack.Screen
      name="ForgetPassword"
      options={{
        headerShown: true,
        headerTransparent: true,
        title: "Reset Your Password",
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontSize: 24,
        },
      }}
      component={ForgotPasswordScreen}
    />
  </stack.Navigator>
);

export default AuthNavigation;
