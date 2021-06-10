import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import MaterialList from "../Screens/MaterialList";
import NewMaterialScreen from "../Screens/NewMaterialScreen";
const MaterialsStack = createStackNavigator();

const MaterialsNav = () => {
    return (
        <MaterialsStack.Navigator>
            <MaterialsStack.Screen
                name="Materials"
                component={MaterialList}
                options={{ title: "Material List" }}
            />
            <MaterialsStack.Screen
                name="NewMaterial"
                component={NewMaterialScreen}
                options={{ title: "Add Material" }}
            />
        </MaterialsStack.Navigator>
    );
};

export default MaterialsNav;
