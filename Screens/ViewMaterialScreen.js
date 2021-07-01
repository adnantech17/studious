import React, { useState } from "react";
import { View, Text, Button, Alert } from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-community/picker";
import TagInputBox from "../Components/Input/TagInputBox";
import { useEffect } from "react";
import * as Permissions from "expo-permissions";
import { downloadToFolder } from "expo-file-dl";
const channelId = "DownloadInfo";

const ViewMaterialScreen = ({ courses, selectedCourse, selectedMaterial }) => {
  const mat = selectedMaterial.material;
  console.log(mat);
  const [downloadProgress, setDownloadProgress] = useState("0%");
  const [tags, setTags] = useState(mat ? mat.tags : []);

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
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
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
      <TagInputBox tag={tags} setTag={setTags} enabled={false} />

      <Text>Course: </Text>
      <Picker mode="dropdown" selectedValue={selectedCourse.id} enabled={false}>
        {courses.map((course) => {
          return (
            <Picker.Item
              label={course.title}
              value={course.id}
              key={course.id}
            />
          );
        })}
      </Picker>
      <Text>Attachment: {mat.attachment ? mat.attachment.name : "none"}</Text>
      {mat.attachment !== null && (
        <View>
          <Button
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
          />
          <Text>{downloadProgress}</Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  selectedCourse: state.courses.selectedCourse,
  selectedMaterial: state.courses.selectedMaterial,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewMaterialScreen);
