export const addTodo = (todo) => ({
    type: "ADD_TODO",
    payload: todo
});

export const removeTodo = (todo) => ({
    type: "REMOVE_TODO",
    payload: todo,
});

export const updateTodo = (todo) => ({
    type: "UPDATE_TODO",
    payload: todo,
});

export const toggleCompletedTodo = (todo) => ({
    type: "TOGGLE_COMPLETED_TODO",
    payload: todo,
});

export const toggleTodoInput = () => ({
    type: "TOGGLE_TODO_INPUT",
});

export const toggleMenuBox = () => ({
    type: "TOGGLE_MENU_BOX",
});

export const selectTodo = (todo) => ({
    type: "SELECT_TODO",
    payload: todo,
});
