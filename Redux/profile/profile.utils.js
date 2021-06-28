export const addFieldUtil = (fields, newField) => {
    return [...fields, newField];
} 

export const setFieldDataUtil = (fieldData) => {
    return [...fieldData];
}

export const setEditFieldUtil = (fields, editedField) => {
    return fields.map((field) => field.id == editedField.id ? editedField : field);
}

export const deleteFieldUtil = (fields, fieldToBeDeleted) => {
    return fields.filter((field) => field.id != fieldToBeDeleted.id);
}