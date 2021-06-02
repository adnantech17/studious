import React, { Component } from "react";
import store from "./Redux/store";

import { Provider } from "react-redux";
import Index from "./Index";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

class App extends Component {
    unsubscribeFromAuth = null;

    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        );
    }
}

export default App;
