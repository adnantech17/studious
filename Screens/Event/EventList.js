import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import EventCard from "../../Components/Event/EventCard";
import AddButton from "../../Components/reusable/AddButton";
import { deleteEvent } from "../../Redux/event/event.action";

// const events = [
//     {
//         id: "1",
//         title: "CSE",
//     },
//     {
//         id: "2",
//         title: "EEE",
//     },
//     {
//         id: "3",
//         title: "MATH"
//     },
// ]

const EventList = ({
    navigation,
    events,
    deleteEvent,
}) => {
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {

    }
    const goToEdit = (event) => {
        navigation.push("Edit Event",{item : event});
    }
    return (
    <>
    <ImageBackground
        style={styles.backgroundView}
        source={require("../../assets/pics/bg.png")}
    />
    <View style = {styles.container}>
        <View>
        <Text style={styles.title}>My Events</Text>
        <FlatList
            data={events}
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={({item}) => {
                return(
                <EventCard 
                    event = {item} 
                    onDelete = {deleteEvent}
                    onEdit = {goToEdit}
                />
                );
            }}
            keyExtractor={(item) => (item.id)}
            ListEmptyComponent={
            <>
                <View style={styles.emptyEvent}>
                    <Image
                    style={styles.empty}
                    source={require("../../assets/pics/empty.png")}
                    />
                    <Text style={styles.noEvent}>No Event</Text>
                </View>
            </>
            }
        />
        </View>
        <AddButton
            onPress = { () => navigation.push("Add New Event")}
        />
    </View>
    </>
    )
};

const mapStateToProps = (state) => ({
    events : state.events.eventData,
});
const mapDispatchToProps = (dispatch) => ({
    deleteEvent: (item) => dispatch(deleteEvent(item)),
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
    empty: {
        width: 200,
        height: 200,
    },
    emptyEvent: {
        width: "100%",
        height: 600,
        justifyContent: "center",
        alignItems: "center",
    },
    noEvent: {
        fontSize: 20,
    },
});
    
export default connect(mapStateToProps, mapDispatchToProps)(EventList);
    