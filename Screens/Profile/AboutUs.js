import React from "react";
import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import Constants from "expo-constants";
import colors from "../../assets/colors";
import { FontAwesome } from "@expo/vector-icons";

const AboutUs = ({}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/pics/bg.png")}
    >
      <Image
        source={require("../../assets/pics/aboutus.png")}
        style={styles.image}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        {"About Us"}
      </Text>
      <Text style={{ fontSize: 15 }}>
        {
          "This app is developed as an acamdeic project of the Undergraduate Program of the Department of Computer Science and Engineering, University of Dhaka."
        }
      </Text>
      <Text
        style={{
          display: "flex",
          flexDirection: "column",
          marginVertical: 10,
          marginBottom: 30,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "black" }}>GitHub : </Text>
        <Text style={{ color: colors.lightred }}>
          {"https://github.com/adnantech17/studious/"}
        </Text>
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 10,
        }}
      >
        {"Developer Team"}
      </Text>
      <Text style={styles.developer}>
        <FontAwesome name="user-o" size={16} color="black" /> Mohidul Haque
        Mridul
      </Text>
      <Text style={styles.developer}>
        <FontAwesome name="user-o" size={16} color="black" /> Md Adnan Ali
      </Text>
      <Text style={styles.developer}>
        <FontAwesome name="user-o" size={16} color="black" /> Sakib Chowdhury
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 30,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  developer: {
    marginBottom: 5,
  },
});

export default AboutUs;
