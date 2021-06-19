import React, { forwardRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import FormikFormField from "./FormikFormField";
import colors from "../../../assets/colors";

const FormikPasswordField = (
  { name, placeholder = "Password", ...otherProps },
  ref
) => {
  const [hidePassword, setHidePassword] = useState(true);
  const togglePassword = () => setHidePassword(!hidePassword);
  return (
    <View style={styles.container}>
      <FormikFormField
        ref={ref}
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        secureTextEntry={hidePassword}
        rightIconOnPress={togglePassword}
        name={name}
        leftIcon="lock"
        rightIcon={hidePassword ? "eye-with-line" : "eye"}
        {...otherProps}
      />
    </View>
  );
};

export default forwardRef(FormikPasswordField);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  appBtn: {
    width: 80,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: colors.backgroundColor,
  },

  appBtnTxt: {
    fontSize: 12,
  },

  eye: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
