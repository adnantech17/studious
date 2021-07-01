import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

function FormikPickerItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: 15,
    borderBottomWidth: 0.5,
  },
});

export default FormikPickerItem;
