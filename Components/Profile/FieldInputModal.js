import React, { useEffect, useRef, useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";
import ErrorText from "../Form/ErrorText";
import Input from "../Form/Input";
import colors from "../../assets/colors";

const inputs = () => {
  const fieldName = useRef();
  const value = useRef();
  return ({
    fieldName,
    value,
  });
}
const FieldInputModal = ({ selectedItem, onSubmit, isVisible, setVisibility }) => {
  const [item, setItem] = useState(selectedItem ? selectedItem : { fieldName: "", value: "" });
  const [fieldNameTouched, setFieldNameTouched] = useState(false);
  const [fieldValueTouched, setFieldValueTouched] = useState(false);

  const inputFields = inputs();

  useEffect(() => {
    console.log(inputFields);
    setTimeout(() => inputFields.fieldName.current?.focus(), 100)
  }, [])

  const fieldNameError = () => {
    return fieldNameTouched && item.fieldName == "";
  };

  const fieldValueError = () => {
    return fieldValueTouched && item.value == "";
  };

  const validItem = () => {
    return item.fieldName != "" && item.value != "";
  };

  const cancel = () => {
    setVisibility(false);
  }

  const submitPress = () => {
    if(validItem()) {
      onSubmit(item);
      setVisibility(false);
    }
    else {
      setFieldNameTouched(true);
      setFieldValueTouched(true);
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={cancel}
      onBackButtonPress={cancel}
    >
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.newFieldTitle}>{selectedItem ? "Edit Field" : "Add New Field"}</Text>
          <Input
            ref = {inputFields.fieldName}
            style={styles.input}
            placeholder="Field Name"
            value={item.fieldName}
            onBlur={() => setFieldNameTouched(true)}
            onFocus={() => setFieldNameTouched(false)}
            onSubmitEditing = {() => inputFields.value.current?.focus()}
            onChangeText={(text) => {
              setItem({
                ...item,
                fieldName: text,
              });
            }}
          />
          <ErrorText style={styles.error} visible={fieldNameError()}>
            {" "}
            Required{" "}
          </ErrorText>
        </View>
        <View style={styles.field}>
          <Input
            ref = {inputFields.value}
            style={styles.input}
            placeholder="Value"
            value={item.value}
            onBlur={() => setFieldValueTouched(true)}
            onFocus={() => setFieldValueTouched(false)}
            onChangeText={(text) => {
              setItem({
                ...item,
                value: text,
              });
            }}
          />
          <ErrorText style={styles.error} visible={fieldValueError()}>
            {" "}
            Required{" "}
          </ErrorText>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={cancel}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={submitPress}
          >
            <Text style={styles.buttonText}> { selectedItem? "Edit" : "Add" } </Text>
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
  newFieldTitle: {
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 0.5,
    color: colors.lightgray,
    marginBottom: 5,
  },
  field: {
    marginBottom: 5,
    paddingHorizontal: 10,
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
  error: {
    color: "tomato",
  },
});

export default FieldInputModal;
