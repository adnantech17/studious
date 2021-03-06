import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../../assets/colors";
import { storage } from "../../Configs/firebase.config"
import * as FileSystem from 'expo-file-system';
import Modal from "react-native-modal";



const ImageComponent = ({profileImageUri, setProfileImageUri, onDeletePress, user}) => {
    const [imageSettingsShown, setImageSettingsShown] = useState(false);
    const [localImageUri, setLocalImageUri] = useState(null);
    

    useEffect(() => {
      requestPermission();
    }, []);

    const uploadImage = async (uri, extension) => {
      console.log(uri);
      const pathRef = `${user.email}/profile_picture.${extension}`;
      const res = await fetch(uri);
      const blob = await res.blob();
      setProfileImageUri(uri);
      await storage.ref(pathRef).put(blob);
      const uploadedUri = await storage.ref(pathRef).getDownloadURL();
      ToastAndroid.show("Image uploaded!", ToastAndroid.SHORT);
      setProfileImageUri(uploadedUri);
      setLocalImageUri(null);
      return uploadedUri;
    }

    const downloadImage = async () =>  {
      const fileExtension = profileImageUri.substr(profileImageUri.lastIndexOf('.') + 1);
      const uri = await FileSystem.downloadAsync(profileImageUri, FileSystem.documentDirectory + 'profile_picture.'+ fileExtension)
      setLocalImageUri(uri);
      console.log("That" ,uri);
      return uri;
    }

    const shareImage = async () => {
      try{
        if(localImageUri) Sharing.shareAsync(localImageUri.uri);
        else {
          const uri = await downloadImage(profileImageUri);
          Sharing.shareAsync(uri.uri);  
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Please try again later!", ToastAndroid.SHORT);
      }
    }

    const saveToDevice = async () => {
      try{
        if(localImageUri) MediaLibrary.saveToLibraryAsync(localImageUri.uri).then(() => {
          ToastAndroid.show("Saved to device!", ToastAndroid.SHORT);
        }); 
        else {
          const uri = await downloadImage(profileImageUri);
          MediaLibrary.saveToLibraryAsync(uri.uri).then(() => {
            ToastAndroid.show("Saved to device!", ToastAndroid.SHORT);
          }); 
        }
      } catch(error) {
        console.log(error);
        ToastAndroid.show("Please try again later!", ToastAndroid.SHORT);
      }
    }

    const onPressShare = () => shareImage();
    const onPressSave = () => saveToDevice();

    const toggleImageSettings = () => {
        setImageSettingsShown(!imageSettingsShown);
    }
    const requestPermission = async () => {
        const { granted } = await MediaLibrary.requestPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.");
    };

    const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
          });
          if (!result.cancelled) {
            const fileExtension = result.uri.substr(result.uri.lastIndexOf('.') + 1);
            await uploadImage(result.uri, fileExtension);
          }
        } catch (error) {
          console.log("Error reading an image", error);
        }
    };

    return(
        <>
            <TouchableOpacity
                style = {styles.imageContainer}
                onPress={profileImageUri ? toggleImageSettings : selectImage}
              >
                {
                    !profileImageUri ?
                    <Image
                        source={require("../../assets/pics/dp.png")}
                        style={styles.image}
                    />
                    :
                    <Image source={{ uri: profileImageUri }} style={styles.image}/>
                }
              </TouchableOpacity>
              {
              imageSettingsShown && 
              <Modal
                isVisible = {imageSettingsShown}
                onBackButtonPress = {toggleImageSettings}
                onBackdropPress = {toggleImageSettings}
              >
              <View style = {styles.modal}>
              <View style = {styles.imageBigContainer}>
              <Image source={{ uri: profileImageUri }} style={styles.image}/>
              </View>
              <View style={styles.imageButtons}>
                <TouchableOpacity 
                    onPress = {selectImage}
                    style={styles.imageSettings}
                >
                  <Feather name="edit" size={18} color="black" />
                  <Text style={styles.imageButtonsText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPressShare}
                    style={styles.imageSettings}
                >
                    <AntDesign name="sharealt" size={18} color="black" />
                    <Text style={styles.imageButtonsText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPressSave}
                    style={styles.imageSettings}
                >
                    <MaterialIcons name="save-alt" size={18} color="black" />
                    <Text style={styles.imageButtonsText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress = { () => {
                        setLocalImageUri(null);
                        onDeletePress();
                        toggleImageSettings();
                    }}
                    style={styles.imageSettings}
                >
                    <MaterialIcons name="delete-outline" size={18} color="black" />
                    <Text style={styles.imageButtonsText}>Delete</Text>
                </TouchableOpacity>
              </View>
              </View>
              </Modal>
              }   
        </>
    )
}

const styles = StyleSheet.create({
    image: {
      height: "100%",
      width: "100%",
    },
    imageButtons: {
      display: "flex",
      flexDirection: "row",
      marginTop: 10,
    },
    imageSettings: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 5,
      marginHorizontal: 4,
    },
    imageButtonsText: {
      marginLeft: 5,
      fontSize: 12,
    },
    imageContainer: {
      height: 140,
      width: 140,
      borderRadius: 70,
      overflow: "hidden",
      borderWidth: 0.5,
      borderColor: colors.lightgray,
    },
    imageBigContainer: {
      width: "100%",
      aspectRatio: 1/1,
      borderRadius: 10,
      overflow: "hidden",
      borderWidth: 0.5,
      borderColor: colors.medium,
    },
    modal: {
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: "white",
      borderRadius: 20,
      width: "80%",
      paddingTop: 30,
      paddingBottom: 20,
      paddingHorizontal: 20,
    }
});


export default ImageComponent;