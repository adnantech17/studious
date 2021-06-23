import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Todo from "../Components/TodoList/Todo";
import {
  selectTodo,
  setTodos,
  toggleTodoInput,
} from "../Redux/todo/todo.action";
import TodoInputBox from "../Components/TodoList/TodoInputBox";
import { Ionicons } from "@expo/vector-icons";
import TodoMenu from "../Components/TodoList/TodoMenu";
import {
  firebaseTodoDownload,
  firebaseTodoUpload,
} from "../Utils/FirebaseUtils";
import { formatDate } from "../Utils/date.utils";

const TodoList = ({
  todos,
  toggleTodoInput,
  inputBox,
  menuBox,
  selectTodo,
  setTodos,
}) => {
  const [showCompleted, setShowCompleted] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // firebaseTodoUpload(todos);
  }, [todos]);

  const onRefresh = () => {
    setRefreshing(true);
    firebaseTodoDownload(setRefreshing, setTodos);
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={todos
            .filter((todo) => !todo.completed)
            .sort((a, b) => formatDate(a.date) - formatDate(b.date))}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => <Todo key={item.id} todo={item} />}
          keyExtractor={(item) => item.id}
        />
        {todos.filter((todo) => todo.completed).length > 0 && (
          <TouchableOpacity
            style={styles.completedHeadline}
            onPress={() => setShowCompleted(!showCompleted)}
          >
            <Text style={styles.completedHeadlineText}>Completed</Text>
            <Ionicons
              style={styles.completedHeadlineIcon}
              size={20}
              name={showCompleted ? "chevron-down" : "chevron-back"}
              color="gray"
            />
          </TouchableOpacity>
        )}
        <FlatList
          data={todos
            .filter((todo) => todo.completed)
            .sort((a, b) => a.date - b.date)}
          renderItem={({ item }) => <Todo key={item.id} todo={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>

      {inputBox && <TodoInputBox />}
      {menuBox && <TodoMenu />}
      {!inputBox && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            toggleTodoInput();
            selectTodo(null);
          }}
        >
          <Text style={{ fontSize: 32 }}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  inputBox: state.todos.inputBox,
  menuBox: state.todos.menuBox,
  user: state.user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  toggleTodoInput: () => dispatch(toggleTodoInput()),
  selectTodo: (todo) => dispatch(selectTodo(todo)),
  setTodos: (todos) => dispatch(setTodos(todos)),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  input: {
    justifyContent: "flex-end",
  },
  addButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 32,
    position: "absolute",
    bottom: 24,
    right: 24,
  },
  completedHeadline: {
    backgroundColor: "#ccc",
    paddingHorizontal: 8,
    textAlignVertical: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  completedHeadlineText: {
    height: 32,
    fontSize: 18,
    fontWeight: "bold",
  },
  completedHeadlineIcon: {
    width: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
