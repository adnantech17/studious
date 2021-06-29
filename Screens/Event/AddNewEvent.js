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
import { addEvent } from "../../Redux/event/event.action";

const AddNewEvent = ({
    navigation,
    addEvent
}) => {
    return (
    <>
    <ImageBackground
        style={styles.backgroundView}
        source={require("../../assets/pics/bg.png")}
    />
    <View style = {styles.container}>
            <Text style = {styles.title} >Add New Event</Text>
            <EventForm 
                handleCancel = {() => navigation.goBack() } 
                handleSubmit = {(event) => {
                    console.log(event); 
                    addEvent(event);
                    navigation.goBack(); 
                }}
            />
    </View>
    </>
    )
};

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
    addEvent: (newEvent) => dispatch(addEvent(newEvent)),
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
        justifyContent: "space-between",
        paddingTop: 150,
    },
    title: { fontSize: 25, marginLeft: 45, marginBottom: 40 },
});
    
export default connect(mapStateToProps, mapDispatchToProps)(AddNewEvent);