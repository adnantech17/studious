import { firebaseDownloadProfileData } from "../../Utils/Profile/firebase.utils";
import { ADD_FIELD, DELETE_FIELD, EDIT_FIELD, SET_FIELD_DATA, SET_PROFILE_DATA, SET_PROFILE_IMAGE_URI } from "./profile.action";
import { addFieldUtil, deleteFieldUtil, setEditFieldUtil, setFieldDataUtil } from "./profile.utils";

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
        case ADD_FIELD: 
            return {
                ...state,
                fieldData: addFieldUtil(state.fieldData, action.payload),
            }
        case SET_FIELD_DATA:
            return {
                ...state,
                fieldData: setFieldDataUtil(action.payload),
            }
        case SET_PROFILE_IMAGE_URI:
            return {
                ...state,
                profileImageUri: action.payload,
            }
        case EDIT_FIELD:
            return {
                ...state,
                fieldData: setEditFieldUtil(state.fieldData, action.payload),
            }
        case DELETE_FIELD:
            return {
                ...state,
                fieldData: deleteFieldUtil(state.fieldData, action.payload),
            }
        case SET_PROFILE_DATA:
            return {
                ...action.payload,
            }
        default: return state;
    }
}

export default profileReducer;