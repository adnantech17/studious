import React, { forwardRef } from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import FormikErrorMessage from "./FormikErrorMessage";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../assets/colors";

const FormikFormField = (
  {
    name,
    style,
    leftIcon,
    rightIcon,
    rightIconOnPress,
    hidePassword,
    forceSpace,
    ...otherProps
  },
  ref
) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <View style={[styles.container, style]}>
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
      <FormikErrorMessage
        error={errors[name]}
        forceSpace={forceSpace}
        visible={touched[name]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    borderColor: colors.lightgray,
    borderRadius: 100,
    paddingHorizontal: 16,
    height: 50,
    alignItems: "center",
  },
  field: {
    marginLeft: 7,
    width: "83%",
  },
});

export default forwardRef(FormikFormField);
