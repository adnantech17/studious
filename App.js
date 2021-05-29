import React, { Component } from "react";
import store from "./Redux/store";

import { Provider } from "react-redux";
import Index from "./Index";

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
