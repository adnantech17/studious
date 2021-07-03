import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as MediaLibrary from "expo-media-library";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { removeMaterial } from "../Redux/material/material.action";
import { firebaseMaterialDelete } from "../Utils/FirebaseUtils";
import { AntDesign } from "@expo/vector-icons";

import TagViewBox from "../Components/Materials/TagViewBox";
import colors from "../assets/colors";

const ViewMaterialScreen = ({
  selectedCourse,
  selectedMaterial,
  navigation,
  removeMaterial,
}) => {
  const mat = selectedMaterial.material;
  console.log("Material", mat);
  const [downloadProgress, setDownloadProgress] = useState("0%");
  const [tags, setTags] = useState(mat ? mat.tags : []);

  const handleDelete = () => {
    removeMaterial(selectedMaterial.course_id, selectedMaterial.material);
    firebaseMaterialDelete(
      selectedMaterial.course_id,
      selectedMaterial.material
    );
    navigation.goBack();
  };

  const requestPermission = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library.");
  };

  useEffect(() => {
    if (downloadProgress === "100%") {
      Alert.alert(
        "Download Complete",
        "",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
      setDownloadProgress("0%");
    }
  }, [downloadProgress]);

  async function getMediaLibraryPermissions() {
    await requestPermission();
  }

  const downloadProgressUpdater = ({
    totalBytesWritten,
    totalBytesExpectedToWrite,
  }) => {
    const pctg = 100 * (totalBytesWritten / totalBytesExpectedToWrite);
    setDownloadProgress(`${pctg.toFixed(0)}%`);
  };

  useEffect(() => {
    getMediaLibraryPermissions();
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../assets/pics/bg.png")}
    >
      <Text style={styles.backbutton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </Text>
      <Text style={{ fontSize: 30, marginBottom: 25, marginLeft: 10 }}>
        Details
      </Text>
      <Text style={styles.info}>
        <Text style={styles.infoName}>Title : </Text>
        <Text>{mat.title}</Text>
      </Text>
      {mat.description !== "" ? (
        <Text style={styles.info}>
          <Text style={styles.infoName}>Description : </Text>
          <Text>{mat.description}</Text>
        </Text>
      ) : null}
      <Text style={styles.info}>
        <Text style={styles.infoName}>Tags : </Text>
        <TagViewBox tags={tags} />
      </Text>
      <Text style={styles.info}>
        <Text style={styles.infoName}>Course : </Text>
        <Text>{selectedCourse.title}</Text>
      </Text>
      <Text style={styles.info}>
        <Text style={styles.infoName}>Attachment : </Text>
        <Text style={styles.attach}>
          <Text>{mat.attachment ? `${mat.attachment.name}  ` : "none"}</Text>
          {mat.attachment !== null && (
            <TouchableOpacity
              onPress={async () => {
                await WebBrowser.openBrowserAsync(mat.attachment.url);
              }}
            >
              <AntDesign name="folderopen" size={20} color="black" />
            </TouchableOpacity>
          )}
        </Text>
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleDelete} style={styles.button}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NewMaterial");
          }}
          style={styles.button}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  selectedCourse: state.courses.selectedCourse,
  selectedMaterial: state.courses.selectedMaterial,
});

const mapDispatchToProps = (dispatch) => ({
  removeMaterial: (course_id, material) =>
    dispatch(removeMaterial(course_id, material)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewMaterialScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  info: {
    paddingHorizontal: 20,
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
    margin: 7,
  },
  infoName: {
    fontWeight: "bold",
    color: "#6EB7FE",
    marginRight: 15,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    display: "flex",
    width: "47%",
    paddingVertical: 13,
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
    borderRadius: 50,
  },
  backbutton: {
    position: "absolute",
    left: 30,
    top: 50,
  },
  attach: {
    display: "flex",
    width: 200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
