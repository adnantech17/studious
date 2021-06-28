import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import {
  selectCourse,
  selectMaterial,
  toggleCourseMenu,
} from "../../Redux/material/material.action";
import CourseMenu from "./CourseMenu";
import Material from "./Material";
import MaterialMenu from "./MaterialMenu";

function Course({
  course,
  navigation,
  selectCourse,
  selectMaterial,
  toggleMenuBox,
  filterTags,
}) {
  const addNewMaterial = () => {
    selectCourse(course);
    selectMaterial(null, null);
    navigation.navigate("NewMaterial");
  };

  const intersection = (array1, array2) => {
    array1 = array1.map((item) => item.toLowerCase());
    array2 = array2.map((item) => item.toLowerCase());
    return array1.filter((value) => array2.includes(value));
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            selectCourse(course);
            toggleMenuBox();
          }}
        >
          <Text style={{ fontSize: 20 }}>{course.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addNewMaterial}>
          <Text style={{ fontSize: 24 }}>+</Text>
        </TouchableOpacity>
      </View>

      {filterTags.length === 0
        ? course.materials.map((material) => (
            <Material
              course={course}
              material={material}
              navigation={navigation}
              key={material.id}
            />
          ))
        : course.materials
            .filter(
              (material) => intersection(material.tags, filterTags).length
            )
            .map((material) => (
              <Material
                course={course}
                material={material}
                navigation={navigation}
                key={material.id}
              />
            ))}
      <CourseMenu />
      <MaterialMenu navigation={navigation} />
    </View>
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
  toggleMenuBox: () => dispatch(toggleCourseMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
