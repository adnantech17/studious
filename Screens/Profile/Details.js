import React, { useState } from "react"
import nextId from "react-id-generator";
import { View, Button, FlatList, ToastAndroid } from "react-native"
import { add } from "react-native-reanimated";
import { connect } from "react-redux";
import AddNewFieldModal from "../../Components/Profile/AddNewFieldModal";

import FieldItem from "../../Components/Profile/FieldItem"
import { addField } from "../../Redux/profile/profile.action";

const renderField = ({item}) => {
    const onCopyPress = () => {
        ToastAndroid.show("Copied!",ToastAndroid.SHORT);
    }
    return (
        <FieldItem item = {item} onButtonPress = {onCopyPress} />
    )
}

const Details = ({navigation, fieldData, addField}) => {
    const [addNewModalShown, setAddNewModalShown] = useState(false);

    const onAddNewField = (item) => {
        const field = {
            id: nextId(),
            required: false,
            ...item,
        }
        addField(field);
        setAddNewModalShown(false);
    }

    return (
        <>
            <View>
                <FlatList
                    data = {fieldData}
                    keyExtractor = {(item) => item.id}
                    renderItem = {renderField}
                />
                <Button
                    title = "Add New Field"
                    onPress = {() => {
                        setAddNewModalShown(true);
                        console.log("LOL");
                    }}
                />
                <Button
                    title = "Edit"
                    onPress = {() => navigation.push("EditScreen")}
                />
            </View>
                { 
                    addNewModalShown && 
                    <AddNewFieldModal 
                        onSubmit = {onAddNewField} 
                        isVisible = {addNewModalShown} 
                        setVisibility = {setAddNewModalShown}
                    /> 
                }
        </>
    )
}

const mapStateToProps = (state) => ({
    fieldData: state.profile.fieldData,

});
const mapDispatchToProps = (dispatch) => ({
    addField: (field) => dispatch(addField(field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);