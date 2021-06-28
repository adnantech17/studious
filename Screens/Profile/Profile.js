import React, { useEffect } from "react";
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
import NavigationOption from "../../Components/Profile/NavigationOption";
import { firebaseSyncWithProfile } from "../../Utils/Profile/firebase.utils";
import { setProfileData } from "../../Redux/profile/profile.action";

const Profile = ({ currentUser, profileImageUri, setProfileData, navigation }) => {
  useEffect(() => {
    firebaseSyncWithProfile(setProfileData);
  }, [])
  return (
    currentUser && (
      <ImageBackground
        style={styles.container}
        source={require("../../assets/pics/bg.png")}
      >
        {
          !profileImageUri ?
          <Image
              source={require("../../assets/pics/dp.png")}
              style={styles.dp}
          />
          :
          <Image source={{ uri: profileImageUri }} style={styles.dp}/>
        }
        <Text style={styles.name}>{currentUser.firstName} {currentUser.lastName}</Text>
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
          <NavigationOption
            navigation = {navigation}
            containerStyle = {styles.option}
            textStyle = {styles.optText}
            iconStyle = {styles.rightIcon}
            navigateTo = "Details"
            title = "Profile Details"
          />
          <NavigationOption
            navigation = {navigation}
            containerStyle = {styles.option}
            textStyle = {styles.optText}
            iconStyle = {styles.rightIcon}
            navigateTo = "TermsAndPolicies"
            title = "Terms & Policies"
          />
          <NavigationOption
            navigation = {navigation}
            containerStyle = {styles.option}
            textStyle = {styles.optText}
            iconStyle = {styles.rightIcon}
            navigateTo = "AboutUs"
            title = "About Us"
          />
        </View>
      </ImageBackground>
    )
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  profileImageUri : state.profile.profileImageUri,
});

const mapDispatchToProps = (dispatch) => ({
  setProfileData: (profileData) => dispatch(setProfileData(profileData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  dp: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: "center",
    marginBottom: 15,
    marginTop: 200,
  },
  button: {
    alignItems: "flex-end",
    paddingVertical: 5,
    borderRadius: 100,
  },
  buttonText: {
    color: colors.backgroundColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  mail: {
    fontSize: 16,
    marginVertical: 2,
  },
  name: {
    fontSize: 28,
    marginVertical: 2,
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
