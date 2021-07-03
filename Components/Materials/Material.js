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
  navigation,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => {
        selectCourse(course);
        selectMaterial(course.id, material);
        toggleMenuBox();
      }}
      onPress={() => {
        selectCourse(course);
        selectMaterial(course.id, material);
        navigation.navigate("ViewMaterial");
      }}
    >
      <Text>{material.title}</Text>
      <Text style={styles.time}>
        {material.datetime.toDate
          ? getDateTimeText(material.datetime.toDate())
          : getDateTimeText(material.datetime)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 4,
  },
  time: {
    alignSelf: "flex-end",
    fontSize: 10,
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
