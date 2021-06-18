import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../../../assets/colors";

const FormikErrorMessage = ({
  error,
  visible,
  style,
  forceSpace,
  ...otherProps
}) => {
  if (!visible || !error)
    return forceSpace ? <Text style={styles.text} /> : null;

  return (
    <Text style={[styles.error, style]} {...otherProps}>
      {error}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: { color: colors.lightred, width: "80%", paddingLeft: 20 },
  text: {
    height: 20,
  },
});

export default FormikErrorMessage;
