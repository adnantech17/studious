import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";

import { auth } from "../../Configs/firebase.config";
import colors from "../../assets/colors";
import NavigationOption from "../../Components/Profile/NavigationOption";
import { firebaseSetProfileImageUri, firebaseSyncWithProfile } from "../../Utils/Profile/firebase.utils";
import { setProfileData, setProfileImageUri } from "../../Redux/profile/profile.action";
import TwoButtonModal from "../../Components/reusable/TwoButtonModal";
import ImageComponent from "../../Components/Profile/ImageComponent";

const Profile = ({ currentUser, profileImageUri, setProfileData, navigation, setProfileImageUri }) => {
  const [imageDeleteModalShown, setImageDeleteModalShown] = useState(false);
  useEffect(() => {
    firebaseSyncWithProfile(setProfileData);
  }, []);
  const onSetProfileImageUri = (uri) => {
    setProfileImageUri(uri);
    firebaseSetProfileImageUri(uri);
  }
  const onImageDeletePressed = () => {
    setImageDeleteModalShown(true);
  };
  return (
    currentUser && (
      <>
      <ImageBackground
        style={styles.backgroundView}
        source={require("../../assets/pics/bg.png")}
      />
      <View style={styles.container} >
        {/* {
          !profileImageUri ?
          <Image
              source={require("../../assets/pics/dp.png")}
              style={styles.dp}
          />
          :
          <Image source={{ uri: profileImageUri }} style={styles.dp}/>
        } */}
         <ImageComponent
          setProfileImageUri={onSetProfileImageUri}
          profileImageUri={profileImageUri}
          onDeletePress={onImageDeletePressed}
          user={currentUser}
        />
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
      </View>
      {imageDeleteModalShown && (
        <TwoButtonModal
          title="Delete"
          body="Are you sure that you want to delete this image?"
          isVisible={imageDeleteModalShown}
          setVisibility={setImageDeleteModalShown}
          rightButtonTitle="Delete"
          rightButtonPressed={() => {
            onSetProfileImageUri(null);
          }}
        />
      )}
      </>
    )
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  profileImageUri : state.profile.profileImageUri,
});

const mapDispatchToProps = (dispatch) => ({
  setProfileData: (profileData) => dispatch(setProfileData(profileData)),
  setProfileImageUri: (uri) => dispatch(setProfileImageUri(uri)),
});

const styles = StyleSheet.create({
  backgroundView: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 200,
    zIndex: 2,
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);