import React, { useState } from "react";
import { StyleSheet } from "react-native";

import * as Yup from "yup";

import FormikForm from "../Form/Formik/FormikForm";
import FormikFormField from "../Form/Formik/FormikFormField";
import FormikSubmitButton from "../Form/Formik/FormikSubmitButton";
import FormikErrorMessage from "../Form/Formik/FormikErrorMessage";
import FormikPasswordField from "../Form/Formik/FormikPasswordField";

const registerSchema = Yup.object().shape(
    {
        firstName: Yup
                .string()
                .required("Required!"),
        lastName: Yup
                .string()
                .required("Required!"),
        email: Yup
                .string()
                .required("Please enter your email.")
                .email("Invalid email address!"),
        password: Yup
                .string()
                .required("Please enter your password.")
                .min(6,"Too short!"),
        confirmPassword: Yup
                        .string()
                        .required("Please confirm your Password")
                        .oneOf([Yup.ref("password"), null], "Passwords must match!")
    }
)

const RegisterForm = ({handleSignUp}) => {
    const [registrationFailed, setRegistrationFailed] = useState(false);
    const [registrationFailError, setRegistrationFailError] = useState("");

    const handleSubmit = ({firstName, lastName, email, password}) => {
        handleSignUp(
            firstName,
            lastName,
            email,
            password,
            setRegistrationFailed,
            setRegistrationFailError
        );
    }

    return (
        <FormikForm
            initialValues = {{
                firstName: "",
                lastName: "",
                email: "",
                password: "", 
                confirmPassword: "",
            }}
            validationSchema = {registerSchema}
            onSubmit = {handleSubmit}
        >
            <FormikErrorMessage error = {registrationFailError.toString()} visible = {registrationFailed}/>
            <FormikFormField
                placeholder={"First Name"}
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="default"
                textContentType="givenName"
                name = "firstName"
            />
            <FormikFormField
                placeholder={"Last Name"}
                autoCapitalize="words"
                autoCorrect={false}
                keyboardType="default"
                textContentType="familyName"
                name = "lastName"
            />
            <FormikFormField
                placeholder={"Email"}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                name = "email"
            />
            <FormikPasswordField
                placeholder = "Password"
                name = "password"
            />
            <FormikPasswordField
                placeholder={"Confrim Password"}
                name = "confirmPassword"
            />
            <FormikSubmitButton
                style={styles.button}
                title="Register"
            />
        </FormikForm>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
});

export default RegisterForm;

