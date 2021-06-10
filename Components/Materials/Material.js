import React from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
    selectCourse,
    selectMaterial,
} from "../../Redux/material/material.action";
import { getDateTimeText } from "../../Utils/date.utils";

function Material({
    course,
    material,
    navigation,
    selectMaterial,
    selectCourse,
}) {
    return (
        <TouchableOpacity
            onPress={() => {
                selectCourse(course);
                selectMaterial(course.id, material);
                navigation.navigate("NewMaterial");
            }}
        >
            <Text>{material.title}</Text>
            <Text>{getDateTimeText(material.datetime)}</Text>
        </TouchableOpacity>
    );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
    selectMaterial: (course_id, material) =>
        dispatch(selectMaterial(course_id, material)),
    selectCourse: (course) => dispatch(selectCourse(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Material);
