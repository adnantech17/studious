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
      {modalVisible && <Modal visible={modalVisible}>
        <Button title="Close" onPress={() => setModalVisible(false)} />
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
});

export default FormikPicker;
