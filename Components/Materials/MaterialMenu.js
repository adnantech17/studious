import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import Modal from "react-native-modal";
import {
    addMaterial,
    selectCourse,
    selectMaterial,
    toggleCourseInput,
    toggleMenuBox,
} from "../../Redux/material/material.action";
import MenuButton from "../Buttons/MenuButton";

const MaterialMenu = ({
    matMenuBox,
    toggleMenuBox,
    navigation,
    toggleCourseInput,
    selectCourse,
    selectMaterial,
}) => {
    return (
        <Modal
            onBackdropPress={toggleMenuBox}
            onBackButtonPress={toggleMenuBox}
            isVisible={matMenuBox}
            style={styles.modal}
        >
            <View style={styles.container}>
                <MenuButton
                    title="Add new Course"
                    name="book"
                    onPress={() => {
                        toggleMenuBox();
                        toggleCourseInput();
                    }}
                />
                <MenuButton
                    title="Add Course Material"
                    name="newspaper"
                    onPress={() => {
                        toggleMenuBox();
                        selectCourse(null);
                        selectMaterial(null, null);
                        navigation.navigate("NewMaterial");
                    }}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: "flex-end",
    },
    container: {
        backgroundColor: "#ffffff",
        paddingTop: 10,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },
});

const mapStateToProps = (state) => ({
    matMenuBox: state.courses.matMenuBox,
});

const mapDispatchToProps = (dispatch) => ({
    toggleMenuBox: () => dispatch(toggleMenuBox()),
    toggleCourseInput: () => dispatch(toggleCourseInput()),
    addMaterial: (course_id, material) =>
        dispatch(addMaterial(course_id, material)),
    selectCourse: (course) => dispatch(selectCourse(course)),
    selectMaterial: (course_id, material) =>
        dispatch(selectMaterial(course_id, material)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialMenu);
