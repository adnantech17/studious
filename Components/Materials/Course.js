import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import {
    selectCourse,
    selectMaterial,
} from "../../Redux/material/material.action";
import Material from "./Material";

function Course({ course, navigation, selectCourse, selectMaterial }) {
    const addNewMaterial = () => {
        selectCourse(course);
        selectMaterial(null, null);
        navigation.navigate("NewMaterial");
    };
    return (
        <View>
            <Text>{course.title}</Text>
            <Button title="+" onPress={addNewMaterial} />

            {course.materials.map((material) => (
                <Material
                    course={course}
                    material={material}
                    navigation={navigation}
                    key={material.id}
                />
            ))}
        </View>
    );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    selectMaterial: (course_id, material) =>
        dispatch(selectMaterial(course_id, material)),
    selectCourse: (course) => dispatch(selectCourse(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
