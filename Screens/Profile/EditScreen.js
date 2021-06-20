import React, { useState, useRef } from "react"
import nextId from "react-id-generator";
import { View, Button, ToastAndroid, FlatList, KeyboardAvoidingView } from "react-native"
import { connect } from "react-redux";

import FieldInput from "../../Components/Profile/FieldInput";
import { setFieldData } from "../../Redux/profile/profile.action";

const EditScreen = ({navigation, fieldData, setFieldData}) => {
    const [data, setData] = useState(fieldData);
    const [newItem, setNewItem] = useState();

    const listRef = useRef();

    const onSave = () => {
        setFieldData(data.filter( (field) => field.fieldName != "" && field.value != "" ));
        navigation.goBack();
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
                            onPress = {onSave}
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

const mapStateToProps = (state) => ({
    fieldData: state.profile.fieldData,
});

const mapDispatchToProps = (dispatch) => ({
    setFieldData: (fieldData) => dispatch(setFieldData(fieldData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);