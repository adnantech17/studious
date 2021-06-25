import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import ProgressDialogBox from "../DialogBox/ProgressDialogBox";
import * as DocumentPicker from "expo-document-picker";
import { storage } from "../../Configs/firebase.config";
import { connect } from "react-redux";
import { useEffect } from "react";
import * as Permissions from "expo-permissions";
import { downloadToFolder } from "expo-file-dl";
const channelId = "DownloadInfo";

const Attachment = ({ attachment, setAttachment, user }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canceled, setCanceled] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState("0%");

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (result.type == "success") {
      setUploading(true);
      setProgress(0);
      setCanceled(false);
      await uploadFile(result.uri, result.name);
    }
  };

  const uploadFile = async (uri, name) => {
    const res = await fetch(uri);
    const blob = await res.blob();
    const dt = new Date();

    var storageRef = storage.ref();
    var uploadTask = storageRef
      .child(`${user.email}/${dt.getTime()}/${name}`)
      .put(blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log("Upload is " + progress + "% done");

        console.log(canceled);
        if (canceled) {
          console.log("Canceling");
          uploadTask.cancel();
        }
      },
      (error) => {},
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUploading(false);
          setAttachment({ name: name, url: downloadURL });
        });
      }
    );
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
      <ProgressDialogBox
        visible={uploading}
        setVisible={setUploading}
        progress={progress}
        setCanceled={setCanceled}
      />
      <Text>Attachment: </Text>
      <TouchableOpacity onPress={pickDocument}>
        <Text>{attachment ? attachment.name : "Add attachment"}</Text>
      </TouchableOpacity>
      {attachment !== null && (
        <View>
          <Button
            title="Download"
            onPress={async () => {
              console.log(attachment);

              await downloadToFolder(
                attachment.url,
                attachment.name,
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
  user: state.user.currentUser,
});

export default connect(mapStateToProps)(Attachment);
