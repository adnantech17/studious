import { TouchableOpacity, Text } from "react-native";
import React from "react";

const AppButton = ({ onPress, title, appBtn, appBtnTxt }) => (
  <TouchableOpacity onPress={onPress} style={appBtn}>
    <Text style={appBtnTxt}>{title}</Text>
  </TouchableOpacity>
);

export default AppButton;
