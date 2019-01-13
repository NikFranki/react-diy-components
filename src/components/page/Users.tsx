import * as React from "react";
import { hoc } from 'hoc';
// import './index.less';
const Users: React.StatelessComponent<{}> = () => (
    <div className="users">
        <h2>Users</h2>
    </div>
);

export default hoc({ tutorialTitle: 'Tutorials' })(Users);