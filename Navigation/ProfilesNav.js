import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/Profile";
const ProfilesStack = createStackNavigator();

const ProfilesNav = () => {
    return (
        <ProfilesStack.Navigator>
            <ProfilesStack.Screen
                name="Profile"
                component={Profile}
                options={{ title: "Profile" }}
            />
        </ProfilesStack.Navigator>
    );
};

export default ProfilesNav;
