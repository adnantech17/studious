import React, { useState } from "react"
import { View, Button, StyleSheet} from "react-native"
import ErrorText from "../Form/ErrorText"
import Input from "../Form/Input"

const FieldInput = ({item, setItem, onDelete}) => {
    const [fieldNameTouched, setFieldNameTouched] = useState(false);
    const [fieldValueTouched, setFieldValueTouched] = useState(false);
    const fieldNameError = () => {
        return fieldNameTouched && (item.fieldName == "");
    }

    const fieldValueError = () => {
        return fieldValueTouched &&  (item.value == "");
    }
    return (
        <View style = {styles.container}>
            <Input 
                style = {styles.fieldName} 
                placeholder = "Field Name" 
                value = {item.fieldName}
                onBlur = {() => setFieldNameTouched(true)}
                onFocus = {() => setFieldNameTouched(false)}
                onChangeText = {(text) => {
                        setItem({
                            ...item,
                            fieldName: text
                        })
                    }
                }
            />
            <ErrorText style = {styles.error} visible = {fieldNameError()} > Required </ErrorText> 
            <Input 
                style = {styles.fieldValue}
                placeholder = "Value" 
                value = {item.value}
                onBlur = {() => setFieldValueTouched(true)}
                onFocus = {() => setFieldValueTouched(false)}
                onChangeText = {(text) => {
                    setItem({
                        ...item,
                        value: text
                    })
                }}
            />
            <ErrorText style = {styles.error} visible = {fieldValueError()}> Required </ErrorText> 
            { !item.required && <Button 
                title = "Delete"
                onPress = {onDelete}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
    },
    fieldName: {
        
    },
    fieldValue: {
    
    }
})

export default FieldInput;