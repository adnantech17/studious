import React, { useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import AddButton from "../Components/Buttons/AddButton";
import Course from "../Components/Materials/Course";
import CourseInputBox from "../Components/Materials/CourseInputBox";
import MaterialMenu from "../Components/Materials/AddMenu";
import {
  setCourses,
  toggleFilterBox,
  toggleMenuBox,
} from "../Redux/material/material.action";
import { firebaseCourseDownload } from "../Utils/FirebaseUtils";
import { Ionicons } from "@expo/vector-icons";
import TagInputBox from "../Components/Input/TagInputBox";

const MaterialList = ({
  courses,
  matMenuBox,
  toggleMenuBox,
  navigation,
  inputBox,
  setCourses,
  toggleFilterBox,
  filterBox,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [filterTags, setFilterTags] = useState([]);

  const onRefresh = () => {
    if (!filterBox) {
      setRefreshing(true);
      firebaseCourseDownload(setRefreshing, setCourses);
    }
  };

  return (
    <View style={styles.container}>
      {filterBox ? (
        <View>
          <TagInputBox tag={filterTags} setTag={setFilterTags} />
          <TouchableOpacity
            onPress={() => {
              toggleFilterBox();
              setFilterTags([]);
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={toggleFilterBox}>
          <Ionicons name="filter" size={32} color="gray" />
        </TouchableOpacity>
      )}
      <FlatList
        data={courses}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Course
            key={item.id}
            course={item}
            navigation={navigation}
            filterTags={filterTags}
          />
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
  filterBox: state.courses.filterBox,
});
const mapDispatchToProps = (dispatch) => ({
  toggleMenuBox: () => dispatch(toggleMenuBox()),
  setCourses: (courses) => dispatch(setCourses(courses)),
  toggleFilterBox: () => dispatch(toggleFilterBox()),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);
