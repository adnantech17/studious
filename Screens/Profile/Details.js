import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import FieldItem from "../../Components/Profile/FieldItem";
import {
  addField,
  deleteField,
  editField,
  setProfileData,
} from "../../Redux/profile/profile.action";
import FieldInputModal from "../../Components/Profile/FieldInputModal";
import TwoButtonModal from "../../Components/reusable/TwoButtonModal";
import {
  firebaseAddField,
  firebaseEditField,
  firebaseRemoveField,
  firebaseSyncWithProfile,
} from "../../Utils/Profile/firebase.utils";
import AddButton from "../../Components/reusable/AddButton";
import TitleWithBackButton from "../../Components/reusable/TitleWithBackButton";

const Details = ({
  fieldData,
  addField,
  editField,
  deleteField,
  setProfileData,
  navigation,
}) => {
  const list = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const [fieldInputModalShown, setFieldInputModalShown] = useState(false);
  const [fieldDeleteModalShown, setFieldDeleteModalShown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!fieldInputModalShown && !fieldDeleteModalShown) setSelectedItem(null);
  }, [fieldInputModalShown, fieldDeleteModalShown]);

  const onRefresh = () => {
    firebaseSyncWithProfile(setProfileData, setRefreshing);
  };

  const addNewField = (item) => {
    const field = {
      id: new Date().toString(),
      required: false,
      ...item,
    };
    addField(field);
    firebaseAddField(field);
    list.current?.scrollToEnd();
  };

  const editFieldAndUpload = (item) => {
    editField(item);
    firebaseEditField(item);
  };

  const onModalSubmit = (item) => {
    !selectedItem ? addNewField(item) : editFieldAndUpload(item);
  };

  const renderField = ({ item }) => {
    const onEditPress = () => {
      setSelectedItem(item);
      setFieldInputModalShown(true);
    };
    const onDeletePress = () => {
      setFieldDeleteModalShown(true);
      setSelectedItem(item);
    };
    return (
      <FieldItem
        item={item}
        onEditPress={onEditPress}
        onDeletePress={onDeletePress}
      />
    );
  };

  return (
    <>
      <ImageBackground
        style={styles.backgroundView}
        source={require("../../assets/pics/bg.png")}
      />
      <View style={styles.container}>
        <View style = {styles.childContainer}>
        <TitleWithBackButton title = "Details" onPress = {() => navigation.goBack()} />
        <FlatList
          ref={list}
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={fieldData}
          keyExtractor={(item) => item.id}
          renderItem={renderField}
          ListFooterComponent={<View style={{ height: 110 }} />}
        />
        {!fieldInputModalShown &&
          !fieldDeleteModalShown && (
            <AddButton
                onPress = {() => {
                  setFieldInputModalShown(true);
                }}
            />
          )}
      </View>
      </View>
      {fieldInputModalShown && (
        <FieldInputModal
          selectedItem={selectedItem}
          onSubmit={onModalSubmit}
          isVisible={fieldInputModalShown}
          setVisibility={setFieldInputModalShown}
        />
      )}
      {fieldDeleteModalShown && (
        <TwoButtonModal
          title="Delete"
          body="Are you sure that you want to delete this field?"
          isVisible={fieldDeleteModalShown}
          setVisibility={setFieldDeleteModalShown}
          rightButtonTitle="Delete"
          rightButtonPressed={() => {
            deleteField(selectedItem);
            firebaseRemoveField(selectedItem);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    position: "absolute",
    top: 0,
    left: 0,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    zIndex: 1,
  },
  container: {
    position: "relative",
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    paddingTop: 50,
  },
  childContainer: {
    position: "relative",
    flex: 1,
    width: "100%",
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 350,
    display: "flex",
    position: "relative",
    paddingTop: 100,
  },
  buttonText: {
    marginLeft: 7,
    fontSize: 16,
    color: "black",
  },
  backButton: { zIndex: 11111, position: "absolute", top: 50, left: 25 },
});
const mapStateToProps = (state) => ({
  fieldData: state.profile.fieldData,
});
const mapDispatchToProps = (dispatch) => ({
  addField: (field) => dispatch(addField(field)),
  editField: (field) => dispatch(editField(field)),
  deleteField: (field) => dispatch(deleteField(field)),
  setProfileData: (profileData) => dispatch(setProfileData(profileData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Details);
