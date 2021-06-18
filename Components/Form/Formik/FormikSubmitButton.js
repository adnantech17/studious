import React from "react";
import { useFormikContext } from "formik";
import AppButton from "../../reusable/Appbutton";

const FormikSubmitButton = ({ title, appBtn, appBtnTxt }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      appBtn={appBtn}
      appBtnTxt={appBtnTxt}
      title={title}
      onPress={handleSubmit}
    />
  );
};

export default FormikSubmitButton;
