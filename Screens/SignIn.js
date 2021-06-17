import React, { useState } from "react";
import { Text, StyleSheet, Button, View, ToastAndroid } from "react-native";
import * as Yup from "yup";
import { connect } from "react-redux";

import { auth } from "../Configs/firebase.config";
import SignInForm from "../Components/SignIn/SignInForm";


const SignIn = ({ navigation, currentUser, loadingState }) => {
    const login = (email, password, setLoginFailed) => {
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
                <SignInForm handleSignIn = {login} />
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

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    loadingState: state.user.loadingState,
});

export default connect(mapStateToProps)(SignIn);
