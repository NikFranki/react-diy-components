import * as React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Sery from 'components/sery';
import Lesson from 'components/lesson';
import Content from 'components/content';
import History from 'util/history';

const AppRouter: React.StatelessComponent<{}> = () => (
    <Router history={History}>
        <div>
            <Switch>
                <Route path="/" exact component={Sery} />
                <Route path="/lesson" component={Lesson} />
                <Route path={`/content`} component={Content} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;