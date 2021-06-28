import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  removeTodo,
  toggleMenuBox,
  toggleCompletedTodo,
  toggleTodoInput,
  selectTodo,
  setTodos,
} from "../../Redux/todo/todo.action";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MenuButton from "../Buttons/MenuButton";
import {
  firebaseTodoDelete,
  firebaseTodoUpdate,
} from "../../Utils/FirebaseUtils";

const TodoMenu = ({
  menuBox,
  toggleMenuBox,
  selectedTodo,
  removeTodo,
  toggleCompletedTodo,
  toggleTodoInput,
  selectTodo,
  setTodos,
}) => {
  return (
    <Modal
      onBackdropPress={toggleMenuBox}
      onBackButtonPress={toggleMenuBox}
      isVisible={menuBox}
      style={styles.modal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            toggleMenuBox();
            toggleTodoInput();
          }}
        >
          <Ionicons style={styles.icon} name="pencil" size={16} color="gray" />
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            toggleMenuBox();
            toggleCompletedTodo(selectedTodo);
            firebaseTodoUpdate(
              { ...selectedTodo, completed: !selectedTodo.completed },
              setTodos
            );
            selectTodo(null);
          }}
        >
          <Ionicons
            style={styles.icon}
            name={"checkmark-done"}
            size={16}
            color="gray"
          />
          <Text>
            {!selectedTodo.completed
              ? "Mark as Completed"
              : "Mark as Incomplete"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            toggleMenuBox();
            firebaseTodoDelete(selectedTodo.id, setTodos);
            removeTodo(selectedTodo);
            selectTodo(null);
          }}
        >
          <Ionicons
            style={styles.icon}
            name="trash-bin"
            size={16}
            color="gray"
          />
          <Text>Remove</Text>
        </TouchableOpacity>
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
  buttons: {
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 8,
  },

  icon: {
    marginRight: 8,
  },
});

const mapStateToProps = (state) => ({
  menuBox: state.todos.menuBox,
  selectedTodo: state.todos.selectedTodo,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenuBox: () => dispatch(toggleMenuBox()),
  removeTodo: (todo) => dispatch(removeTodo(todo)),
  toggleCompletedTodo: (todo) => dispatch(toggleCompletedTodo(todo)),
  toggleTodoInput: () => dispatch(toggleTodoInput()),
  selectTodo: (todo) => dispatch(selectTodo(todo)),
  setTodos: (todos) => dispatch(setTodos(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoMenu);
