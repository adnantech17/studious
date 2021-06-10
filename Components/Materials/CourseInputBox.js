import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import nextId from "react-id-generator";
import { StyleSheet, TextInput, View } from "react-native";

import Modal from "react-native-modal";
import { connect } from "react-redux";
import {
    addCourse,
    toggleCourseInput,
    toggleMenuBox,
} from "../../Redux/material/material.action";

const CourseInputBox = ({ inputBox, addCourse, toggleCourseInput }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(false);

    const addNewCourse = () => {
        if (title.trim() === "") {
            setError(true);
            return;
        }

        addCourse({
            id: nextId(),
            title: title,
            materials: [],
        });
        toggleCourseInput();
    };

    return (
        <Modal
            onBackdropPress={toggleCourseInput}
            onBackButtonPress={toggleCourseInput}
            isVisible={inputBox}
            style={styles.modal}
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder="What do you want to do?"
                    placeholderTextColor={error ? "#AF0000" : "#a9a9a9"}
                    value={title}
                    onChangeText={(text) => {
                        setTitle(text);
                        setError(false);
                    }}
                />
                <Ionicons
                    style={styles.send}
                    name="send"
                    size={32}
                    color="green"
                    onPress={addNewCourse}
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
    inputBox: state.courses.inputBox,
});

const mapDispatchToProps = (dispatch) => ({
    toggleMenuBox: () => dispatch(toggleMenuBox()),
    toggleCourseInput: () => dispatch(toggleCourseInput()),
    addCourse: (course) => dispatch(addCourse(course)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CourseInputBox);
