import React from "react";
import { TextInput } from "react-native";
import { useFormikContext } from "formik";

import FormikErrorMessage from "./FormikErrorMessage";

function FormikFormField({ name, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onFocus= {() => setFieldTouched(name,false)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />
      <FormikErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormikFormField;
