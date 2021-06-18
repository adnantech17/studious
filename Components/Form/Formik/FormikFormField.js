import React, { forwardRef } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import FormikErrorMessage from "./FormikErrorMessage";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../assets/colors";

const FormikFormField = (
  { name, leftIcon, rightIcon, rightIconOnPress, hidePassword, ...otherProps },
  ref
) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <AntDesign
          style={styles.leftIcon}
          name={leftIcon}
          size={20}
          color="black"
        />
        <TextInput
          ref={ref}
          onBlur={() => setFieldTouched(name)}
          onFocus={() => setFieldTouched(name, false)}
          onChangeText={(text) => setFieldValue(name, text)}
          placeholderTextColor={colors.lightgray}
          value={values[name]}
          style={styles.field}
          {...otherProps}
        />
        {rightIcon && (
          <TouchableOpacity onPress={rightIconOnPress} style={styles.eye}>
            <Entypo name={rightIcon} size={16} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <FormikErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "80%",
    elevation: 50,
  },
  input: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    borderColor: "black",
    borderRadius: 100,
    paddingHorizontal: 16,
    height: 50,
    alignItems: "center",
  },
  field: {
    marginLeft: 7,
    width: "85%",
  },
});

export default forwardRef(FormikFormField);
