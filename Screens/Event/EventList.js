import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  Button,
} from "react-native";
import { connect } from "react-redux";
import EventCard from "../../Components/Event/EventCard";
import AddButton from "../../Components/reusable/AddButton";
import {
  deleteEvent,
  updateDisplayEvent,
  setSelectedEvent,
  setEventData
} from "../../Redux/event/event.action";
import { getDateTime } from "../../Utils/Event/event.utils";
import { firebaseRemoveEvent, firebaseSyncWithEvent } from "../../Utils/Event/firebase.utils";

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
  displayEvents,
  deleteEvent,
  updateEvent,
  setSelectedEvent,
  setEventData,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    updateEvent();
    firebaseSyncWithEvent(setEventData,setRefreshing);
    setRefreshing(false);
  };
  useEffect(() => {
    firebaseSyncWithEvent(setEventData,setRefreshing);
  }, [])
  useEffect(() => {
    updateEvent();
  }, [events]);
  const goToEdit = (event) => {
    setSelectedEvent(event),
    navigation.push("Edit Event");
  };
  const handleDelete = (event) => {
      firebaseRemoveEvent(event);
      deleteEvent(event);
  }
  const renderItem = ({ item }) => {
    return <EventCard event={item} onDelete={handleDelete} onEdit={goToEdit} />;
  };
  return (
    <>
      <ImageBackground
        style={styles.backgroundView}
        source={require("../../assets/pics/bg.png")}
      />
      <View style={styles.container}>
        <View style={styles.childContainer}>
          <Text style={styles.title}>My Events</Text>
          <FlatList
            data={displayEvents?.futureEvents.sort(
              (a, b) =>
                getDateTime(a.date, a.time) - getDateTime(b.date, b.time)
            )}
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={renderItem}
            keyExtractor={(item) => item.displayId}
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
            ListHeaderComponent={
              <>
                {displayEvents?.pastEvents &&
                  displayEvents.pastEvents.length > 0 && (
                    <Button
                      title="Show Past Events"
                      onPress={() => navigation.push("Past Events")}
                    />
                  )}
              </>
            }
          />
        </View>
      </View>
      <AddButton onPress={() => navigation.push("Add New Event")} />
    </>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.eventData,
  displayEvents: state.events.displayEvents,
});
const mapDispatchToProps = (dispatch) => ({
  deleteEvent: (item) => dispatch(deleteEvent(item)),
  updateEvent: () => dispatch(updateDisplayEvent()),
  setSelectedEvent: (item) => dispatch(setSelectedEvent(item)),
  setEventData: (eventData) => dispatch(setEventData(eventData)),
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
    position: "relative",
    flex: 1,
    display: "flex",
    paddingTop: 70,
    alignItems: "center",
  },
  childContainer: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  title: {
    fontSize: 30,
    marginLeft: 30,
    marginBottom: 20,
  },
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
