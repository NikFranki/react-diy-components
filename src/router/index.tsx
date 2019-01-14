import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";

import AppContainer from 'components/app';
import Codey from 'components/codey';
import Arduino from 'components/arduino';
import Mbot from 'components/mbot';
import Lesson from 'components/codey/lesson';
import History from 'util/history';
import TutorialApi from 'api';

const AppRouter: React.StatelessComponent<{}> = () => (
    <Router history={History}>
        <div>
            <div onClick={TutorialApi.startTutorial}>haha</div>
            <Switch>
                <Route path="/" exact component={AppContainer} />
                <Route path="/codey" component={Codey} />
                <Route path="/arduino" component={Arduino} />
                <Route path="/mbot" component={Mbot} />
                <Route path={`/lesson3`} component={Lesson} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;