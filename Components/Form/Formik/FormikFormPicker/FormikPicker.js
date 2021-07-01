import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  FlatList,
  Text,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FormikPickerItem from "./FormikPickerItem";
import colors from "../../../../assets/colors";

function FormikPicker({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = FormikPickerItem,
  placeholder,
  selectedItem,
  width = "100%",
  keyExtractor = ((item) => item.value.toString()),
  labelProperty = "label",
  disabled = false
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback disabled = {disabled} onPress={() => setModalVisible(true)}>
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
            <Text style={styles.text}>{selectedItem[labelProperty]}</Text>
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
      {modalVisible && 
      <Modal 
        isVisible={modalVisible}
        style = {styles.modal}
      >
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          numColumns={numberOfColumns}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              label={item[labelProperty]}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>}
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
  modal: {
    backgroundColor: "white",
  }
});

export default FormikPicker;
