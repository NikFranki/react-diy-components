import * as React from "react";
import { hoc } from 'components/hoc';
// import { Button } from 'antd';

const Step: React.StatelessComponent<{}> = () => (
    <div className="lesson">
        <div>
            <nav>
                <ul className="lesson-nav">
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                </ul>
            </nav>
            <main className="content">
                <p>
                    <label>Label</label>
                </p>
                <p>
                    <img style={{width: '200px'}} src={'http://mblock-expanded.oss-cn-shenzhen.aliyuncs.com/933fd76379c74b918ec6ec04606fc81d.png'} alt="img"/>
                </p>
                <p>operation explain</p>
                {/* <Button type="primary">Next</Button> */}
            </main>
        </div>
    </div>
);

export default hoc({ tutorialTitle: 'lesson3' })(Step);