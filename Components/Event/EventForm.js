import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import * as Yup from "yup";

import FormikForm from "../Form/Formik/FormikForm";
import FormikFormField from "../Form/Formik/FormikFormField";
import FormikSubmitButton from "../Form/Formik/FormikSubmitButton";
import colors from "../../assets/colors";
import AppButton from "../reusable/Appbutton";
import FormikFormPicker from "../Form/Formik/FormikFormPicker/FormikFormPicker";
import FormikDateTimePicker from "../Form/Formik/FormikDateTimePicker";
import { getDateText, getTimeText } from "../../Utils/date.utils";
import { REPEAT_DAILY, REPEAT_EVERY_OTHER_WEEK, REPEAT_MONTHLY, REPEAT_NEVER, REPEAT_WEEKLY } from "../../Utils/Event/repeat.utils";

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
  time: Yup.date().required("Please pick a time."),
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
    REPEAT_NEVER,
    REPEAT_DAILY,
    REPEAT_WEEKLY,
    REPEAT_EVERY_OTHER_WEEK,
    REPEAT_MONTHLY,
]

const INITIAL_VALUES = () => { 
    return ({
        id: new Date().toString(),
        title: "",
        description: "",
        venue: "",
        repeatEvent: REPEAT_NEVER,
        date: new Date(),
        time: new Date(),
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
      <FormikDateTimePicker
        name = "date"
        mode = "date"
        icon = "calendar"
        getText = {getDateText}
      />
      <FormikDateTimePicker
        name = "time"
        mode = "time"
        icon = "time"
        getText = {getTimeText}
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
    paddingHorizontal: "10%",
    borderRadius: 100,
    marginVertical: 5,
    marginHorizontal: "30%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.darkgray,
  },
});

export default EventForm;
