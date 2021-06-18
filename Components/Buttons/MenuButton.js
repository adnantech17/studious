import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const MenuButton = ({ title, onPress, name }) => {
    return (
        <TouchableOpacity style={styles.buttons} onPress={onPress}>
            <Ionicons style={styles.icon} name={name} size={32} color="gray" />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        marginHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
    },

    icon: {
        marginRight: 8,
    },

    text: {
        fontSize: 18,
        marginLeft: 10,
    },
});

export default MenuButton;
