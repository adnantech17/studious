import React from "react";
import { Button} from "react-native";
import { useFormikContext} from "formik";

function FormikSubmitButton({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} onPress={handleSubmit} {...otherProps}/>;
}

export default FormikSubmitButton;
