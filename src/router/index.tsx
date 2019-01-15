import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import AppContainer from 'components/app';
import Codey from 'components/codey';
import Lesson from 'components/codey/lesson';
import History from 'util/history';
import TutorialApi from 'api';

const AppRouter: React.StatelessComponent<{}> = () => (
    <Router history={History}>
        <div>
            <div onClick={TutorialApi.startTutorial}>haha</div>
            <Switch>
                <Route path="/" exact component={AppContainer} />
                <Route path="/测试" component={Codey} />
                <Route path="/测试1" component={Codey} />
                <Route path="/测试2" component={Codey} />
                <Route path={`/123`} component={Lesson} />
                <Route path={`/456`} component={Lesson} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;