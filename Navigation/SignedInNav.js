import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventsNav from "./EventsNav";
import TodosNav from "./TodosNav";
import MaterialsNav from "./MaterialsNav";
import ProfilesNav from "./ProfilesNav";
const Tab = createBottomTabNavigator();

const SignedInNav = () => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen name="Events" component={EventsNav} />
            <Tab.Screen name="Todos" component={TodosNav} />
            <Tab.Screen name="Materials" component={MaterialsNav} />
            <Tab.Screen name="Profile" component={ProfilesNav} />
        </Tab.Navigator>
    );
};

export default SignedInNav;
