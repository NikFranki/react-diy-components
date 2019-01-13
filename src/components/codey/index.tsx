import * as React from "react";
import { hoc } from 'hoc';
import { Route, Link } from 'react-router-dom';
// import './index.less';
import store from 'reducers/store';
const Codey: React.StatelessComponent<{}> = () => (
    <div className="codey">
        {
            store.getState().category.series.length > 0 &&
            store.getState().category.series.filter(item => item.tutorialName === 'codey')[0]
                .lessons.map((value, index) => <Link to={`/codey/${value.lessonName}`} key={index}>{value.lessonName}</Link>)
        }
        {
            store.getState().category.series.length > 0 &&
            store.getState().category.series.filter(item => item.tutorialName === 'codey')[0]
                .lessons.map((value, index) => <Route key={index} path={`/codey/${value.lessonName}`} render={() => <div>{value.lessonName}</div>} />)
        }
        <Link to={`/lesson3`}>lesson3</Link>
    </div>
);

export default hoc({ tutorialTitle: 'codey' })(Codey);