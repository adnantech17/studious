import React, { useState } from "react";
import nextId from "react-id-generator";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-community/picker";

import {
  addMaterial,
  setCourses,
  updateMaterial,
} from "../Redux/material/material.action";
import TagInputBox from "../Components/Input/TagInputBox";
import Attachment from "../Components/Materials/Attachment";
import {
  firebaseMaterialUpdate,
  firebaseNewMaterialUpload,
} from "../Utils/FirebaseUtils";

const NewMaterialScreen = ({
  addMaterial,
  courses,
  navigation,
  selectedCourse,
  selectedMaterial,
  updateMaterial,
  setCourses,
}) => {
  const mat = selectedMaterial.material;
  const [title, setTitle] = useState(mat ? mat.title : "");
  const [description, setDescription] = useState(mat ? mat.description : "");
  const [attachment, setAttachment] = useState(mat ? mat.attachment : null);
  const [tags, setTags] = useState(mat ? mat.tags : []);
  const [courseId, setCourseId] = useState(
    selectedCourse ? selectedCourse.id : -1
  );

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
    const material = createMaterial(null);
    if (!performCheck()) return;
    addMaterial(courseId, material);
    firebaseNewMaterialUpload(courseId, material, setCourses);
    cleanupWhenDone();
  };

  const updateGivenMaterial = () => {
    const material = createMaterial(mat.id);
    if (!performCheck()) return;
    updateMaterial(courseId, material);
    firebaseMaterialUpdate(courseId, material, setCourses);
    cleanupWhenDone();
  };

  return (
    <View>
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
      <Attachment attachment={attachment} setAttachment={setAttachment} />
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
  setCourses: (courses) => dispatch(setCourses(courses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMaterialScreen);
