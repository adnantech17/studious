import React from "react";
import { Text, ImageBackground, StyleSheet, Image, KeyboardAvoidingView, Dimensions } from "react-native";
import * as Yup from "yup";

import FormikFormField from "../Components/Form/Formik/FormikFormField";
import FormikForm from "../Components/Form/Formik/FormikForm";
import colors from "../assets/colors";
import FormikSubmitButton from "../Components/Form/Formik/FormikSubmitButton";
import { auth } from "../Configs/firebase.config";

const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email.")
    .email("Invalid email address!"),
});


const ForgetPassword = ({ navigation }) => {

  const handleSubmit = ({email}) => {
    auth
      .sendPasswordResetEmail(email)
      .then(function (user) {
        alert('Instructions are sent to your email.')
        navigation.goBack();
      }).catch(function (e) {
        alert(e.toString());
        console.log(e)
      })
  }
  return (
    <>
      <ImageBackground
        style={styles.backgroundView}
        source={require("../assets/pics/bg.png")}
      />
      <KeyboardAvoidingView style = {styles.container}>
        <Image
          style={styles.icon}
          source={require("../assets/pics/forgetPass.png")}
        />
        <Text style={styles.confirmEmail}>Confirm Email</Text>
        <FormikForm 
          initialValues={{ email: "" }}
          validationSchema = {forgetPasswordSchema}
          onSubmit = {handleSubmit}
        >
          <FormikFormField
            placeholder={"Email"}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
            name="email"
            leftIcon="mail"
          />
          <FormikSubmitButton
            buttonStyle = {styles.button}
            textStyle = {styles.text}
            title = "RESET"
          />
        </FormikForm>
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
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  icon: {
    width: 200,
    height: 135,
    marginBottom: 40,
    zIndex: 2,
  },
  confirmEmail: {
    fontSize: 20,
    alignSelf: "flex-start",
    marginLeft: 40,
  },
  email: {
    
  },
  button: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 12,
    paddingHorizontal: "30%",
    borderRadius: 100,
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    color: "black",
  },
});

export default ForgetPassword;

