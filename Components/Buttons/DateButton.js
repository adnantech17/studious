import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const DateButton = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons style={{ marginRight: 4 }} name={icon} size={20} color="gray" />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 12,
    marginRight: 10,
    paddingVertical: 8,
    justifyContent: "center",
  },
});

export default DateButton;
