import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/colors";

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={{ fontSize: 32 }}>
        <AntDesign name="plus" size={20} color="black" />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: colors.backgroundColor,
    borderRadius: 100,
    position: "absolute",
    bottom: 40,
    right: 40,
    elevation: 5,
  },
});

export default AddButton;
