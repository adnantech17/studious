import React from "react"
import { Text, View, Button, StyleSheet, Clipboard} from "react-native"

const FieldItem = ({item, onButtonPress}) => {
    return(
        <View style = {styles.container}>
            <View style = {styles.fieldDetails}>
                <Text style = {styles.fieldName} > {item.fieldName} </Text>
                <Text style = {styles.value}> {item.value} </Text>
            </View>
            <Button 
                title = "Copy"
                style = {styles.copyButton}
                onPress = { () => {
                        Clipboard.setString(item.value);
                        onButtonPress();
                    }
                }
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:
        {
            flexDirection: "row",
        },
        fieldDetails:
        {
            flexDirection: "column",
            flex: 1
        },
        fieldName:
        {
            flex: 1,
            color: "dodgerblue",
            fontWeight: "bold"
        },
        value:
        {
            flex: 1,
            fontWeight: "bold"
        },
        copyButton: 
        {
            width: "100%"
        }
    }
)

export default FieldItem;