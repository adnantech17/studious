import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import EventList from "../Screens/EventList";
const EventsStack = createStackNavigator();

const EventsNav = () => {
    return (
        <EventsStack.Navigator>
            <EventsStack.Screen
                name="Events"
                component={EventList}
                options={{ title: "Event List" }}
            />
        </EventsStack.Navigator>
    );
};

export default EventsNav;
