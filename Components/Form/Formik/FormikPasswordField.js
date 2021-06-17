import React, { forwardRef, useState } from "react";
import { Button } from "react-native";
import FormikFormField from "./FormikFormField";

const FormikPasswordField = ({name, placeholder = "Password", ...otherProps}, ref) => {
    const [hidePassword, setHidePassword] = useState(true);
    const togglePassword = () => setHidePassword(!hidePassword);  
    return (
        <>
            <FormikFormField
                ref = {ref}
                placeholder = {placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry = {hidePassword}
                name = {name}
                {...otherProps}
            />
            <Button title = "Show/Hide" onPress = {togglePassword} />
        </>
    )
}


export default forwardRef(FormikPasswordField);