import React from "react";
import {
  Text,
  StyleSheet,
  Button,
  ToastAndroid,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { connect } from "react-redux";
import colors from "../assets/colors";

import { auth } from "../Configs/firebase.config";
import SignInForm from "../Components/SignIn/SignInForm";

const SignIn = ({ navigation, loadingState }) => {
  const login = (email, password, setLoginFailed) => {
    auth
      .signInWithEmailAndPassword(email, password)
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
      <KeyboardAvoidingView>
        <ImageBackground
          style={styles.container}
          source={require("../assets/pics/bg.png")}
        >
          <Image
            style={styles.logo}
            source={require("../assets/pics/logo.png")}
          />
          <SignInForm handleSignIn={login} />
          <Text style={styles.noAccount}>
            <Text>Don't have an account? </Text>
            <Text
              style={styles.signup}
              onPress={() => {
                console.log(navigation);
                navigation.replace("Register");
              }}
            >
              Sign up
            </Text>
          </Text>
          <Image
            source={require("../assets/pics/login.png")}
            style={styles.icon}
          />
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    height: 150,
    width: 250,
  },
  logo: {
    height: 120,
    width: 180,
    marginBottom: 50,
  },
  signup: {
    color: colors.backgroundColor,
    fontWeight: "600",
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  loadingState: state.user.loadingState,
});

export default connect(mapStateToProps)(SignIn);
