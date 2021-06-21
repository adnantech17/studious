import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../Screens/SignIn";
import Register from "../Screens/Register";
import Profile from "../Screens/Profile";
import ForgetPassword from "../Screens/ForgetPassword";
const AuthStack = createStackNavigator();

const SignedOutNav = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="Sign In"
        component={SignIn}
        options={{ title: "Login" }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ title: "Create Account" }}
      />
      <AuthStack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
      <AuthStack.Screen
        name="Forget Password"
        component={ForgetPassword}
        options={{ title: "Forget Password" }}
      />

    </AuthStack.Navigator>
  );
};

export default SignedOutNav;
