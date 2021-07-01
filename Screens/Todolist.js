import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Dimensions,
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

import { firebaseTodoDownload } from "../Utils/FirebaseUtils";
import { formatDate } from "../Utils/date.utils";
import { AntDesign } from "@expo/vector-icons";
import AddButton from "../Components/reusable/AddButton";
import { getDateTime } from "../Utils/Event/event.utils";

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
    <>
    <ImageBackground
      style={styles.backgroundView}
      source={require("../assets/pics/bg.png")}
    />
    <View style = {styles.container}>
      <View>
        <Text style={styles.title}>My Tasks</Text>
        <FlatList
          data={todos
            .filter((todo) => !todo.completed)
            .sort((a, b) => getDateTime(formatDate(a.date), formatDate(a.time))
                     - getDateTime(formatDate(b.date), formatDate(b.time)))}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item }) => <Todo key={item.id} todo={item} />}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            <>
              <FlatList
                data={
                  showCompleted
                    ? todos
                        .filter((todo) => todo.completed)
                        .sort((a, b) => getDateTime(formatDate(b.date), formatDate(b.time))
                          - getDateTime(formatDate(a.date), formatDate(a.time)))
                    : null
                }
                renderItem={({ item }) => <Todo key={item.id} todo={item} />}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={
                  <>
                    {todos.filter((todo) => todo.completed).length > 0 && (
                      <TouchableOpacity
                        style={styles.completedHeadline}
                        onPress={() => setShowCompleted(!showCompleted)}
                      >
                        <Text style={styles.completedHeadlineText}>
                          Completed ({todos.filter((todo) => todo.completed).length})
                        </Text>
                        <Ionicons
                          style={styles.completedHeadlineIcon}
                          size={20}
                          name={showCompleted ? "chevron-down" : "chevron-back"}
                          color="gray"
                        />
                      </TouchableOpacity>
                    )}
                  </>
                }
              />
            </>
          }
          ListEmptyComponent={
            <>
              {todos.length == 0 && (
                <View style={styles.emptyTodo}>
                  <Image
                    style={styles.empty}
                    source={require("../assets/pics/empty.png")}
                  />
                  <Text style={styles.noTask}>No Task</Text>
                </View>
              )}
            </>
          }
        />
      </View>

      {inputBox && <TodoInputBox />}
      {menuBox && <TodoMenu />}
      {!inputBox && (
        <AddButton
          onPress={() => {
            toggleTodoInput();
            selectTodo(null);
          }}
        />
        )}
    </View>
    </>
  )
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
  backgroundView: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 70,
  },
  title: { fontSize: 30, marginLeft: 30, marginBottom: 20 },
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
    borderColor: "rgba(0,0,0,0.4)",
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
    paddingHorizontal: 35,
    textAlignVertical: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.3,
  },

  completedHeadlineText: {
    fontSize: 20,
    paddingVertical: 12,
  },
  completedHeadlineIcon: {
    width: 20,
  },
  empty: {
    width: 200,
    height: 200,
  },
  emptyTodo: {
    width: "100%",
    height: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  noTask: {
    fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
