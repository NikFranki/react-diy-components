import React from "react";
import { Provider } from "react-redux";
import store from 'reducers/store';
import AppRouter from 'router';
import 'antd/dist/antd.less';

const TutorialApp = () => {
    return (
        <div className="tutorial-app">
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </div>
    );
};

export default TutorialApp;