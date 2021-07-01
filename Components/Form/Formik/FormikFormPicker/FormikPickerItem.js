import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

function FormikPickerItem({ item, label, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}> {label} </Text>
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
