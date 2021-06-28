import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import MenuButton from "../Buttons/MenuButton";
import {
  removeCourse,
  toggleCourseInput,
  toggleCourseMenu,
} from "../../Redux/material/material.action";
import { firebaseCourseDelete } from "../../Utils/FirebaseUtils";

const CourseMenu = ({
  menuBox,
  toggleMenuBox,
  selectedCourse,
  removeCourse,
  toggleCourseInput,
}) => {
  return (
    <Modal
      onBackdropPress={toggleMenuBox}
      onBackButtonPress={toggleMenuBox}
      isVisible={menuBox}
      style={styles.modal}
    >
      <View style={styles.container}>
        <MenuButton
          title="Edit"
          name="pencil"
          onPress={() => {
            toggleMenuBox();
            toggleCourseInput();
          }}
        />

        <MenuButton
          title="Remove"
          name="trash-bin"
          onPress={() => {
            firebaseCourseDelete(selectedCourse);
            removeCourse(selectedCourse);
            toggleMenuBox();
          }}
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
    paddingTop: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 8,
  },

  icon: {
    marginRight: 8,
  },
});

const mapStateToProps = (state) => ({
  menuBox: state.courses.courseMenuBox,
  selectedCourse: state.courses.selectedCourse,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenuBox: () => dispatch(toggleCourseMenu()),
  removeCourse: (course) => dispatch(removeCourse(course)),
  toggleCourseInput: () => dispatch(toggleCourseInput()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseMenu);
