import React from "react";
import { Text, StyleSheet, ImageBackground, Image, Dimensions, KeyboardAvoidingView } from "react-native";

import { auth, firestore } from "../Configs/firebase.config";
import RegisterForm from "../Components/Register/RegisterForm";
import colors from "../assets/colors";

export const Register = ({ navigation }) => {
  const signUp = (
    firstName,
    lastName,
    email,
    password,
    setRegistrationFailed,
    setRegistrationFailError
  ) => {
    auth
      .createUserWithEmailAndPassword(email, password)
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
    <>
        <ImageBackground
        style={styles.backgroundView}
        source={require("../assets/pics/bg.png")}
        />
        <KeyboardAvoidingView style = {styles.container}>
            <Image
                style={styles.icon}
                source={require("../assets/pics/signup.png")}
            />
            <RegisterForm handleSignUp={signUp} />
            <Text style={styles.haveAccount}>
                <Text>Already have an account? </Text>
                <Text
                style={styles.login}
                onPress={() => {
                    navigation.replace("Sign In");
                }}
                >
                Log In
                </Text>
            </Text>
        </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  icon: {
    height: 120,
    width: 270,
    marginBottom: 50,
  },
  login: {
    color: colors.backgroundColor,
    fontWeight: "bold",
  },
});

export default Register;
