import React from "react";
import { Text, ImageBackground, StyleSheet, Image } from "react-native";
import FormikFormField from "../Components/Form/Formik/FormikFormField";
import FormikForm from "../Components/Form/Formik/FormikForm";
import AppButton from "../Components/reusable/Appbutton";
import colors from "../assets/colors";

const ConfirmPin = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/pics/bg.png")}
    >
      <Image
        style={styles.icon}
        source={require("../assets/pics/forgetPass.png")}
      />
      <Text style={styles.confirmPin}>Confirm Email</Text>
      <FormikForm initialValues={{ pin: "" }}>
        <FormikFormField
          name="pin"
          style={styles.pin}
          placeholder={"Email"}
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon="mail"
        />
      </FormikForm>
      <Text style={styles.resend} onPress={() => navigation.push("Sign In")}>
        Resend?
      </Text>
      <AppButton
        onPress={() => console.log("hello")}
        title="RESET"
        buttonStyle={styles.button}
        textStyle={styles.text}
      />
    </ImageBackground>
  );
};

export default ConfirmPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  icon: {
    width: 200,
    height: 135,
    marginBottom: 40,
  },
  confirmPin: {
    fontSize: 20,
    alignSelf: "flex-start",
    marginLeft: 40,
  },
  pin: {},
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
  resend: {
    color: colors.lightred,
    alignSelf: "flex-end",
    marginRight: 40,
  },
});
