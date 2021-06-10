import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import AddButton from "../Components/Buttons/AddButton";
import Course from "../Components/Materials/Course";
import CourseInputBox from "../Components/Materials/CourseInputBox";
import MaterialMenu from "../Components/Materials/MaterialMenu";
import { toggleMenuBox } from "../Redux/material/material.action";

const MaterialList = ({
    courses,
    matMenuBox,
    toggleMenuBox,
    navigation,
    inputBox,
}) => {
    return (
        <View style={styles.container}>
            <ScrollView>
                {courses.map((course) => (
                    <Course
                        key={course.id}
                        course={course}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
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
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialList);
