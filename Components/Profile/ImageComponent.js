import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import colors from "../../assets/colors";

const ImageComponent = ({profileImageUri, setProfileImageUri, onDeletePress}) => {
    const [imageSettingsShown, setImageSettingsShown] = useState(false);

    useEffect(() => {
        requestPermission();
    }, []);

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
          if (!result.cancelled) setProfileImageUri(result.uri);
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
                    onPress={() => Sharing.shareAsync(profileImageUri)}
                    style={styles.imageSettings}
                >
                    <AntDesign name="sharealt" size={18} color="black" />
                    <Text style={styles.imageButtonsText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        MediaLibrary.saveToLibraryAsync(profileImageUri)
                    }
                    style={styles.imageSettings}
                >
                    <MaterialIcons name="save-alt" size={18} color="black" />
                    <Text style={styles.imageButtonsText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress = { () => {
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