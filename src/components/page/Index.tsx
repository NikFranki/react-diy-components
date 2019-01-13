import * as React from "react";
import { hoc } from 'hoc';
// import './index.less';
const Index: React.StatelessComponent<{}> = () => (
    <div className="index">
        <h2>Index</h2>
    </div>
);

export default hoc({ tutorialTitle: 'Tutorials'})(Index);