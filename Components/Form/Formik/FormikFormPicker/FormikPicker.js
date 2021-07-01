import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FormikPickerItem from "./FormikPickerItem";
import colors from "../../../../assets/colors";
import { Entypo } from "@expo/vector-icons";

function FormikPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = FormikPickerItem,
  placeholder,
  selectedItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.darkgray}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.darkgray}
          />
        </View>
      </TouchableWithoutFeedback>
      {modalVisible && (
        <Modal visible={modalVisible} style={styles.modalContainer}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text>Close </Text>
            <Entypo name="cross" size={20} color={colors.lightgray} />
          </TouchableOpacity>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginTop: 10,
    marginBottom: 20,
    width: "80%",
    borderWidth: 1.0,
    paddingHorizontal: 25,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: "white",
    width: 300,
    elevation: 5,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
    marginBottom: 90,
    marginTop: 420,
    overflow: "hidden",
  },
  closeButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    alignSelf: "flex-end",
  },
});

export default FormikPicker;
