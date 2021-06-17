import React, { useState, useRef } from "react";
import { StyleSheet } from "react-native";

import * as Yup from "yup";

import FormikForm from "../Form/Formik/FormikForm";
import FormikFormField from "../Form/Formik/FormikFormField";
import FormikSubmitButton from "../Form/Formik/FormikSubmitButton";
import FormikErrorMessage from "../Form/Formik/FormikErrorMessage";
import FormikPasswordField from "../Form/Formik/FormikPasswordField";

const signInSchema = Yup.object().shape(
    {
        email: Yup
            .string()
            .required("Please enter your email.")
            .email("Invalid email address!"),
        password: Yup
            .string()
            .required("Please enter your password."),
    }
)

const inputFields = () => {
    const email = useRef();
    const password = useRef();

    return {
        email,
        password,
    }
}

const SignInForm = ({handleSignIn}) => {
    const[loginFailed, setLoginFailed] = useState(false);


    const handleSubmit = ({email,password}) => {
        handleSignIn(email,password,setLoginFailed);
    }

    const fields = inputFields();
    
    return (
        <FormikForm
            initialValues = {{email: "", password: ""}}
            onSubmit = {handleSubmit}
            validationSchema = {signInSchema}
        >
            <FormikErrorMessage error = "Incorrect email or password" visible = {loginFailed} />
            <FormikFormField
                ref = {fields.email}
                placeholder={"Email"}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                name = "email"
                onSubmitEditing = {() => fields.password.current?.focus()}
            />
            <FormikPasswordField
                ref = {fields.password}
                placeholder={"Password"}
                name = "password"
            />
            <FormikSubmitButton style={styles.button} title="Sign In"/>
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

export default SignInForm;

