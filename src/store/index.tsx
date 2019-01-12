import React from "react";
import { Provider } from "react-redux";
import store from 'reducers/store';
import AppRouter from 'router';
import 'antd/dist/antd.less';

const TutorialApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};

export default TutorialApp;