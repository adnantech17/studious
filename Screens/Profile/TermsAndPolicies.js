import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from 'expo-constants';

const TermsAndPolicies = ({}) => {
    return (
        <View style={styles.container}>
            <Text>
                {"Disclaimer"}
            </Text>
            <Text>
                {"This app is created as an academic project. We do not guarantee any protection from any kind of loss or leakage of data. Please do not upload any sensitive information or documents in this app."}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    }
})

export default TermsAndPolicies;