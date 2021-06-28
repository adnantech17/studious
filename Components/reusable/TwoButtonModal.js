import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";

const TwoButtonModal = ({ 
    title, 
    body, 
    leftButtonTitle, 
    leftButtonPressed, 
    rightButtonTitle, 
    rightButtonPressed, 
    isVisible, 
    setVisibility 
}) => {

  const cancel = () => {
    setVisibility(false);
  }

  const onLeftButtonPress = () => {
      if(leftButtonPressed) leftButtonPressed();
      cancel();
  }

  const onRightButtonPress = () => {
      if(rightButtonPressed) rightButtonPressed(); 
      cancel();
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={cancel}
      onBackButtonPress={cancel}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style= {styles.body}>{body}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={onLeftButtonPress}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{ leftButtonTitle ? leftButtonTitle : "Cancel" } </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={onRightButtonPress}
          >
            <Text style={styles.buttonText}> { rightButtonTitle } </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    paddingTop: 30,
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body : {
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 10,
  }, 
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    marginTop: 15,
    height: 50,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonText: {
    alignSelf: "center",
  },
});

export default TwoButtonModal;
