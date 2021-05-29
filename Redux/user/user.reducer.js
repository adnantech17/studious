const INITIAL_STATE = {
    currentUser: null,
    loadingState: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload,
            };
        case "SET_LOADING":
            return {
                ...state,
                loadingState: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
