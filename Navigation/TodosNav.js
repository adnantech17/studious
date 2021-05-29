import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import TodoList from "../Screens/Todolist";
const TodosStack = createStackNavigator();

const TodosNav = () => {
    return (
        <TodosStack.Navigator>
            <TodosStack.Screen
                name="Todo List"
                component={TodoList}
                options={{ title: "Todo List" }}
            />
        </TodosStack.Navigator>
    );
};

export default TodosNav;
