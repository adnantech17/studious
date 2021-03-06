import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import EventList from "../Screens/Event/EventList";
import AddNewEvent from "../Screens/Event/AddNewEvent";
import EditEvent from "../Screens/Event/EditEvent";
import PastEventList from "../Screens/Event/PastEventList";
const EventsStack = createStackNavigator();

const EventsNav = () => {
    return (
        <EventsStack.Navigator
            screenOptions= {{
                headerShown: false,
            }}
        >
            <EventsStack.Screen
                name="Events"
                component={EventList}
                options={{ title: "Event List" }}
            />
            <EventsStack.Screen
                name= "Add New Event"
                component = {AddNewEvent}
                options = {{ title: "Add New Event "}}
            />
            <EventsStack.Screen
                name = "Edit Event"
                component = {EditEvent}
                options = {{title: "Edit Event"}}
            />
            <EventsStack.Screen
                name = "Past Events"
                component = {PastEventList}
                options = {{title: "Past Event List"}}
            />
        </EventsStack.Navigator>
    );
};

export default EventsNav;
