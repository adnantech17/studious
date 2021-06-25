import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from 'expo-constants';

const AboutUs = ({}) => {
    return (
        <View style={styles.container}>
            <Text>
                {"About Us"}
            </Text>
            <Text>
                { "This app is developed as an acamdeic project of the Undergraduate Program of the Department of Computer Science and Engineering, University of Dhaka." }
            </Text>
            <Text>
                { "Github Repository: https://github.com/adnantech17/studious/" }
            </Text>
            <Text>
                { "Developer Team:"}
            </Text>
            <Text> 
                { "Mohidul Haque Mridul" }
            </Text>
            <Text>
                { "Md Adnan Ali" }
            </Text>
            <Text>
                { "Sakib Chowdhury" }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
    }
})

export default AboutUs;