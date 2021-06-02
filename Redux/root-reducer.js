import { combineReducers } from "redux";
import todoReducer from "./todo/todo.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    todos: todoReducer,
});

export default rootReducer;
