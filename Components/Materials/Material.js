import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import {
  selectCourse,
  selectMaterial,
  toggleMaterialMenu,
} from "../../Redux/material/material.action";
import { getDateTimeText } from "../../Utils/date.utils";

function Material({
  course,
  material,
  toggleMenuBox,
  selectMaterial,
  selectCourse,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        selectCourse(course);
        selectMaterial(course.id, material);
        toggleMenuBox();
      }}
    >
      <Text>{material.title}</Text>
      <Text>
        {material.datetime.toDate
          ? getDateTimeText(material.datetime.toDate())
          : getDateTimeText(material.datetime)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 5,
    margin: 5,
  },
});

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  selectMaterial: (course_id, material) =>
    dispatch(selectMaterial(course_id, material)),
  selectCourse: (course) => dispatch(selectCourse(course)),
  toggleMenuBox: () => dispatch(toggleMaterialMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Material);
