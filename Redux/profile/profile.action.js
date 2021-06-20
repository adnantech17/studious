export const addField = (field) => ({
    type : "ADD_FIELD",
    payload: field,
})

export const setFieldData = (fieldData) => ({
    type : "SET_FIELD_DATA",
    payload: fieldData,
})
