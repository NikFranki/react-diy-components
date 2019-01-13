import * as React from "react";
import { hoc } from 'hoc';
import { Link } from 'react-router-dom';
const Codey: React.StatelessComponent<{}> = () => (
    <div className="codey">
        <Link to={`/step1`}>step1</Link>
    </div>
);

export default hoc({ tutorialTitle: 'lesson3' })(Codey);