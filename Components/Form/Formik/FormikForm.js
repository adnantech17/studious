import React from "react";
import { Formik } from "formik";

function FormikForm({ initialValues, onSubmit, validationSchema, children, ...otherProps }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      {...otherProps}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default FormikForm;
