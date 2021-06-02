export const addTodoUtil = (todos, item) => {
    return [...todos, item];
};

export const removeTodoUtil = (todos, item) => {
    return todos.filter((todo) => item.id !== todo.id);
};

export const toggleCompletedTodoUtil = (todos, item) => {
    return todos.map((todo) =>
        todo.id === item.id ? { ...todo, completed: !todo.completed } : todo
    );
};

export const updateTodoUtil = (todos, item) => {
    return todos.map((todo) => (todo.id === item.id ? item : todo));
};
