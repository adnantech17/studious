import React, { useState } from "react";
import { Text, StyleSheet, Button, View, ToastAndroid } from "react-native";
import * as Yup from "yup";
import { connect } from "react-redux";

import { auth } from "../Configs/firebase.config";
import FormikForm from "../Components/Form/Formik/FormikForm";
import FormikFormField from "../Components/Form/Formik/FormikFormField";
import FormikSubmitButton from "../Components/Form/Formik/FormikSubmitButton";
import FormikErrorMessage from "../Components/Form/Formik/FormikErrorMessage";
import FormikPasswordField from "../Components/Form/Formik/FormikPasswordField";


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

const SignIn = ({ navigation, currentUser, loadingState }) => {
    const[loginFailed, setLoginFailed] = useState(false);

    const login = ({email, password}) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
                ToastAndroid.show("Log in successful!", ToastAndroid.SHORT);
            })
            .catch((err) => {
                console.log(err);
                setLoginFailed(true);
            });
    };

    return (
        !loadingState && (
            <View style={styles.container}>
                <Text>Studious</Text>
                <Text>Welcome</Text>
                <FormikForm
                    initialValues = {{email: "", password: ""}}
                    onSubmit = {login}
                    validationSchema = {signInSchema}
                >
                    <FormikErrorMessage error = "Incorrect email or password" visible = {loginFailed} />
                    <FormikFormField
                        placeholder={"Email"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        name = "email"
                    />
                    <FormikPasswordField
                        placeholder={"Password"}
                        name = "password"
                    />
                    <FormikSubmitButton style={styles.button} title="Sign In"/>
                </FormikForm>
                <Text>Don't have an account?</Text>
                <Button
                    style={styles.button}
                    title="Register"
                    onPress={() => {
                        console.log(navigation);
                        navigation.replace("Register");
                    }}
                />
            </View>
        )
    );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    loadingState: state.user.loadingState,
});

export default connect(mapStateToProps)(SignIn);
