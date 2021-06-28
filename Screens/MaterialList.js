import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import AddButton from "../Components/Buttons/AddButton";
import Course from "../Components/Materials/Course";
import CourseInputBox from "../Components/Materials/CourseInputBox";
import MaterialMenu from "../Components/Materials/AddMenu";
import { setCourses, toggleMenuBox } from "../Redux/material/material.action";
import { firebaseCourseDownload } from "../Utils/FirebaseUtils";

const MaterialList = ({
  courses,
  matMenuBox,
  toggleMenuBox,
  navigation,
  inputBox,
  setCourses,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    firebaseCourseDownload(setRefreshing, setCourses);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Course key={item.id} course={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddButton onPress={() => toggleMenuBox()} />
      {matMenuBox && <MaterialMenu navigation={navigation} />}
      {inputBox && <CourseInputBox />}
    </View>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  matMenuBox: state.courses.matMenuBox,
  inputBox: state.courses.inputBox,
});
const mapDispatchToProps = (dispatch) => ({
  toggleMenuBox: () => dispatch(toggleMenuBox()),
  setCourses: (courses) => dispatch(setCourses(courses)),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);
