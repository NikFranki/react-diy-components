import * as React from "react";
import { hoc } from 'components/hoc';
import { Route, Link } from 'react-router-dom';
import { Icon } from 'antd';
// import './index.less';
import store from 'reducers/store';
const Codey: React.StatelessComponent<{}> = () => (
    <div className="codey">
        <ul>
            {
                store.getState().category.series.length > 0 &&
                store.getState().category.series.filter(item => item.tutorialName === 'codey')[0]
                    .lessons.map((value, index) => <li key={index}>
                    <Link to={`/codey/${value.lessonName}`}>
                        <span>{value.lessonName}</span>
                        <Icon type="right" />
                    </Link>
                </li>)
            }
            <li>
                <Link to={`/lesson3`}>
                    <span>lesson3</span>
                    <Icon type="right" />
                </Link>
            </li>
            {
                store.getState().category.series.length > 0 &&
                store.getState().category.series.filter(item => item.tutorialName === 'codey')[0]
                    .lessons.map((value, index) => <Route key={index} path={`/codey/${value.lessonName}`} render={() => <div>{value.lessonName}</div>} />)
            }
        </ul>
    </div>
);

export default hoc({ tutorialTitle: 'codey' })(Codey);