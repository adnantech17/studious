import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  selectTodo,
  setTodos,
  toggleCompletedTodo,
  toggleMenuBox,
} from "../../Redux/todo/todo.action";
import { getDateText, getTimeText } from "../../Utils/date.utils";
import Checkbox from "expo-checkbox";
import { firebaseTodoUpdate } from "../../Utils/FirebaseUtils";

const Todo = ({
  todo,
  toggleCompletedTodo,
  toggleMenuBox,
  selectTodo,
  setTodos,
}) => {
  const [chk, setChk] = useState(todo.completed);

  const handlePress = () => {
    selectTodo(todo);
    toggleMenuBox();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.title}>
        <Checkbox
          onValueChange={() => {
            toggleCompletedTodo(todo);
            firebaseTodoUpdate(
              { ...todo, completed: !todo.completed },
              setTodos
            );
            setChk(!chk);
          }}
          color="#72AFFF"
          value={chk}
        />
        <Text
          style={[
            todo.completed && styles.crossed,
            !todo.completed && styles.name,
          ]}
        >
          {todo.name}
        </Text>
      </View>
      <View style={styles.date}>
        {todo.date && <Text style={styles.time}>{getDateText(todo.date)}</Text>}
        {todo.time && <Text style={styles.time}>{getTimeText(todo.time)}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCompletedTodo: (todo) => dispatch(toggleCompletedTodo(todo)),
  toggleMenuBox: () => dispatch(toggleMenuBox()),
  selectTodo: (todo) => dispatch(selectTodo(todo)),
  setTodos: (todos) => dispatch(setTodos(todos)),
});

const styles = StyleSheet.create({
  crossed: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginLeft: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    borderBottomWidth: 0.1,
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  time: { fontSize: 10 },
  name: {
    marginLeft: 10,
  },
});

export default connect(null, mapDispatchToProps)(Todo);
