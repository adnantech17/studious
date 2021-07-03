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
  Image,
  Dimensions,
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
    <>
    <ImageBackground
      style={styles.backgroundView}
      source={require("../assets/pics/bg.png")}
    />
    <View style = {styles.container}>
      <View style = {styles.childContainer}>
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
              <View style={styles.emptyCourse}>
                <Image
                  style={styles.empty}
                  source={require("../assets/pics/empty.png")}
                />
                <Text style={styles.noCourse}>No Material</Text>
              </View>
          </>
        }
      />
      <AddButton onPress={() => toggleMenuBox()} />
      {matMenuBox && <MaterialMenu navigation={navigation} />}
      {inputBox && <CourseInputBox />}
      </View>
    </View>
    </>
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
  backgroundView: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 85,
    alignItems: "center",
    zIndex: 2,
  },
  childContainer: {
    width: "100%",
    flex: 1,
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
