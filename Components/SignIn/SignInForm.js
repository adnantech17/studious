import React, { useState, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";
import FormikForm from "../Form/Formik/FormikForm";
import FormikFormField from "../Form/Formik/FormikFormField";
import FormikSubmitButton from "../Form/Formik/FormikSubmitButton";
import FormikErrorMessage from "../Form/Formik/FormikErrorMessage";
import FormikPasswordField from "../Form/Formik/FormikPasswordField";
import colors from "../../assets/colors";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email.")
    .email("Invalid email address!"),
  password: Yup.string().required("Please enter your password."),
});

const inputFields = () => {
  const email = useRef();
  const password = useRef();

  return {
    email,
    password,
  };
};

const SignInForm = ({ handleSignIn }) => {
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = ({ email, password }) => {
    handleSignIn(email, password, setLoginFailed);
  };

  const fields = inputFields();

  return (
    <FormikForm
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={signInSchema}
    >
      <FormikErrorMessage
        error="Incorrect email or password"
        visible={loginFailed}
      />
      <FormikFormField
        ref={fields.email}
        placeholder={"Email"}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        textContentType="emailAddress"
        name="email"
        leftIcon="mail"
        onSubmitEditing={() => fields.password.current?.focus()}
      />
      <FormikPasswordField
        ref={fields.password}
        placeholder={"Password"}
        name="password"
      />
      <Text style={styles.forgetPass}>Forget Password?</Text>
      <FormikSubmitButton
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonTextStyle}
        title="LOGIN"
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
    marginTop: 30,
    marginBottom: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.darkgray,
  },
  forgetPass: {
    color: colors.darkgray,
    alignSelf: "flex-end",
    paddingRight:50,
  },
});

export default SignInForm;
