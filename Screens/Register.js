import React, { useState } from "react";
import { Text, StyleSheet, Button, View, TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";
import * as Yup from "yup";

import { auth, firestore } from "../Configs/firebase.config";
import FormikForm from "../Components/Form/Formik/FormikForm";
import FormikErrorMessage from "../Components/Form/Formik/FormikErrorMessage";
import FormikSubmitButton from "../Components/Form/Formik/FormikSubmitButton";
import FormikFormField from "../Components/Form/Formik/FormikFormField";
import FormikPasswordField from "../Components/Form/Formik/FormikPasswordField";

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

export const Register = ({ navigation }) => {
    const [registrationFailed, setRegistrationFailed] = useState(false);
    const [registrationFailError, setRegistrationFailError] = useState("");

    const signUp = ({firstName, lastName, email, password}) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firestore.collection("users").doc(auth.currentUser.uid).set({
                    firstName,
                    lastName,
                    email,
                });
                navigation.push("Profile");
            })
            .catch((err) => {
                console.log(err);
                setRegistrationFailed(true);
                setRegistrationFailError(err);
            });
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <FormikForm
                initialValues = {{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "", 
                    confirmPassword: "",
                }}
                validationSchema = {registerSchema}
                onSubmit = {signUp}
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
            <Text>Already have an account?</Text>
            <Button
                style={styles.button}
                title="Log in"
                onPress={() => {
                    navigation.replace("Sign In");
                }} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
});

export default Register;
