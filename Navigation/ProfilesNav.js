import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/Profile/Profile";
import Details from "../Screens/Profile/Details";
import AboutUs from "../Screens/Profile/AboutUs";
import TermsAndPolicies from "../Screens/Profile/TermsAndPolicies";

const ProfilesStack = createStackNavigator();

const ProfilesNav = () => {
  return (
    <ProfilesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfilesStack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile" }}
      />
      <ProfilesStack.Screen
        name="Details"
        component={Details}
        options={{ title: "Details" }}
      />
      <ProfilesStack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{title: "About Us"}}
      />
      <ProfilesStack.Screen
        name="TermsAndPolicies"
        component={TermsAndPolicies}
        options={{title: "Terms and Policies"}}
      />
    </ProfilesStack.Navigator>
  );
};

export default ProfilesNav;
