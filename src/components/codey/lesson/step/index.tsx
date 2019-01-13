import * as React from "react";
import { hoc } from 'hoc';
import { Button } from 'antd';
const Codey: React.StatelessComponent<{}> = () => (
    <div className="codey">
        <div>
            <p>1 2 3 4 5 6</p>
            <p><label>Label</label></p>
            <p>
                <img style={{width: '200px'}} src={require('lib/imgs/ramos.jpg')} alt="img"/>
            </p>
            <p>operation explain</p>
            <Button type="primary">nexts</Button>
        </div>
    </div>
);

export default hoc({ tutorialTitle: 'step1' })(Codey);