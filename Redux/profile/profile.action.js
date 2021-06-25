export const ADD_FIELD = "ADD_FIELD";
export const addField = (field) => ({
    type : ADD_FIELD,
    payload: field,
})

export const SET_FIELD_DATA = "SET_FIELD_DATA";
export const setFieldData = (fieldData) => ({
    type : SET_FIELD_DATA,
    payload: fieldData,
})

export const SET_PROFILE_IMAGE_URI = "SET_PROFILE_IMAGE_URI";
export const setProfileImageUri = (imageUri) => ({
    type: SET_PROFILE_IMAGE_URI,
    payload: imageUri,
})

export const EDIT_FIELD = "EDIT_FIELD";
export const editField = (field) => ({
    type : EDIT_FIELD,
    payload: field,
})

export const DELETE_FIELD = "DELETE_FIELD";
export const deleteField = (field) => ({
    type : DELETE_FIELD,
    payload: field,
})
