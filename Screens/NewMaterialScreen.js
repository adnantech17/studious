import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { Picker } from "@react-native-community/picker";

import {
  addMaterial,
  removeMaterial,
  selectCourse,
  selectMaterial,
  setCourses,
  updateMaterial,
} from "../Redux/material/material.action";
import TagInputBox from "../Components/Input/TagInputBox";
import Attachment from "../Components/Materials/Attachment";
import {
  firebaseMaterialChangeCourse,
  firebaseMaterialDelete,
  firebaseMaterialUpdate,
  firebaseNewMaterialUpload,
} from "../Utils/FirebaseUtils";
import MaterialForm from "../Components/Materials/MaterialForm";

const NewMaterialScreen = ({
  addMaterial,
  courses,
  navigation,
  selectedCourse,
  selectedMaterial,
  updateMaterial,
  setCourses,
  removeMaterial,
  selectMaterial,
  selectCourse,
}) => {
  const mat = selectedMaterial.material;
  const addNewMaterial = (material, courseId) => {
    console.log("ADD: ", material, courseId);
    addMaterial(courseId, material);
    firebaseNewMaterialUpload(courseId, material, setCourses);
  };

  const updateGivenMaterial = (material, courseId) => {
    if (courseId !== selectedCourse.id) {
      removeMaterial(selectedCourse.id, material);
      addMaterial(courseId, material);
      firebaseMaterialChangeCourse(
        courseId,
        selectedCourse.id,
        material,
        setCourses
      );
    } else {
      updateMaterial(courseId, material);
      firebaseMaterialUpdate(courseId, material, setCourses);
    }
  };

  const spiltItem = (item) => {
    return {
      material: {
        id: item.id,
        title: item.title,
        description: item.description,
        attachment: item.attachment,
        tags: item.tags,
        datetime: item.datetime,
      },
      courseId: item.course.id,
    };
  };

  const handleSubmit = (item) => {
    const { material, courseId } = spiltItem(item);
    selectMaterial(courseId, material);
    selectCourse(item.course);

    selectedMaterial.material
      ? updateGivenMaterial(material, courseId)
      : addNewMaterial(material, courseId);

    navigation.goBack();
  };
  return (
    <View>
      <Text>{mat ? "Edit Material" : "Add Material"}</Text>
      <MaterialForm
        item={
          mat
            ? {
                ...mat,
                course: selectedCourse,
              }
            : null
        }
        courses={courses}
        handleSubmit={handleSubmit}
        handleCancel={() => navigation.goBack()}
        submitButtonLabel={mat ? "EDIT" : "ADD"}
        cancelButtonLabel={mat ? "CANCEL" : "DISCARD"}
      />
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
  removeMaterial: (course_id, material) =>
    dispatch(removeMaterial(course_id, material)),
  selectMaterial: (course_id, material) =>
    dispatch(selectMaterial(course_id, material)),
  selectCourse: (course) => dispatch(selectCourse(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMaterialScreen);
