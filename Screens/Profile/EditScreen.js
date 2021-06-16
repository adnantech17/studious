import React, { useState, useRef } from "react"
import nextId from "react-id-generator";
import { View, Button, ToastAndroid, FlatList, KeyboardAvoidingView } from "react-native"
import FieldInput from "../../Components/Profile/FieldInput";

const fieldData = [
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



const EditScreen = () => {
    const [data, setData] = useState(fieldData);
    const [newItem, setNewItem] = useState();

    const listRef = useRef();


    const renderFieldInput = ({item}) => {
        const setItem = (updatedField) => {
            const updatedData = [...data];
            updatedData.forEach( (field) => {
                if(field.id == item.id) 
                {
                    field.fieldName = updatedField.fieldName;
                    field.value = updatedField.value;
                }
            })
            setData(updatedData);
        }

        const onDelete = () => {
            setNewItem(null);
            setData(data.filter((field) => field.id != item.id));
            ToastAndroid.show("Deleted!",ToastAndroid.SHORT);
        }
    
        return (
            <FieldInput item = {item} setItem = {setItem} onDelete = {onDelete} />
        )
    }

    const createEmptyField = () => {
        return {
            id: nextId(),
            fieldName: "",
            value: "",
            required: false,
        }   
    }
    const addField = () =>
    {
        const emptyField = createEmptyField();
        setNewItem(emptyField);
        setData(data.concat(emptyField));
    }
    
    return (
        <KeyboardAvoidingView>
            <FlatList
                ref = {listRef}
                data = {data}
                removeClippedSubviews={false}
                keyExtractor = {item => item.id}
                renderItem = {renderFieldInput}
                onContentSizeChange = { () => {
                    if(newItem) {
                        listRef.current.scrollToItem({item: newItem});
                        setNewItem(null);
                    }
                }}
                ListFooterComponent = {
                    <>
                        <Button
                            title = "Add New Field"
                            onPress = {addField}
                        />
                        <Button 
                            title = "Save"
                            onPress = {() => console.log(data)}
                        />
                        <View
                            style = {{height: 40}}
                        />
                    </>
                }
            />
        </KeyboardAvoidingView>

    )
}

export default EditScreen;