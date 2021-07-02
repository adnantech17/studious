import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventsNav from "./EventsNav";
import TodosNav from "./TodosNav";
import MaterialsNav from "./MaterialsNav";
import ProfilesNav from "./ProfilesNav";
import colors from "../assets/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const SignedInNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          height: 68,
          backgroundColor: colors.backgroundColor,
          marginHorizontal: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Materials"
        component={MaterialsNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="notes"
                size={24}
                color={focused ? colors.active : "#073572"}
              />
              <Text
                style={{
                  fontSize: 8,
                  color: focused ? colors.active : "#073572",
                }}
              >
                Materials
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Todos"
        component={TodosNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <AntDesign
                name="checkcircleo"
                size={24}
                color={focused ? colors.active : "#073572"}
              />
              <Text
                style={{
                  fontSize: 8,
                  color: focused ? colors.active : "#073572",
                }}
              >
                Todos
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MaterialIcons
                name="event-available"
                size={24}
                color={focused ? colors.active : "#073572"}
              />
              <Text
                style={{
                  fontSize: 8,
                  color: focused ? colors.active : "#073572",
                }}
              >
                Events
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilesNav}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <FontAwesome
                name="user-o"
                size={24}
                color={focused ? colors.active : "#073572"}
              />
              <Text
                style={{
                  fontSize: 8,
                  color: focused ? colors.active : "#073572",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SignedInNav;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 8,
  },
});
