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
  setTodos,
  toggleTodoInput,
  updateTodo,
} from "../../Redux/todo/todo.action";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { formatDate, getDateText, getTimeText } from "../../Utils/date.utils";
import DateButton from "../Buttons/DateButton";
import {
  firebaseNewTodoUpload,
  firebaseTodoUpdate,
  firebaseTodoUpload,
} from "../../Utils/FirebaseUtils";
import { set } from "react-native-reanimated";

const TodoInputBox = ({
  addTodo,
  inputBox,
  toggleTodoInput,
  selectedTodo,
  updateTodo,
  setTodos,
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const [title, setTitle] = useState(selectedTodo ? selectedTodo.name : "");
  const [todoDate, setTodoDate] = useState(
    selectedTodo ? formatDate(selectedTodo.date) : null
  );
  const [todoTime, setTodoTime] = useState(
    selectedTodo ? formatDate(selectedTodo.time) : null
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
    const dt = new Date();
    var todo = {
      id: dt.getTime(),
      name: title,
      completed: false,
      date: todoDate,
      time: todoTime,
    };

    if (selectedTodo) todo.id = selectedTodo.id;

    selectedTodo ? updateTodo(todo) : addTodo(todo);

    selectedTodo
      ? firebaseTodoUpdate(todo, setTodos)
      : firebaseNewTodoUpload(todo, setTodos);

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
            <DateButton
              onPress={showDatepicker}
              text={getDateText(todoDate)}
              icon="calendar"
            />
            {todoDate && (
              <DateButton
                onPress={showTimepicker}
                text={getTimeText(todoTime)}
                icon="time"
              />
            )}
          </View>
          <Ionicons
            style={styles.send}
            name="send"
            size={28}
            color="#72AFFF"
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
    paddingHorizontal: 25,
    marginVertical: 10,
  },

  belowText: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  setTodos: (todos) => dispatch(setTodos(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInputBox);
