import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import colors from "../../assets/colors";
import { getDateText, getTimeText } from "../../Utils/date.utils";

const EventCard = ({containerStyle, event, onEdit, onDelete}) => {
    const [showModal, setModalShown] = useState(false);
    const cancel = () => {
        setModalShown(false);
    }

    const onEditButtonPress = () => {
        cancel();
        onEdit(event);
    }

    const onDeleteButtonPress = () => {
        cancel();
        onDelete(event);
    }

    return (
        <>
        <TouchableOpacity 
          style = {[styles.container, containerStyle]}
          onPress = {() => setModalShown(true)}
        >
            <View style = {styles.textContainer}>
                <Text>{event.title}</Text>
            </View>
            <View style = {styles.datetimeContainer}>
                <Text>{getDateText(event.date)}</Text>
                <Text>{getTimeText(event.time)}</Text>
            </View>
        </TouchableOpacity>
        {
            showModal &&
            <Modal 
                isVisible={showModal}
                onBackdropPress={cancel}
                onBackButtonPress={cancel}
            >
                <View style = {styles.modalContainer}>
                    <Text>{event.title}</Text>
                    {event.description != "" && <Text>{event.description}</Text>}
                    {event.venue != "" && <Text>{event.venue}</Text>}
                    <Text>{event.repeatEvent.label}</Text>
                    <Text>{getDateText(event.date)}</Text>
                    <Text>{getTimeText(event.time)}</Text>
                </View>
                <Button title = "Edit" onPress = {onEditButtonPress} />
                <Button title = "Delete" onPress = {onDeleteButtonPress} /> 
            </Modal>
        }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderColor: colors.lightgray,
        borderWidth: 2,
        flexDirection: "row",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    },
    datetimeContainer: {
        justifyContent: "center",
        alignContent: "center",
    },
    modalContainer: {
        backgroundColor: "white",
    }

})

export default EventCard;