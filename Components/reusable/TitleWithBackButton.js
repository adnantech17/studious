import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TitleWithBackButton = ({onPress, title}) => {
    return (
        <View style = {styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onPress}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View style = {styles.headerText}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: { 
        fontSize: 30, 
        fontWeight: "600",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    headerText: {
        flex: 1,
        marginLeft: 40,
    },
    backButton: { 
        top : 1,
        left: 25, 
    },
})

export default TitleWithBackButton;