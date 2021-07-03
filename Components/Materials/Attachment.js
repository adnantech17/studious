import React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProgressDialogBox from "../DialogBox/ProgressDialogBox";
import * as DocumentPicker from "expo-document-picker";
import { storage } from "../../Configs/firebase.config";
import { connect } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const Attachment = ({ attachment, setAttachment, user }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canceled, setCanceled] = useState(false);

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

  return (
    <View style={styles.container}>
      <ProgressDialogBox
        visible={uploading}
        setVisible={setUploading}
        progress={progress}
        setCanceled={setCanceled}
      />
      <View style={styles.attachment}>
        <TouchableOpacity onPress={pickDocument}>
          <Text>
            {attachment ? (
              attachment.name
            ) : (
              <Text style={{ color: "grey" }}>Add Attachment</Text>
            )}
          </Text>
        </TouchableOpacity>
        {attachment !== null && (
          <TouchableOpacity onPress={() => setAttachment(null)}>
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps)(Attachment);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "80%",
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  attachment: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
