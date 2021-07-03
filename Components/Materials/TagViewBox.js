import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import colors from "../../assets/colors";

const TagViewBox = ({ tags }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tags}
        renderItem={({ item }) => (
          <View style={styles.tagContainer}>
            <Text>{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tagContainer: {
    backgroundColor: colors.backgroundColor,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
  },
});

export default TagViewBox;
