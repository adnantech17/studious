import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import colors from "../../assets/colors";

const AddButton = ({onPress}) => {
    return(
    <View 
        style={styles.buttonContainer} 
    >
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Feather name="plus" size={24} color="#393A3C" />
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      bottom: 32,
      right: 32,
      margin: 8,
      zIndex: 3,
    },
    button: {
      borderColor: colors.lightgray,
      borderRadius: 100,
      width: 60,
      height: 60,
      backgroundColor: colors.backgroundColor,
      alignItems: "center",
      justifyContent: "center",
      elevation: 5,
    },
});

export default AddButton;