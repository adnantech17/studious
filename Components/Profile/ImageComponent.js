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



const ImageComponent = ({profileImageUri, setProfileImageUri, onDeletePress, user}) => {
    const [imageSettingsShown, setImageSettingsShown] = useState(false);
    const [localImageUri, setLocalImageUri] = useState(null);
    

    useEffect(() => {
      requestPermission();
    }, []);

    // useEffect(() => {
    //   if(profileImageUri) {
    //     // download file here
    //     const downloadedUri = null;
    //     setLocalImageUri(downloadedUri);
    //   }
    // }, [profileImageUri]);

    const uploadImage = async (uri, extension) => {
      console.log(uri);
      const pathRef = `${user.email}/profile_picture.${extension}`;
      const res = await fetch(uri);
      const blob = await res.blob();
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
      if(localImageUri) Sharing.shareAsync(localImageUri.uri);
      else {
        const uri = await downloadImage(profileImageUri);
        Sharing.shareAsync(uri.uri);  
      }
    }

    const saveToDevice = async () => {
      if(localImageUri) MediaLibrary.saveToLibraryAsync(localImageUri.uri).then(() => {
        ToastAndroid.show("Saved to device!", ToastAndroid.SHORT);
      }); 
      else {
        const uri = await downloadImage(profileImageUri);
        MediaLibrary.saveToLibraryAsync(uri.uri).then(() => {
          ToastAndroid.show("Saved to device!", ToastAndroid.SHORT);
        }); 
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
      borderRadius: 20,
      overflow: "hidden",
      borderWidth: 0.5,
      borderColor: colors.lightgray,
    }
});


export default ImageComponent;