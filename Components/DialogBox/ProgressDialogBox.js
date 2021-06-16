import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

const ProgressDialogBox = (props) => (
  <Modal isVisible={props.visible} style={styles.modal}>
    <View style={styles.container}>
      <Text style={styles.percentage}>{Math.round(props.progress)}%</Text>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    paddingTop: 10,
    paddingBottom: 10,
    marginHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  progressBar: {
    marginVertical: 10,
    marginHorizontal: "auto",
    width: "60%",
  },
  percentage: {
    fontSize: 24,
  },
});

export default ProgressDialogBox;
