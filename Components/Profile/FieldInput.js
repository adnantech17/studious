import React from "react"
import { View, Button, StyleSheet} from "react-native"
import ErrorText from "../Form/ErrorText"
import Input from "../Form/Input"

const FieldInput = ({item, setItem, onDelete}) => {
    
    return (
        <View style = {styles.container}>
            <Input 
                style = {styles.fieldName} 
                placeholder = "Field Name" 
                value = {item.fieldName}
                onChangeText = {(text) => {
                        setItem({
                            ...item,
                            fieldName: text
                        })
                    }
                }
            />
            <ErrorText style = {styles.error} visible > Required </ErrorText> 
            <Input 
                style = {styles.fieldValue}
                placeholder = "Value" 
                value = {item.value}
                onChangeText = {(text) => {
                    setItem({
                        ...item,
                        value: text
                    })
                }
            }
            />
            <ErrorText style = {styles.error} visible > Required </ErrorText> 
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