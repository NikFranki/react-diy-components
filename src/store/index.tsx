import React from "react";
import { Provider } from "react-redux";
import store from 'reducers/store';
import AppRouter from 'router';

const TutorialApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

export default TutorialApp;