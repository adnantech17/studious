import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-community/picker";
import * as MediaLibrary from "expo-media-library";
import { downloadToFolder } from "expo-file-dl";
import * as WebBrowser from 'expo-web-browser';

import { removeMaterial } from "../Redux/material/material.action";
import { firebaseMaterialDelete } from "../Utils/FirebaseUtils";

import TagInputBox from "../Components/Input/TagInputBox";
import TagViewBox from "../Components/Materials/TagViewBox";
const channelId = "DownloadInfo";

const ViewMaterialScreen = ({
  courses,
  selectedCourse,
  selectedMaterial,
  navigation,
  removeMaterial,
}) => {
  const mat = selectedMaterial.material;
  console.log(mat);
  const [downloadProgress, setDownloadProgress] = useState("0%");
  const [tags, setTags] = useState(mat ? mat.tags : []);

  const handleDelete = () => {
    removeMaterial(selectedMaterial.course_id, selectedMaterial.material);
    firebaseMaterialDelete(
      selectedMaterial.course_id,
      selectedMaterial.material
    );
    navigation.goBack();
  };

  const requestPermission = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  useEffect(() => {
    if (downloadProgress === "100%") {
      Alert.alert(
        "Download Complete",
        "",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
      setDownloadProgress("0%");
    }
  }, [downloadProgress]);

  async function getMediaLibraryPermissions() {
    await requestPermission();
  }

  const downloadProgressUpdater = ({
    totalBytesWritten,
    totalBytesExpectedToWrite,
  }) => {
    const pctg = 100 * (totalBytesWritten / totalBytesExpectedToWrite);
    setDownloadProgress(`${pctg.toFixed(0)}%`);
  };

  useEffect(() => {
    getMediaLibraryPermissions();
  });

  return (
    <View>
      <Text>Title: {mat.title}</Text>
      <Text>Description: {mat.description}</Text>
      <Text>Tags: </Text>
      <TagViewBox tags = {tags} />

      <Text>Course: </Text>
      <Text>{selectedCourse.title}</Text>
      <Text>Attachment: {mat.attachment ? mat.attachment.name : "none"}</Text>
      {mat.attachment !== null && (
        <View>
          {/* <Button
            title="Download"
            onPress={async () => {
              await downloadToFolder(
                mat.attachment.url,
                mat.attachment.name,
                "Download",
                channelId,
                {
                  downloadProgressCallback: downloadProgressUpdater,
                }
              );
            }}
          /> */}
          <Button 
            title = "Open"
            onPress = {async() => {
              await WebBrowser.openBrowserAsync(mat.attachment.url);
            }}
          />
        </View>
      )}

      <Button
        title="Edit"
        onPress={() => {
          navigation.navigate("NewMaterial");
        }}
      ></Button>
      <Button title="Delete" onPress={handleDelete}></Button>
    </View>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  selectedCourse: state.courses.selectedCourse,
  selectedMaterial: state.courses.selectedMaterial,
});

const mapDispatchToProps = (dispatch) => ({
  removeMaterial: (course_id, material) =>
    dispatch(removeMaterial(course_id, material)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewMaterialScreen);
