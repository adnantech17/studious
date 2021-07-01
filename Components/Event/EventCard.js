import React, { useState } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import colors from "../../assets/colors";
import { getDateText, getTimeText } from "../../Utils/date.utils";

const EventCard = ({ containerStyle, event, onEdit, onDelete }) => {
  const [showModal, setModalShown] = useState(false);
  const cancel = () => {
    setModalShown(false);
  };

  const onEditButtonPress = () => {
    cancel();
    onEdit(event);
  };

  const onDeleteButtonPress = () => {
    cancel();
    onDelete(event);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={() => setModalShown(true)}
      >
        <View style={styles.textContainer}>
          <Text>{event.title}</Text>
        </View>
        <View style={styles.datetimeContainer}>
          <Text style={styles.time}>{getDateText(event.date)}</Text>
          <Text style={styles.time}>{getTimeText(event.time)}</Text>
        </View>
      </TouchableOpacity>
      {showModal && (
        <Modal
          isVisible={showModal}
          onBackdropPress={cancel}
          onBackButtonPress={cancel}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Event Details</Text>
            <Text style={styles.eventInfo}>
              <Text style={styles.eventInfoTitle}>Title : </Text>
              <Text style={styles.eventInfoText}>{event.title}</Text>
            </Text>
            {event.description != "" && (
              <Text style={styles.eventInfo}>
                <Text style={styles.eventInfoTitle}>Description : </Text>
                <Text style={styles.eventInfoText}>{event.description}</Text>
              </Text>
            )}
            {event.venue != "" && (
              <Text style={styles.eventInfo}>
                <Text style={styles.eventInfoTitle}>Venue : </Text>
                <Text style={styles.eventInfoText}>{event.value}</Text>
              </Text>
            )}
            <Text style={styles.eventInfo}>
              <Text style={styles.eventInfoTitle}>Repeat : </Text>
              <Text style={styles.eventInfoText}>
                {event.repeatEvent.label}
              </Text>
            </Text>
            <Text style={styles.eventInfo}>
              <Text style={styles.eventInfoTitle}>Date : </Text>
              <Text style={styles.eventInfoText}>
                {getDateText(event.date)}
              </Text>
            </Text>
            <Text style={styles.eventInfo}>
              <Text style={styles.eventInfoTitle}>Time : </Text>
              <Text style={styles.eventInfoText}>
                {getTimeText(event.time)}
              </Text>
            </Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                onPress={onEditButtonPress}
              >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={onDeleteButtonPress}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 0.5,
    flexDirection: "row",
    borderRadius: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
    marginBottom: 10,
  },
  eventInfo: { marginVertical: 5 },
  eventInfoTitle: { color: "#72AFFF", fontWeight: "bold" },
  eventInfoText: {
    color: colors.lightgray,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  datetimeContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    fontSize: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingTop: 30,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 20,
    marginHorizontal: -20,
    borderTopWidth: 0.5,
  },
  button: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
});

export default EventCard;
