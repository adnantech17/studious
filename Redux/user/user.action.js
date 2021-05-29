export const setCurrentUser = (user) => ({
    type: "SET_CURRENT_USER",
    payload: user,
});

export const setLoading = (loadingState) => ({
    type: "SET_LOADING",
    payload: loadingState,
});
