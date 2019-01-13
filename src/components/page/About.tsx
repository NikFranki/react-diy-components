import * as React from "react";
import { hoc } from 'hoc';
import './About.less';
// import './index.less';
const About: React.StatelessComponent<{}> = () => (
    <div className="about">
        <h2>About</h2>
    </div>
);

export default hoc({ tutorialTitle: 'Tutorials'})(About);