import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import * as Yup from "yup";

import FormikForm from "../Form/Formik/FormikForm";
import FormikFormField from "../Form/Formik/FormikFormField";
import FormikSubmitButton from "../Form/Formik/FormikSubmitButton";
import FormikErrorMessage from "../Form/Formik/FormikErrorMessage";
import FormikPasswordField from "../Form/Formik/FormikPasswordField";
import colors from "../../assets/colors";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string()
    .required("Please enter your email.")
    .email("Invalid email address!"),
  password: Yup.string()
    .required("Please enter your password.")
    .min(6, "Too short!"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match!"),
});

const inputFields = () => {
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };
};

const RegisterForm = ({ handleSignUp }) => {
  const handleSubmit = ({ firstName, lastName, email, password }) => {
    handleSignUp(
      firstName,
      lastName,
      email,
      password,
      setRegistrationFailed,
      setRegistrationFailError
    );
  };

  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [registrationFailError, setRegistrationFailError] = useState("");

  const fields = inputFields();

  return (
    <FormikForm
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      <FormikErrorMessage
        error={registrationFailError.toString()}
        visible={registrationFailed}
      />
      <View style={styles.name}>
        <View style={styles.nameChild}>
          <FormikFormField
            ref={fields.firstName}
            placeholder={"First Name"}
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
            textContentType="givenName"
            name="firstName"
            style={styles.nameField}
            leftIcon="user"
            // forceSpace={true}
            onSubmitEditing={() => fields.lastName.current?.focus()}
          />
          <FormikFormField
            ref={fields.lastName}
            placeholder={"Last Name"}
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
            textContentType="familyName"
            name="lastName"
            // forceSpace={true}
            style={styles.nameField}
            onSubmitEditing={() => fields.email.current?.focus()}
          />
        </View>
      </View>
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
        placeholder="Password"
        name="password"
        onSubmitEditing={() => fields.confirmPassword.current?.focus()}
      />
      <FormikPasswordField
        ref={fields.confirmPassword}
        placeholder={"Confrim Password"}
        name="confirmPassword"
      />
      <FormikSubmitButton
        appBtn={styles.appBtn}
        appBtnTxt={styles.appBtnTxt}
        title="SIGN UP"
      />
    </FormikForm>
  );
};

const styles = StyleSheet.create({
  name: {
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
  appBtn: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 12,
    paddingHorizontal: "32%",
    borderRadius: 100,
    marginTop: 40,
    marginBottom: 10,
  },
  nameChild: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appBtnTxt: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    color: colors.darkgray,
  },
  nameField: {
    alignContent: "center",
    justifyContent: "center",
    width: "49%",
  },
});

export default RegisterForm;
