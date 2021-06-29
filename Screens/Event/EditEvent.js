import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  View
} from "react-native";
import { connect } from "react-redux";
import EventForm from "../../Components/Event/EventForm";
import { editEvent } from "../../Redux/event/event.action";

const AddNewEvent = ({
    navigation,
    editEvent,
    route,
}) => {
    return (
    <>
    <ImageBackground
        style={styles.backgroundView}
        source={require("../../assets/pics/bg.png")}
    />
    <View style = {styles.container}>
        <View>
            <Text style = {styles.title} >Edit Event</Text>
            <EventForm 
                item = {route.params.item}
                cancelButtonLabel = "Cancel"
                handleCancel = {() => navigation.goBack() } 
                submitButtonLabel = "Edit"
                handleSubmit = {(event) => {
                    console.log(event); 
                    editEvent(event);
                    navigation.goBack(); 
                }}
            />
        </View>
    </View>
    </>
    )
};

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
    editEvent: (editedEvent) => dispatch(editEvent(editedEvent)),
});

const styles = StyleSheet.create({
    backgroundView: {
        position: "absolute",
        top: 0,
        left: 0,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 70,
    },
    title: { fontSize: 30, marginLeft: 30, marginBottom: 20 },
});
    
export default connect(mapStateToProps, mapDispatchToProps)(AddNewEvent);