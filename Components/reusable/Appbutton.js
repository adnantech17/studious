import { TouchableOpacity, Text } from "react-native";
import React from "react";

const AppButton = ({ onPress, title, buttonStyle, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={buttonStyle}>
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
);

export default AppButton;
