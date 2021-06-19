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
    initialRouteName="Login"
  >
    <stack.Screen name="Login" component={LoginScreen} />
    <stack.Screen
      name="Register"
      options={{
        headerShown: true,
        headerTransparent: true,
        title: "Register Now",
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 24,
          width: "65%",
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
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 24,
        },
      }}
      component={ForgotPasswordScreen}
    />
    {/* <stack.Screen name="Verification" component={EmailVerificationScreen} /> */}
  </stack.Navigator>
);

export default AuthNavigation;
