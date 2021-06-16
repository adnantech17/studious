import React from "react"
import { StyleSheet, TextInput, View } from "react-native"

const Input = ({style, containerStyle, ...otherProps}) => {
    return (
        <View style = {[styles.container, containerStyle]}>
            <TextInput 
                style = {[styles.input, style]}
                {...otherProps}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        borderRadius: 25,
        paddingHorizontal: 20,
    },
    input: {

    }
})

export default Input;