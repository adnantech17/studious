import React, { useRef, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import * as Yup from "yup";

import FormikForm from "../Form/Formik/FormikForm";
import FormikFormField from "../Form/Formik/FormikFormField";
import FormikSubmitButton from "../Form/Formik/FormikSubmitButton";
import colors from "../../assets/colors";
import FormikTagInput from "../Form/Formik/FormikTagInput";
import FormikFormPicker from "../Form/Formik/FormikFormPicker/FormikFormPicker";
import FormikAttachment from "../Form/Formik/FormikAttachment";
import AppButton from "../reusable/Appbutton";
import { formatDate } from "../../Utils/date.utils";

const materialSchema = Yup.object().shape({
  id: Yup.string().required(),
  title: Yup.string().trim().required("Please enter a title."),
  description: Yup.string(),
  tags: Yup.array().of(Yup.string()),
  datetime: Yup.date(),
  course: Yup.object().nullable().required("Please select a course."),
});

const inputFields = () => {
  const title = useRef();
  const description = useRef();

  return {
    title,
    description,
  };
};

const MaterialForm = ({
  item,
  courses,
  selectedCourse,
  handleSubmit,
  submitButtonLabel = "ADD",
  handleCancel,
  cancelButtonLabel = "DISCARD",
}) => {
  const fields = inputFields();

  const initialValues = item
    ? {
        ...item,
        datetime: formatDate(item.datetime),
      }
    : {
        id: "mat-" + new Date().getTime(),
        title: "",
        description: "",
        attachment: null,
        tags: [],
        datetime: new Date(),
        course: selectedCourse ? selectedCourse : null,
      };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={materialSchema}
      onSubmit={handleSubmit}
    >
      <FormikFormField
        ref={fields.title}
        onSubmitEditing={() => fields.description?.current.focus()}
        name="title"
        placeholder="Title"
        autoCapitalize="words"
        autoCorrect={false}
        keyboardType="default"
      />
      <FormikFormField
        ref={fields.description}
        name="description"
        placeholder="Description"
        keyboardType="default"
        multiline={true}
        numberOfLines={5}
      />
      <View
        style={{
          borderWidth: 1,
          marginVertical: 10,
          borderRadius: 60,
          paddingHorizontal: 25,
          paddingVertical: 5,
          height: 50,
          width: "80%",
        }}
      >
        <FormikTagInput name="tags" />
      </View>
      <FormikFormPicker
        placeholder="Course"
        items={courses}
        name="course"
        keyExtractor={(course) => course.id.toString()}
        labelProperty="title"
      />
      <FormikAttachment name="attachment" />
      <View style={styles.buttons}>
        <AppButton
          title={cancelButtonLabel}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={handleCancel}
        />
        <FormikSubmitButton
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          title="SAVE"
        />
      </View>
    </FormikForm>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 12,
    paddingHorizontal: "11.5%",
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.darkgray,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default MaterialForm;
