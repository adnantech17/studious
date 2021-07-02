import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import MenuButton from "../Buttons/MenuButton";
import {
  removeMaterial,
  toggleMaterialMenu,
} from "../../Redux/material/material.action";
import { firebaseMaterialDelete } from "../../Utils/FirebaseUtils";

const MaterialMenu = ({
  menuBox,
  toggleMenuBox,
  selectedMaterial,
  removeMaterial,
  navigation,
}) => {
  console.log(selectedMaterial);

  const handleDelete = () => {
    removeMaterial(selectedMaterial.course_id, selectedMaterial.material);
    firebaseMaterialDelete(
      selectedMaterial.course_id,
      selectedMaterial.material
    );
    toggleMenuBox();
  };
  return (
    <Modal
      onBackdropPress={toggleMenuBox}
      onBackButtonPress={toggleMenuBox}
      isVisible={menuBox}
      style={styles.modal}
    >
      <View style={styles.container}>
        <MenuButton
          title="View"
          name="pencil"
          onPress={() => {
            toggleMenuBox();
            navigation.navigate("ViewMaterial");
          }}
        />
        <MenuButton
          title="Edit"
          name="pencil"
          onPress={() => {
            toggleMenuBox();
            navigation.navigate("NewMaterial");
          }}
        />
        <MenuButton title="Remove" name="trash-bin" onPress={handleDelete} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 10,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  buttons: {
    flexDirection: "row",
    marginHorizontal: 16,
    paddingVertical: 8,
  },

  icon: {
    marginRight: 8,
  },
});

const mapStateToProps = (state) => ({
  menuBox: state.courses.materialMenuBox,
  selectedMaterial: state.courses.selectedMaterial,
});

const mapDispatchToProps = (dispatch) => ({
  toggleMenuBox: () => dispatch(toggleMaterialMenu()),
  removeMaterial: (course_id, material) =>
    dispatch(removeMaterial(course_id, material)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialMenu);
