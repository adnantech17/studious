import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native"
import Modal from "react-native-modal";
import ErrorText from "../Form/ErrorText";
import Input from "../Form/Input";



const AddNewFieldModal = ({onSubmit, isVisible, setVisibility}) => {
    const [item, setItem] = useState({fieldName: "", value: ""});
    const [fieldNameTouched, setFieldNameTouched] = useState(false);
    const [fieldValueTouched, setFieldValueTouched] = useState(false);
    const fieldNameError = () => {
        return fieldNameTouched && (item.fieldName == "");
    }

    const fieldValueError = () => {
        return fieldValueTouched &&  (item.value == "");
    }

    const validItem = () => {
        return item.fieldName != "" && item.value != "";
    }
    return (
        <Modal
            isVisible = {isVisible}
            onBackdropPress={() => setVisibility(false)}
            onBackButtonPress={() => setVisibility(false)}
        >
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
                <Button 
                    title = "Save"
                    onPress = {() => {
                        if(validItem()) onSubmit(item);
                        else {
                            setFieldNameTouched(true);
                            setFieldValueTouched(true);
                        }
                    }}
                />
                <Button
                    title = "Cancel"
                    onPress = {() => setVisibility(false)}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        backgroundColor: "white",
    },
    fieldName: {
        
    },
    fieldValue: {
    
    }
})

export default AddNewFieldModal;