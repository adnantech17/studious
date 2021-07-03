import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  selectCourse,
  selectMaterial,
  toggleCourseMenu,
} from "../../Redux/material/material.action";
import CourseMenu from "./CourseMenu";
import Material from "./Material";
import MaterialMenu from "./MaterialMenu";
import colors from "../../assets/colors";

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

  function subset(arr1, arr2) {
    return arr2.every(function (val) {
      return arr1.indexOf(val) >= 0;
    });
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            selectCourse(course);
            toggleMenuBox();
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#073572" }}>
            {course.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addNewMaterial}>
          <Text style={{ fontSize: 32 }}>
            <AntDesign name="plus" size={16} color="#073572" />
          </Text>
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
            .filter((material) => subset(material.tags, filterTags))
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
    padding: 5,
    paddingVertical: 10,
    margin: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.backgroundColor,
    elevation: 5,
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
