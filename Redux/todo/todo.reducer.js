import {
    addTodoUtil,
    removeTodoUtil,
    toggleCompletedTodoUtil,
    updateTodoUtil,
} from "./todo.utils";

const INITIAL_STATE = {
    todos: [
        {
            id: 0,
            name: "Hello World",
            date: new Date(),
            time: new Date(),
            completed: false,
        },
    ],
    inputBox: false,
    menuBox: false,
    selectedTodo: null,
};

const todoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_TODOS":
            return {
                ... state,
                todos: action.payload,
            }
        case "ADD_TODO":
            return {
                ...state,
                todos: addTodoUtil(state.todos, action.payload),
            };
        case "REMOVE_TODO":
            return {
                ...state,
                todos: removeTodoUtil(state.todos, action.payload),
            };
        case "TOGGLE_COMPLETED_TODO":
            return {
                ...state,
                todos: toggleCompletedTodoUtil(state.todos, action.payload),
            };

        case "UPDATE_TODO":
            return {
                ...state,
                todos: updateTodoUtil(state.todos, action.payload),
            };

        case "TOGGLE_TODO_INPUT":
            return {
                ...state,
                inputBox: !state.inputBox,
            };
        case "TOGGLE_MENU_BOX":
            return {
                ...state,
                menuBox: !state.menuBox,
            };
        case "SELECT_TODO":
            return {
                ...state,
                selectedTodo: action.payload,
            };
        default:
            return state;
    }
};

export default todoReducer;
