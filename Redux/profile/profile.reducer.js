import { addFieldUtil, setFieldDataUtil } from "./profile.utils";

const INITIAL_STATE = {
    fieldData: [
        {
            id: "1",
            fieldName: "Name",
            value: "Mridul",
            required: true,
        },
        {
            id: "2",
            fieldName: "Email",
            value: "mridul.haque.mh@gmail.com",
            required: true,
        },
        {
            id: "3",
            fieldName: "Sex",
            value: "Male",
            required: false,
        },
        {
            id: "4",
            fieldName: "Date of Birth",
            value: "20 Dec 1998",
            required: false,
        }
    ],
    profileImageUri: null,
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "ADD_FIELD": 
            return {
                ...state,
                fieldData: addFieldUtil(state.fieldData, action.payload),
            }
        case "SET_FIELD_DATA":
            return {
                ...state,
                fieldData: setFieldDataUtil(action.payload),
            }
        case "SET_PROFILE_IMAGE_URI":
            return {
                ...state,
                profileImageUri: action.payload,
            }
        default: return state;
    }
}

export default profileReducer;