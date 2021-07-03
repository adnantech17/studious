import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import MaterialList from "../Screens/MaterialList";
import NewMaterialScreen from "../Screens/NewMaterialScreen";
import ViewMaterialScreen from "../Screens/ViewMaterialScreen";
const MaterialsStack = createStackNavigator();

const MaterialsNav = () => {
  return (
    <MaterialsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
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
      <MaterialsStack.Screen
        name="ViewMaterial"
        component={ViewMaterialScreen}
        options={{ title: "Material Details" }}
      />
    </MaterialsStack.Navigator>
  );
};

export default MaterialsNav;
