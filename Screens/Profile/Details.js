import React, { useEffect, useState } from "react";
import nextId from "react-id-generator";
import {
  View,
  FlatList,
  ToastAndroid,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { connect } from "react-redux";
import AddNewFieldModal from "../../Components/Profile/AddNewFieldModal";
import FieldItem from "../../Components/Profile/FieldItem";
import { addField } from "../../Redux/profile/profile.action";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { Feather } from "@expo/vector-icons";

const renderField = ({ item }) => {
  const onCopyPress = () => {
    ToastAndroid.show("Copied!", ToastAndroid.SHORT);
  };
  return <FieldItem item={item} onButtonPress={onCopyPress} />;
};

const Details = ({ navigation, fieldData, addField, profileImageUri }) => {
  const [addNewModalShown, setAddNewModalShown] = useState(false);
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  const onAddNewField = (item) => {
    const field = {
      id: nextId(),
      required: false,
      ...item,
    };
    addField(field);
    setAddNewModalShown(false);
  };
  return (
    <>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/pics/bg.png")}
      >
        <FlatList
          data={fieldData}
          keyExtractor={(item) => item.id}
          renderItem={renderField}
          ListHeaderComponent={
            <View style={styles.dataContainer}>
              <View
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 20,
                  overflow: "hidden",
                  borderWidth: 0.5,
                  border: colors.lightgray,
                }}
                onPress={() => toggleProfileSettings()}
              >
                <Image
                  srouce={require("../../assets/pics/dp.png")}
                  style={styles.image}
                />
                <Image source={{ uri: profileImageUri }} style={styles.image} />
              </View>
              <View style={styles.imageButtons}>
                <TouchableOpacity style={styles.imageSettings}>
                  <Feather name="edit" size={18} color="black" />
                  <Text style={styles.imageButtonsText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => Sharing.shareAsync(profileImageUri)}
                  style={styles.imageSettings}
                >
                  <AntDesign name="sharealt" size={18} color="black" />
                  <Text style={styles.imageButtonsText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    MediaLibrary.saveToLibraryAsync(profileImageUri)
                  }
                  style={styles.imageSettings}
                >
                  <MaterialIcons name="save-alt" size={18} color="black" />
                  <Text style={styles.imageButtonsText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setAddNewModalShown(true);
            }}
          >
            <Feather name="plus" size={24} color="#393A3C" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {addNewModalShown && (
        <AddNewFieldModal
          onSubmit={onAddNewField}
          isVisible={addNewModalShown}
          setVisibility={setAddNewModalShown}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  dataContainer: {
    alignItems: "center",
    borderRadius: 1000,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 350,
    display: "flex",
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  imageButtons: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  imageSettings: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
    marginRight: 16,
  },
  imageButtonsText: {
    marginLeft: 5,
    fontSize: 12,
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "105%",
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  button: {
    borderColor: colors.lightgray,
    borderRadius: 100,
    width: 60,
    height: 60,
    backgroundColor: colors.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    marginLeft: 7,
    fontSize: 16,
    color: "black",
  },
});
const mapStateToProps = (state) => ({
  fieldData: state.profile.fieldData,
  profileImageUri: state.profile.profileImageUri,
});
const mapDispatchToProps = (dispatch) => ({
  addField: (field) => dispatch(addField(field)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
