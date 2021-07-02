import React from "react";
import { useFormikContext } from "formik";
import { View, StyleSheet, Text } from "react-native";

import FormikPicker from "./FormikPicker";
import FormikErrorMessage from "../FormikErrorMessage";

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
    <View style={styles.container}>
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
    </View>
  );
}

export default FormikFormPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: "100%",
    marginLeft: 80,
  },
});
