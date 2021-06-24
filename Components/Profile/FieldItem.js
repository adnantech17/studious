import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Clipboard,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const FieldItem = ({ item, onButtonPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldTitle}>
        <Text style={styles.fieldName}> {item.fieldName} </Text>
        <TouchableOpacity style={styles.button}>
          <Feather name="edit" size={16} color="#393A3C" />
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContent}>
        <Text style={styles.value}> {item.value} </Text>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="delete-outline" size={20} color="#393A3C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  fieldTitle: {
    flex: 1,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
  },
  fieldName: {
    flex: 1,
    color: "#72AFFF",
    marginBottom: 7,
    fontWeight: "bold",
  },
  fieldContent: {
    display: "flex",
    flexDirection: "row",
  },
  value: {
    flex: 1,
  },
  copyButton: {
    width: 50,
  },
  button: {
    marginRight: 5,
  },
});

export default FieldItem;
