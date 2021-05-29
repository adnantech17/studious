import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import MaterialList from "../Screens/MaterialList";
const MaterialsStack = createStackNavigator();

const MaterialsNav = () => {
    return (
        <MaterialsStack.Navigator>
            <MaterialsStack.Screen
                name="Materials"
                component={MaterialList}
                options={{ title: "Material List" }}
            />
        </MaterialsStack.Navigator>
    );
};

export default MaterialsNav;
