import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { connect } from "react-redux";
import nextId from "react-id-generator";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    addTodo,
    toggleTodoInput,
    updateTodo,
} from "../../Redux/todo/todo.action";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { getDateText, getTimeText } from "../../Utils/date.utils";

const TodoInputBox = ({
    addTodo,
    inputBox,
    toggleTodoInput,
    selectedTodo,
    updateTodo,
}) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    const [title, setTitle] = useState(selectedTodo ? selectedTodo.name : "");
    const [todoDate, setTodoDate] = useState(
        selectedTodo ? selectedTodo.date : null
    );
    const [todoTime, setTodoTime] = useState(
        selectedTodo ? selectedTodo.date : null
    );

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);

        if (selectedDate) {
            if (mode === "date") setTodoDate(currentDate);
            else setTodoTime(currentDate);
        }
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    const addNewTodo = () => {
        if (title.trim() === "") {
            setError(true);
            return;
        }
        var todo = {
            id: nextId(),
            name: title,
            completed: false,
            date: todoDate,
            time: todoTime,
        };

        if (selectedTodo) todo.id = selectedTodo.id;

        selectedTodo ? updateTodo(todo) : addTodo(todo);

        setTitle("");
        toggleTodoInput();
    };

    return (
        <Modal
            onBackdropPress={toggleTodoInput}
            onBackButtonPress={toggleTodoInput}
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
                <View style={styles.belowText}>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={showDatepicker}
                            style={styles.button}
                        >
                            <Ionicons
                                style={{ marginRight: 4 }}
                                name="calendar"
                                size={16}
                                color="gray"
                            />
                            <Text>{getDateText(todoDate)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={showTimepicker}
                            style={styles.button}
                        >
                            <Ionicons
                                style={{ marginRight: 4 }}
                                name="time"
                                size={16}
                                color="gray"
                            />
                            <Text>{getTimeText(todoTime)}</Text>
                        </TouchableOpacity>
                    </View>
                    <Ionicons
                        style={styles.send}
                        name="send"
                        size={32}
                        color="green"
                        onPress={addNewTodo}
                    />
                </View>

                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                )}
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

    textInput: {
        height: 32,
        paddingHorizontal: 8,
    },

    belowText: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    buttons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    button: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 5,
        marginRight: 5,
    },

    send: {
        width: 32,
    },
});

const mapStateToProps = (state) => ({
    inputBox: state.todos.inputBox,
    selectedTodo: state.todos.selectedTodo,
});

const mapDispatchToProps = (dispatch) => ({
    addTodo: (todo) => dispatch(addTodo(todo)),
    toggleTodoInput: () => dispatch(toggleTodoInput()),
    updateTodo: (todo) => dispatch(updateTodo(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInputBox);
