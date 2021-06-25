import React, { useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";
import ErrorText from "../Form/ErrorText";
import Input from "../Form/Input";
import colors from "../../assets/colors";

const AddNewFieldModal = ({ onSubmit, isVisible, setVisibility }) => {
  const [item, setItem] = useState({ fieldName: "", value: "" });
  const [fieldNameTouched, setFieldNameTouched] = useState(false);
  const [fieldValueTouched, setFieldValueTouched] = useState(false);
  const fieldNameError = () => {
    return fieldNameTouched && item.fieldName == "";
  };

  const fieldValueError = () => {
    return fieldValueTouched && item.value == "";
  };

  const validItem = () => {
    return item.fieldName != "" && item.value != "";
  };
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setVisibility(false)}
      onBackButtonPress={() => setVisibility(false)}
    >
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.newFieldTitle}>Add New Field</Text>
          <Input
            style={styles.input}
            placeholder="Field Name"
            value={item.fieldName}
            onBlur={() => setFieldNameTouched(true)}
            onFocus={() => setFieldNameTouched(false)}
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
            onPress={() => setVisibility(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (validItem()) onSubmit(item);
              else {
                setFieldNameTouched(true);
                setFieldValueTouched(true);
              }
            }}
          >
            <Text style={styles.buttonText}>Add</Text>
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
    marginBottom: 15,
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

export default AddNewFieldModal;
