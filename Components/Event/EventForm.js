import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import * as Yup from "yup";

import FormikForm from "../Form/Formik/FormikForm";
import FormikFormField from "../Form/Formik/FormikFormField";
import FormikSubmitButton from "../Form/Formik/FormikSubmitButton";
import FormikErrorMessage from "../Form/Formik/FormikErrorMessage";
import colors from "../../assets/colors";
import AppButton from "../reusable/Appbutton";
import FormikFormPicker from "../Form/Formik/FormikFormPicker/FormikFormPicker";

const eventSchema = Yup.object().shape({
  id: Yup
        .string()
        .required(),
  title: Yup
        .string()
        .required("Please enter a title."),
  description: Yup.string(),
  venue: Yup.string(),
  repeatEvent: Yup.object().required(),
  date: Yup.date().required("Please pick a date."),
  time: Yup.date(),
});

const inputFields = () => {
  const title = useRef();
  const description = useRef();
  const venue = useRef();

  return {
    title,
    description,
    venue,
  };
};

const repeatEventOptions = [
    {
        label : "Never",
        value : 0,
    },
    {
        label : "Weekly",
        value : 1,
    },
    {
        label : "Every Other Week",
        value : 2,
    },
    {
        label : "Monthly",
        value : 3,
    },
]

const INITIAL_VALUES = () =>{ 
    console.log("Loaded", new Date().toString());
    return ({
        id: new Date().toString(),
        title: "",
        description: "",
        venue: "",
        repeatEvent: {
            label : "Never",
            value : 0,
        },
        date: null,
        time: null,
    })
}

const EventForm = ({ 
    item,
    handleSubmit,
    handleCancel,
    submitButtonLabel = "Add",
    cancelButtonLabel = "Discard",
}) => {
  const fields = inputFields();
  const initialValues = item ? item : INITIAL_VALUES();
  useEffect(() => {
    setTimeout(() => fields.title.current?.focus(), 100);
  }, [])

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={eventSchema}
      onSubmit={handleSubmit}
    >
      <FormikFormField
        ref={fields.title}
        placeholder={"Event Title"}
        autoCapitalize="words"
        keyboardType="default"
        name="title"
        onSubmitEditing={() => fields.description.current?.focus()}
      />
      <FormikFormField
        ref={fields.description}
        placeholder={"Description"}
        keyboardType="default"
        name="description"
        onSubmitEditing={() => fields.venue.current?.focus()}
      />
      <FormikFormField
        ref={fields.venue}
        placeholder={"Venue"}
        keyboardType="default"
        name="venue"
      />
      <FormikFormPicker
        items = {repeatEventOptions}
        name = "repeatEvent"
      />
      <FormikSubmitButton
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        title={submitButtonLabel}
      />
      <AppButton
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        title={cancelButtonLabel}
        onPress = {handleCancel}
      />
    </FormikForm>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 12,
    paddingHorizontal: "32%",
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.darkgray,
  },
});

export default EventForm;
