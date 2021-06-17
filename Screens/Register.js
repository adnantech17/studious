import React from "react";
import { Text, StyleSheet, Button, View } from "react-native";

import { auth, firestore } from "../Configs/firebase.config";
import RegisterForm from "../Components/Register/RegisterForm";

export const Register = ({ navigation }) => {
    const signUp = (firstName, lastName, email, password, setRegistrationFailed, setRegistrationFailError) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
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
            <RegisterForm handleSignUp = {signUp} />
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
