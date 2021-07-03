import React, { useState } from "react";
import { useEffect } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import AddButton from "../Components/Buttons/AddButton";
import Course from "../Components/Materials/Course";
import CourseInputBox from "../Components/Materials/CourseInputBox";
import MaterialMenu from "../Components/Materials/AddMenu";
import { Entypo } from "@expo/vector-icons";
import {
  setCourses,
  toggleFilterBox,
  toggleMenuBox,
} from "../Redux/material/material.action";
import { firebaseCourseDownload } from "../Utils/FirebaseUtils";
import { Ionicons } from "@expo/vector-icons";
import TagInputBox from "../Components/Input/TagInputBox";
import { AntDesign } from "@expo/vector-icons";

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

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/pics/bg.png")}
    >
      {filterBox ? (
        <View style={styles.tag}>
          <TagInputBox tag={filterTags} setTag={setFilterTags} />
          <TouchableOpacity
            onPress={() => {
              toggleFilterBox();
              setFilterTags([]);
            }}
          >
            <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={toggleFilterBox}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 30 }}>My Materials</Text>
          <AntDesign name="filter" size={32} color="black" />
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
        ListEmptyComponent={
          <>
            {Course.length == 0 && (
              <View style={styles.emptyCourse}>
                <Image
                  style={styles.empty}
                  source={require("../assets/pics/empty.png")}
                />
                <Text style={styles.noCourse}>No Course</Text>
              </View>
            )}
          </>
        }
      />
      <AddButton onPress={() => toggleMenuBox()} />
      {matMenuBox && <MaterialMenu navigation={navigation} />}
      {inputBox && <CourseInputBox />}
    </ImageBackground>
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
    paddingTop: 85,
  },
  tag: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 5,
    marginBottom: 13,
  },
  empty: {
    width: 200,
    height: 200,
  },
  emptyCourse: {
    width: "100%",
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  noCourse: {
    fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);
