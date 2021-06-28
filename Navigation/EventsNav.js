import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import EventList from "../Screens/Event/EventList";
import AddNewEvent from "../Screens/Event/AddNewEvent";
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
        </EventsStack.Navigator>
    );
};

export default EventsNav;
