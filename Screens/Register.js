import React, { useState } from "react";
import { Text, StyleSheet, Button, View, TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";
import { auth, firestore } from "../Configs/firebase.config";

export const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("male");

    const signUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firestore.collection("users").doc(auth.currentUser.uid).set({
                    name,
                    email,
                    phone,
                    gender,
                });
                navigation.push("Profile");
            })
            .catch((err) => console.log(err));
    };

    return (
        <View style={styles.container}>
            <Text>Create Account Screen</Text>
            <TextInput
                placeholder={"Name"}
                value={name}
                onChangeText={(value) => setName(value)}
            />

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

            <TextInput
                placeholder={"Phone Number"}
                value={phone}
                onChangeText={setPhone}
            />

            <Picker
                style={{
                    width: "40%",
                    height: 50,
                }}
                selectedValue={gender}
                onValueChange={(value) => setGender(value)}
            >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
            </Picker>

            <Button
                style={styles.button}
                title="Sign Up"
                onPress={() => signUp()}
            />
            <Button
                style={styles.button}
                title="Login"
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
