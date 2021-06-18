import React from "react";
import { Text, StyleSheet, Button, ImageBackground, Image } from "react-native";

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
    <ImageBackground
      style={styles.container}
      source={require("../assets/pics/bg.png")}
    >
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: 120,
    width: 270,
    marginBottom: 50,
  },
  login: {
    color: colors.backgroundColor,
    fontWeight: "600",
  },
});

export default Register;
