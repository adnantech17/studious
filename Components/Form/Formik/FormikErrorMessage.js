import React from "react";
import { Text, StyleSheet } from "react-native";

function FormikErrorMessage({ error, visible, style, ...otherProps }) {
  if (!visible || !error) return null;

  return (<Text style={[styles.error, style]} {...otherProps}>{error}</Text>)
}

const styles = StyleSheet.create({
  error: { color: "red" },
});

export default FormikErrorMessage;
