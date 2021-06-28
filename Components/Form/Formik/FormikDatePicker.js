import React, { useState } from "react";
import {  } from "react-native";
import { useFormikContext } from "formik";

import DateTimePicker from "@react-native-community/datetimepicker";
import DateButton from "../../Buttons/DateButton";
import { getDateText } from "../../../Utils/date.utils";
import FormikErrorMessage from "./FormikErrorMessage";

const FormikDatePicker = ({
    name,
    icon,
    mode,
    ...otherProps
}) => {
    const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();
    const [showPicker, setShowPicker] = useState(false);

    const onChangeDate = (event, date) => {
        setShowPicker(false);
        if(event.type == "set"){
            setFieldValue(name, date);
        } 
        setFieldTouched(name);
    }

    return (
        <>
        <DateButton 
            icon = {icon} 
            onPress = {() => {
                setShowPicker(true);
            }}
            text = {getDateText(values[name])}
        />
        <FormikErrorMessage 
            error = {errors[name]}
            visible = {touched[name]}
        />
        {
            showPicker &&
            <DateTimePicker
                mode = {mode}
                value = {new Date()}
                onChange = {onChangeDate}
            />
        }
        </>
    )
}

export default FormikDatePicker;
