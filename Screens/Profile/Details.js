import React from "react"
import { Text, View, Button, FlatList } from "react-native"

import FieldItem from "../../Components/Profile/FieldItem"

const fields = [
    {
        id: "1",
        fieldName: "Name",
        value: "Mridul"
    },
    {
        id: "2",
        fieldName: "Email",
        value: "mridul.haque.mh@gmail.com"
    },
    {
        id: "3",
        fieldName: "Sex",
        value: "Male"
    },
    {
        id: "4",
        fieldName: "Date of Birth",
        value: "20 Dec 1998"
    }
]

const renderField = ({item}) => {
    return (
        <FieldItem item = {item} />
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
                onPress = {() => navigation.navigate("EditScreen")}
            />
        </View>
    )
}

export default Details;