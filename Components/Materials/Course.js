import React from "react";
import { View, Text, Button } from "react-native";
import { connect } from "react-redux";
import { selectCourse } from "../../Redux/material/material.action";
import Material from "./Material";

function Course({ course, navigation, selectCourse }) {
    const addNewMaterial = () => {
        selectCourse(course);
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
    selectCourse: (course) => dispatch(selectCourse(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
