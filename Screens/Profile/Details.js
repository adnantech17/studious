import React, { useEffect, useState } from "react";
import nextId from "react-id-generator";
import { View, Button, FlatList, ToastAndroid, Image, StyleSheet } from "react-native";
import * as Sharing from 'expo-sharing'; 
import * as MediaLibrary from 'expo-media-library';
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

const Details = ({navigation, fieldData, addField, profileImageUri}) => {
    const [addNewModalShown, setAddNewModalShown] = useState(false);
    useEffect(() => {
        requestPermission();
    }, []);
    
    const requestPermission = async () => {
        const { granted } = await MediaLibrary.requestPermissionsAsync();
        if (!granted) alert("You need to enable permission to access the library.");
    };

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
                    ListHeaderComponent = {
                        <>
                        <View style = {styles.container} >
                            <Image source = {{uri: profileImageUri}} style = {styles.image} />
                        </View>
                        <Button title = "Share" onPress = {() => Sharing.shareAsync(profileImageUri)}/>
                        <Button title = "Save to Device" onPress = {() => MediaLibrary.saveToLibraryAsync(profileImageUri)}/>
                        </>
                    }
                    ListFooterComponent = {
                        <>
                            <Button
                                title = "Add New Field"
                                onPress = {() => {
                                    setAddNewModalShown(true);
                                }}
                            />
                            <Button
                                title = "Edit"
                                onPress = {() => navigation.push("EditScreen")}
                            />
                        </>
                    }
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

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "grey",
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
        marginVertical: 10,
        overflow: "hidden",
        width: 100,
    },
    image: {
        height: "100%",
        width: "100%",
    },
})
const mapStateToProps = (state) => ({
    fieldData: state.profile.fieldData,
    profileImageUri: state.profile.profileImageUri,

});
const mapDispatchToProps = (dispatch) => ({
    addField: (field) => dispatch(addField(field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);