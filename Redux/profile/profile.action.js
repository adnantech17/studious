export const addField = (field) => ({
    type : "ADD_FIELD",
    payload: field,
})

export const setFieldData = (fieldData) => ({
    type : "SET_FIELD_DATA",
    payload: fieldData,
})

export const setProfileImageUri = (imageUri) => ({
    type: "SET_PROFILE_IMAGE_URI",
    payload: imageUri,
})