import React from "react";
import { useFormikContext } from "formik";

import FormikPicker from "./FormikPicker"
import FormikErrorMessage from "../FormikErrorMessage"

function FormikFormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <FormikPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <FormikErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormikFormPicker;
