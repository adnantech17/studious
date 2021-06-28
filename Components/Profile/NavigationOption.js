import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const NavigationOption = ({navigation, navigateTo, title, containerStyle, textStyle, iconStyle}) => {
    return (
        <TouchableOpacity
            style={containerStyle}
            onPress={() => navigation.push(navigateTo)}
        >
            <Text style={textStyle} >
                {title}
            </Text>
            <TouchableOpacity style={iconStyle} >
                <AntDesign name="right" size={18} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default NavigationOption;