import { combineReducers } from "redux";
import profileReducer from "./profile/profile.reducer";
import todoReducer from "./todo/todo.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    todos: todoReducer,
    profile: profileReducer,
});

export default rootReducer;
