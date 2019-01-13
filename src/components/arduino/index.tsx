import * as React from "react";
import { hoc } from 'hoc';
import store from 'reducers/store';
// import './index.less';
const Arduino: React.StatelessComponent<{}> = () => (
    <div className="arduino">
        {
            store.getState().category.series.length > 0 && 
            store.getState().category.series.filter(item => item.tutorialName === 'codey')[0]
            .lessons.map((value, index) => <div key={index}>{value.lessonName}</div>)
        }
    </div>
);

export default hoc({ tutorialTitle: 'arduino' })(Arduino);