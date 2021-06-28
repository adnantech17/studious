import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  removeTodo,
  toggleMenuBox,
  toggleCompletedTodo,
  toggleTodoInput,
} from "../../Redux/todo/todo.action";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MenuButton from "../Buttons/MenuButton";

const TodoMenu = ({
  menuBox,
  toggleMenuBox,
  selectedTodo,
  removeTodo,
  toggleCompletedTodo,
  toggleTodoInput,
}) => {
  return (
    <Modal
      onBackdropPress={toggleMenuBox}
      onBackButtonPress={toggleMenuBox}
      isVisible={menuBox}
      style={styles.modal}
    >
      <View style={styles.container}>
        <MenuButton
          title="Edit"
          name="pencil"
          onPress={() => {
            toggleMenuBox();
            toggleTodoInput();
          }}
        />
        <MenuButton
          title={
            !selectedTodo.completed ? "Mark as Completed" : "Mark as Incomplete"
          }
          name="flag"
          onPress={() => {
            toggleCompletedTodo(selectedTodo);
            toggleMenuBox();
          }}
        />

        <MenuButton
          title="Remove"
          name="trash-bin"
          onPress={() => {
            removeTodo(selectedTodo);
            toggleMenuBox();
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
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoMenu);
