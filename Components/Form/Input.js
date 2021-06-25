import React, { forwardRef } from "react"
import { StyleSheet, TextInput, View } from "react-native"

const Input = ({style, containerStyle, ...otherProps}, ref) => {
    return (
        <View style = {[styles.container, containerStyle]}>
            <TextInput ref = {ref}
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

export default forwardRef(Input);