import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { auth } from "../../Configs/firebase.config";
import colors from "../../assets/colors";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const Profile = ({ currentUser, navigation }) => {
  return (
    currentUser && (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/pics/bg.png")}
      >
        <Image
          style={styles.dp}
          source={require("../../assets/pics/profile.png")}
        />
        <Text style={styles.name}>
          {` ${currentUser.firstName} ${currentUser.lastName}`}
        </Text>
        <Text style={styles.mail}>{currentUser.email}</Text>
        <TouchableOpacity
          onPress={async () => {
            await auth.signOut();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log Out?</Text>
        </TouchableOpacity>
        <View style={styles.options}>
          <View
            style={styles.option}
            onPress={() => navigation.push("Details")}
          >
            <Text
              style={styles.optText}
              onPress={() => navigation.push("Details")}
            >
              Profile Details
            </Text>
            <TouchableOpacity
              style={styles.rightIcon}
              onPress={() => navigation.push("Details")}
            >
              <AntDesign name="right" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optText}>Terms & Policies</Text>
            <TouchableOpacity style={styles.rightIcon}>
              <AntDesign name="right" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optText}>About Us</Text>
            <TouchableOpacity style={styles.rightIcon}>
              <AntDesign name="right" size={18} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  dp: {
    width: 100,
    height: 100,
    borderRadius: 10000,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 200,
  },
  profile: {
    fontSize: 24,
  },
  button: {
    alignItems: "flex-end",
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    color: colors.backgroundColor,
    fontSize: 16,
  },
  mail: {
    fontSize: 18,
    marginVertical: 5,
  },
  name: {
    fontSize: 28,
    marginVertical: 5,
    fontWeight: "bold",
  },
  options: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 70,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
  },
  optText: {
    fontSize: 16,
  },
});
