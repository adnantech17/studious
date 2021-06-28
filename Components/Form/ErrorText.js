import React from "react"
import { StyleSheet, Text } from "react-native"

const ErrorText = ({style, visible, children, ...otherProps}) => {
    if(!visible) return null;
    return (
        <Text 
            style = {[styles.error, style]} 
            {...otherProps}
        > 
            {children} 
        </Text>
    )
}

const styles = StyleSheet.create({
    error: {
        color: "orange",
        fontWeight: "200",
        paddingHorizontal: 20,
    }
})

export default ErrorText;