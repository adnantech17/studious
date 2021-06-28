import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";

import FieldItem from "../../Components/Profile/FieldItem";
import { addField, deleteField, editField, setProfileData, setProfileImageUri } from "../../Redux/profile/profile.action";
import colors from "../../assets/colors";
import ImageComponent from "../../Components/Profile/ImageComponent";
import FieldInputModal from "../../Components/Profile/FieldInputModal";
import TwoButtonModal from "../../Components/reusable/TwoButtonModal";
import { firebaseAddField, firebaseEditField, firebaseRemoveField, firebaseSetProfileImageUri, firebaseSyncWithProfile } from "../../Utils/Profile/firebase.utils";


const Details = ({ 
    fieldData, 
    addField, 
    editField, 
    deleteField,
    profileImageUri, 
    setProfileImageUri,
    setProfileData,
    user,
}) => {
  const list = useRef();
  const [refreshing, setRefreshing] = useState(false); 
  const [fieldInputModalShown, setFieldInputModalShown] = useState(false);
  const [imageDeleteModalShown, setImageDeleteModalShown] = useState(false);
  const [fieldDeleteModalShown, setFieldDeleteModalShown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
      if(!fieldInputModalShown && !fieldDeleteModalShown) setSelectedItem(null);
  }, [fieldInputModalShown, fieldDeleteModalShown]);

  const onRefresh = () => {
    firebaseSyncWithProfile(setProfileData, setRefreshing)
  }


  const addNewField = (item) => {
    const field = {
      id: new Date().toString(),
      required: false,
      ...item,
    };
    addField(field);
    firebaseAddField(field),
    list.current?.scrollToEnd();
  };

  const editFieldAndUpload = (item) => {
    editField(item);
    firebaseEditField(item);
  }

  const onSetProfileImageUri = (uri) => {
    setProfileImageUri(uri);
    firebaseSetProfileImageUri(uri);
  }

  const onImageDeletePressed = () => {
      setImageDeleteModalShown(true);
  }


  const onModalSubmit = (item) => {
    !selectedItem ? addNewField(item) : editFieldAndUpload(item);
  }

  const renderField = ({ item }) => {
    const onEditPress = () => {
        setSelectedItem(item);
        setFieldInputModalShown(true);
    }
    const onDeletePress = () => {
        setFieldDeleteModalShown(true);
        setSelectedItem(item);
    }
    return <FieldItem item={item} onEditPress = {onEditPress} onDeletePress = {onDeletePress} />;
  };

  return (
    <>
      <ImageBackground
        style={styles.backgroundView}
        source={require("../../assets/pics/bg.png")}
      />
      <View style= {styles.container}>        
        <FlatList
          ref = {list}
          refreshing = {refreshing}
          onRefresh = {onRefresh}
          data={fieldData}
          keyExtractor={(item) => item.id}
          renderItem={renderField}
          ListHeaderComponent={
            <View style={styles.dataContainer}>
              <ImageComponent 
                setProfileImageUri= {onSetProfileImageUri} 
                profileImageUri = {profileImageUri} 
                onDeletePress = {onImageDeletePressed} 
                user = {user}
              />
            </View>
          }
          ListFooterComponent = {
              <View style = {{height: 110}} />
          }
        />
        {
        !fieldInputModalShown &&
        !fieldDeleteModalShown &&
        !imageDeleteModalShown &&
        <View 
            style={styles.buttonContainer} 
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFieldInputModalShown(true);
            }}
          >
            <Feather name="plus" size={24} color="#393A3C" />
          </TouchableOpacity>
        </View>
        }
      </View>
      {fieldInputModalShown && (
        <FieldInputModal
          selectedItem = {selectedItem}
          onSubmit={onModalSubmit}
          isVisible={fieldInputModalShown}
          setVisibility={setFieldInputModalShown}
        />
      )}
      {
          fieldDeleteModalShown && (
                <TwoButtonModal
                    title = "Delete"
                    body = "Are you sure that you want to delete this field?"
                    isVisible = {fieldDeleteModalShown}
                    setVisibility = {setFieldDeleteModalShown}
                    rightButtonTitle = "Delete"
                    rightButtonPressed = {
                        () => {
                            deleteField(selectedItem);
                            firebaseRemoveField(selectedItem);
                        }
                    }
                />
          )
      }
      {
          imageDeleteModalShown && (
                <TwoButtonModal
                    title = "Delete"
                    body = "Are you sure that you want to delete this image?"
                    isVisible = {imageDeleteModalShown}
                    setVisibility = {setImageDeleteModalShown}
                    rightButtonTitle = "Delete"
                    rightButtonPressed = {
                        () => {
                            onSetProfileImageUri(null);
                        }
                    }
                />
          )
      }
    </>
  );
};

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
    position: "relative",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 350,
    display: "flex",
    position: "relative",
    paddingTop: 100,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 32,
    right: 32,
    margin: 8,
    zIndex: 3,
  },
  button: {
    borderColor: colors.lightgray,
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonText: {
    marginLeft: 7,
    fontSize: 16,
    color: "black",
  },
});
const mapStateToProps = (state) => ({
  fieldData: state.profile.fieldData,
  profileImageUri: state.profile.profileImageUri,
  user: state.user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  addField: (field) => dispatch(addField(field)),
  setProfileImageUri: (imageUri) => dispatch(setProfileImageUri(imageUri)),
  editField: (field) => dispatch(editField(field)),
  deleteField: (field) => dispatch(deleteField(field)),
  setProfileData: (profileData) => dispatch(setProfileData(profileData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Details);
