import React from "react"
import { View, Button, FlatList, ToastAndroid } from "react-native"
import { connect } from "react-redux";

import FieldItem from "../../Components/Profile/FieldItem"

const renderField = ({item}) => {
    const onCopyPress = () => {
        ToastAndroid.show("Copied!",ToastAndroid.SHORT);
    }
    return (
        <FieldItem item = {item} onButtonPress = {onCopyPress} />
    )
}

const Details = ({navigation, fieldData}) => {
    return (
        <View>
            <FlatList
                data = {fieldData}
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

const mapStateToProps = (state) => ({
    fieldData: state.profile.fieldData,

});
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Details);