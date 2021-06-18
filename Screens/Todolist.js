import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { connect } from "react-redux";
import Todo from "../Components/TodoList/Todo";
import { selectTodo, toggleTodoInput } from "../Redux/todo/todo.action";
import TodoInputBox from "../Components/TodoList/TodoInputBox";
import { Ionicons } from "@expo/vector-icons";
import TodoMenu from "../Components/TodoList/TodoMenu";
import AddButton from "../Components/Buttons/AddButton";

const TodoList = ({ todos, toggleTodoInput, inputBox, menuBox, selectTodo }) => {
    const [showCompleted, setShowCompleted] = useState(true);
    return (
        <View style={styles.container}>
            <View>
                <ScrollView>
                    {todos
                        .filter((todo) => !todo.completed)
                        .sort((a, b) => a.date - b.date)
                        .map((todo) => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                </ScrollView>
                {todos.filter((todo) => todo.completed).length > 0 && (
                    <TouchableOpacity
                        style={styles.completedHeadline}
                        onPress={() => setShowCompleted(!showCompleted)}
                    >
                        <Text style={styles.completedHeadlineText}>
                            Completed
                        </Text>
                        <Ionicons
                            style={styles.completedHeadlineIcon}
                            size={20}
                            name={
                                showCompleted ? "chevron-down" : "chevron-back"
                            }
                            color="gray"
                        />
                    </TouchableOpacity>
                )}
                <ScrollView>
                    {showCompleted &&
                        todos
                            .filter((todo) => todo.completed)
                            .sort((a, b) => a.date - b.date)
                            .map((todo) => <Todo key={todo.id} todo={todo} />)}
                </ScrollView>
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
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos.todos,
    inputBox: state.todos.inputBox,
    menuBox: state.todos.menuBox,
});
const mapDispatchToProps = (dispatch) => ({
    toggleTodoInput: () => dispatch(toggleTodoInput()),
    selectTodo: (todo) => dispatch(selectTodo(todo)),
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
