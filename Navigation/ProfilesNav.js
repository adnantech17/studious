import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/Profile/Profile";
import Details from "../Screens/Profile/Details";
import EditScreen from "../Screens/Profile/EditScreen";

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
        name="EditScreen"
        component={EditScreen}
        options={{ title: "Edit" }}
      />
    </ProfilesStack.Navigator>
  );
};

export default ProfilesNav;
