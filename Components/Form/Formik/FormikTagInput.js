import { useFormikContext } from "formik";
import React from "react";
import TagInputBox from "../../Input/TagInputBox";

const FormikTagInput = ({ name }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
      <TagInputBox
        tag={values[name]}
        setTag={(arr) => setFieldValue(name, arr)}
      />
  );
};

export default FormikTagInput;
