import React from "react"
import { Text, View, Button, FlatList, ToastAndroid } from "react-native"

import FieldItem from "../../Components/Profile/FieldItem"

const fields = [
    {
        id: "1",
        fieldName: "Name",
        value: "Mridul",
        required: true,
    },
    {
        id: "2",
        fieldName: "Email",
        value: "mridul.haque.mh@gmail.com",
        required: true,
    },
    {
        id: "3",
        fieldName: "Sex",
        value: "Male",
        required: false,
    },
    {
        id: "4",
        fieldName: "Date of Birth",
        value: "20 Dec 1998",
        required: false,
    }
]

const renderField = ({item}) => {
    const onCopyPress = () => {
        ToastAndroid.show("Copied!",ToastAndroid.SHORT);
    }
    return (
        <FieldItem item = {item} onButtonPress = {onCopyPress} />
    )
}

const Details = ({navigation}) => {
    return (
        <View>
            <FlatList
                data = {fields}
                keyExtractor = {(item) => item.id}
                renderItem = {renderField}
            />
            <Button
                title = "Edit"
                onPress = {() => navigation.push("EditScreen")}
            />
        </View>
    )
}

export default Details;