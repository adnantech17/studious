import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../assets/colors";

const TagViewBox = ({tags}) => {
    return(
        <ScrollView>
            <View style = {styles.container}>
                {tags.map((tag) => (
                    <View style = {styles.tagContainer}>
                        <Text>{tag}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    tagContainer: {
        backgroundColor: colors.backgroundColor,
        marginHorizontal: 5,
        paddingHorizontal: 3,
        paddingVertical: 2,
    }
})

export default TagViewBox;