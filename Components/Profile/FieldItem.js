import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Clipboard,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";

const FieldItem = ({ item, onEditPress, onDeletePress }) => {
  const onValuePress = () => {
    Clipboard.setString(item.value);
    ToastAndroid.show("Copied!", ToastAndroid.SHORT);
  }
  return (
    <View style={styles.container}>
      <View style= {styles.dataContainer}>
        <View style={styles.fieldTitle}>
          <Text style={styles.fieldName}> {item.fieldName} </Text>
        </View>
        <View style={styles.fieldContent}>
          <Text style={styles.value} onPress = {onValuePress}> {item.value} </Text>
        </View>
      </View>
      {
      !item.required &&
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.button} onPress = {onEditPress}>
          <Feather name="edit" size={16} color="#393A3C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress = {onDeletePress}>
          <MaterialIcons name="delete-outline" size={20} color="#393A3C" />
        </TouchableOpacity> 
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0.5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row"
  },
  fieldTitle: {
    flex: 1,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  fieldName: {
    flex: 1,
    color: "#72AFFF",
    marginVertical: 3,
    fontWeight: "bold",
  },
  fieldContent: {
    display: "flex",
    flexDirection: "row",
  },
  value: {
    flex: 1,
    marginVertical: 3,
  },
  copyButton: {
    width: 50,
  },
  button: {
    marginHorizontal: 5,
    // flex: 1,
    marginVertical: 3,
    justifyContent: "center",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "red",
  },
  dataContainer: {
    display: "flex",
    flex: 1,
    // backgroundColor: "green",
  }

});

export default FieldItem;
