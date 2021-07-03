import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Modal from "react-native-modal";
import { connect } from "react-redux";
import colors from "../../assets/colors";
import {
  addCourse,
  setCourses,
  toggleCourseInput,
  toggleMenuBox,
  updateCourse,
} from "../../Redux/material/material.action";
import {
  firebaseCourseUpdate,
  firebaseNewCourseUpload,
} from "../../Utils/FirebaseUtils";

const CourseInputBox = ({
  inputBox,
  addCourse,
  toggleCourseInput,
  selectedCourse,
  updateCourse,
  setCourses,
}) => {
  const [title, setTitle] = useState(
    selectedCourse ? selectedCourse.title : ""
  );
  const [error, setError] = useState(false);

  const addNewCourse = () => {
    if (title.trim() === "") {
      setError(true);
      return;
    }

    if (selectedCourse) {
      const course = {
        id: selectedCourse.id,
        title: title,
        materials: selectedCourse.materials,
      };

      updateCourse(course);
      firebaseCourseUpdate(course, setCourses);
    } else {
      const dt = new Date();
      const course = {
        id: dt.getTime(),
        title: title,
        materials: [],
      };
      addCourse(course);

      firebaseNewCourseUpload(course, setCourses);
    }
    toggleCourseInput();
  };

  return (
    <Modal
      onBackdropPress={toggleCourseInput}
      onBackButtonPress={toggleCourseInput}
      isVisible={inputBox}
      style={styles.modal}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Course Name?"
          placeholderTextColor={error ? "#AF0000" : "#a9a9a9"}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            setError(false);
          }}
        />
        <Ionicons
          style={styles.send}
          name="send"
          size={28}
          color={colors.backgroundColor2}
          onPress={addNewCourse}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#ffffff",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
});

const mapStateToProps = (state) => ({
  inputBox: state.courses.inputBox,
  selectedCourse: state.courses.selectedCourse,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenuBox: () => dispatch(toggleMenuBox()),
  toggleCourseInput: () => dispatch(toggleCourseInput()),
  addCourse: (course) => dispatch(addCourse(course)),
  updateCourse: (course) => dispatch(updateCourse(course)),
  setCourses: (courses) => dispatch(setCourses(courses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseInputBox);
