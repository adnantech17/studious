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
import { getDateText, getTimeText, incrementDate } from "../../Utils/date.utils";
import {
  REPEAT_DAILY,
  REPEAT_EVERY_OTHER_WEEK,
  REPEAT_MONTHLY,
  REPEAT_NEVER,
  REPEAT_WEEKLY,
} from "../../Utils/Event/repeat.utils";

const eventSchema = Yup.object().shape({
  id: Yup.string().required(),
  title: Yup.string().required("Please enter a title."),
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
];

const INITIAL_VALUES = () => {
  return {
    id: new Date().toString(),
    title: "",
    description: "",
    venue: "",
    repeatEvent: REPEAT_NEVER,
    date: incrementDate(new Date(), 1),
    time: new Date(),
  };
};

const EventForm = ({
  item,
  handleSubmit,
  handleCancel,
  submitButtonLabel = "ADD",
  cancelButtonLabel = "DISCARD",
}) => {
  const fields = inputFields();
  const initialValues = item ? item : INITIAL_VALUES();
  useEffect(() => {
    setTimeout(() => fields.title.current?.focus(), 100);
  }, []);

  return (
    <View style={styles.container}>
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
        <FormikFormPicker items={repeatEventOptions} name="repeatEvent" />
        <View style={styles.time}>
          <FormikDateTimePicker
            name="date"
            mode="date"
            icon="calendar"
            getText={getDateText}
            minimumDate = {new Date()}
          />
          <FormikDateTimePicker
            name="time"
            mode="time"
            icon="time"
            getText={getTimeText}
          />
        </View>
        <View style={styles.buttons}>
          <AppButton
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            title={cancelButtonLabel}
            onPress={handleCancel}
          />
          <FormikSubmitButton
            buttonStyle={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
            title={submitButtonLabel}
          />
        </View>
      </FormikForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 13,
    borderRadius: 100,
    marginVertical: 50,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "39%",
    marginHorizontal: 5,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonTextStyle: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.darkgray,
  },
  time: {
    display: "flex",
    width: "80%",
    flexDirection: "row",
  },
});

export default EventForm;
