import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const AddButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.addButton} onPress={onPress}>
            <Text style={{ fontSize: 32 }}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addButton: {
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        backgroundColor: "#fff",
        borderRadius: 32,
        position: "absolute",
        bottom: 24,
        right: 24,
    },
});

export default AddButton;
