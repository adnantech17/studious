import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TermsAndPolicies = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/pics/bg.png")}
    >
      <Text style={styles.backbutton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </Text>
      <Image
        source={require("../../assets/pics/alert.png")}
        style={styles.image}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={styles.disclaimer}>Disclaimer</Text>
      </View>
      <Text style={styles.text}>
        This app is created as an academic project. We do not guarantee any
        protection from any kind of loss or leakage of data. Please do not
        upload any sensitive information or documents in this app.
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 30,
  },
  disclaimer: {
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
  },
  image: {
    height: 200,
    width: 300,
    alignSelf: "center",
    marginBottom: 30,
  },
  backbutton: {
    position: "absolute",
    left: 30,
    top: 50,
  },
});

export default TermsAndPolicies;
