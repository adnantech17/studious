import { combineReducers } from "redux";
import courseReducer from "./material/material.reducer";
import todoReducer from "./todo/todo.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    todos: todoReducer,
    courses: courseReducer,
});

export default rootReducer;
