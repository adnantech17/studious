import { useFormikContext } from "formik";
import React from "react";
import {} from "react-native";
import Attachment from "../../Materials/Attachment";

const FormikAttachment = ({ name }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <Attachment
      attachment={values[name]}
      setAttachment={(file) => setFieldValue(name, file)}
    />
  );
};

export default FormikAttachment;
