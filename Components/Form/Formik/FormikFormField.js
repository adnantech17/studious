import React, { forwardRef} from "react";
import { TextInput } from "react-native";
import { useFormikContext } from "formik";

import FormikErrorMessage from "./FormikErrorMessage";

const FormikFormField = ({ name, ...otherProps }, ref) => {
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
        ref = {ref}
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

export default forwardRef(FormikFormField);
