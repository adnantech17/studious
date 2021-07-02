import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../assets/colors";
import EventCard from "../../Components/Event/EventCard";
import {
  deleteEvent,
  setEventData,
  setSelectedEvent,
  updateDisplayEvent,
} from "../../Redux/event/event.action";
import { getDateTime } from "../../Utils/Event/event.utils";
import { firebaseRemoveEvent, firebaseSyncWithEvent } from "../../Utils/Event/firebase.utils";

const PastEventList = ({
  navigation,
  events,
  displayEvents,
  deleteEvent,
  updateEvent,
  setSelectedEvent,
  setEventData,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await firebaseSyncWithEvent(setEventData,setRefreshing);
    updateEvent();
    setRefreshing(false);
  };
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
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={22} color="black" />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.title}>My Past Events</Text>
            </View>
          </View>
          <View style={styles.alert}>
            <Text style={styles.alertmsg}>
              Past events automatically gets deleted after 7 days.
            </Text>
          </View>
          <FlatList
            data={displayEvents?.pastEvents.sort(
              (a, b) =>
                getDateTime(b.date, b.time) - getDateTime(a.date, a.time)
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
                  <Text style={styles.noEvent}>No Past Event</Text>
                </View>
              </>
            }
          />
        </View>
      </View>
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
  setSelectedEvent: (event) => dispatch(setSelectedEvent(event)),
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
    fontSize: 25,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    marginLeft: 40,
  },
  backButton: {
    top: 1,
    left: 25,
  },
  alert: {
    paddingHorizontal: 25,
    backgroundColor: colors.backgroundColor,
    paddingVertical: 8,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  alertmsg: { fontSize: 12 },
});

export default connect(mapStateToProps, mapDispatchToProps)(PastEventList);
