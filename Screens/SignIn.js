import React, { useState } from "react";
import { Text, StyleSheet, Button, View, TextInput } from "react-native";

import { connect } from "react-redux";
import { auth } from "../Configs/firebase.config";

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

const SignIn = ({ navigation, currentUser, loadingState }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
            })
            .catch((err) => console.log(err));
    };

    return (
        !loadingState && (
            <View style={styles.container}>
                <Text>Sign In Screen</Text>
                <TextInput
                    placeholder={"Email"}
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />

                <TextInput
                    placeholder={"Password"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
                <Button style={styles.button} title="Sign In" onPress={login} />
                <Button
                    style={styles.button}
                    title="Create Account"
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
