import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../../reusable/Appbutton";

const FormikSubmitButton = ({ title, buttonStyle, textStyle }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      buttonStyle={buttonStyle}
      textStyle={textStyle}
      title={title}
      onPress={handleSubmit}
    />
  );
};

export default FormikSubmitButton;
