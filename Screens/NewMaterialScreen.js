import React, { useState } from "react";
import nextId from "react-id-generator";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-community/picker";

import { addMaterial, updateMaterial } from "../Redux/material/material.action";
import TagInputBox from "../Components/Input/TagInputBox";
import * as DocumentPicker from "expo-document-picker";
import { storage } from "../Configs/firebase.config";
import ProgressDialogBox from "../Components/DialogBox/ProgressDialogBox";

const NewMaterialScreen = ({
  addMaterial,
  courses,
  navigation,
  selectedCourse,
  selectedMaterial,
  updateMaterial,
  user,
}) => {
  const mat = selectedMaterial.material;
  const [title, setTitle] = useState(mat ? mat.title : "");
  const [description, setDescription] = useState(mat ? mat.description : "");
  const [attachment, setAttachment] = useState(mat ? mat.attachment : null);
  const [tags, setTags] = useState(mat ? mat.tags : []);
  const [courseId, setCourseId] = useState(
    selectedCourse ? selectedCourse.id : -1
  );
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [canceled, setCanceled] = useState(false);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    setUploading(true);
    setProgress(0);
    setCanceled(false);
    await uploadFile(result.uri, result.name);
  };

  const uploadFile = async (uri, name) => {
    const res = await fetch(uri);
    const blob = await res.blob();

    var storageRef = storage.ref();
    var uploadTask = storageRef.child(`${user.email}/${name}`).put(blob);

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

  const performCheck = () => {
    if (title.trim() === "") {
      console.log("Material must have a title");
      return false;
    } else if (attachment === null && description.trim() === "") {
      console.log("Material must contain an attachment or description.");
      return false;
    } else if (courseId === -1) {
      console.log("Must select a course first");
      return false;
    }
    return true;
  };

  const cleanupWhenDone = () => {
    setTitle("");
    setDescription("");
    setAttachment("");
    setCourseId(null);

    navigation.popToTop();
  };

  const createMaterial = (id) => {
    return {
      id: id || "mat-" + nextId(),
      title: title,
      description: description,
      attachment: attachment ? attachment : null,
      datetime: new Date(),
      tags: tags,
    };
  };

  const addNewMaterial = () => {
    if (!performCheck()) return;
    addMaterial(courseId, createMaterial(null));
    cleanupWhenDone();
  };

  const updateGivenMaterial = () => {
    if (!performCheck()) return;
    updateMaterial(courseId, createMaterial(mat.id));
    cleanupWhenDone();
  };

  return (
    <View>
      <ProgressDialogBox
        visible={uploading}
        setVisible={setUploading}
        progress={progress}
        setCanceled={setCanceled}
      />
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        multiline={true}
        numberOfLines={8}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TagInputBox tag={tags} setTag={setTags} />

      <Text>Course: </Text>
      <Picker
        mode="dropdown"
        selectedValue={courseId}
        enabled={selectedCourse ? false : true}
        onValueChange={(value) => {
          console.log(value);
          setCourseId(value);
        }}
      >
        <Picker.Item label="-------" value={-1} key={-1} />
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
      <Text>Attachment: </Text>
      <TouchableOpacity onPress={pickDocument}>
        <Text>{attachment ? attachment.name : "Add attachment"}</Text>
      </TouchableOpacity>
      {mat ? (
        <Button onPress={updateGivenMaterial} title="Edit" />
      ) : (
        <Button onPress={addNewMaterial} title="Add" />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  selectedCourse: state.courses.selectedCourse,
  selectedMaterial: state.courses.selectedMaterial,
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addMaterial: (course_id, material) =>
    dispatch(addMaterial(course_id, material)),
  updateMaterial: (course_id, material) =>
    dispatch(updateMaterial(course_id, material)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMaterialScreen);
