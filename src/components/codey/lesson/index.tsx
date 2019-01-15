import * as React from "react";
import { hoc } from 'components/hoc';
// import { Tutorial, StoreState, Step, StepContent, IAction, Sery, Lesson } from "model";
import { Tutorial, StoreState, Step, IAction } from "model";
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TutorialAction from 'reducers/tutorial/action';
// import { Button } from 'antd';
// import * as Button from 'antd/lib/button'

interface ILessonsProps  {
    category: Tutorial,
    save: IAction<{}>
}

interface ILessonsState {
    curindex: number,
}

class Lessons extends React.Component<ILessonsProps, ILessonsState> {

    state = {
        curindex: 0
    };

    // private steps: Step[];
    // private stepContents: StepContent[];

    constructor(props: ILessonsProps) {
        super(props);
        this.init();
    }

    init = () => {
        // const { cursery, curlesson, curstep } = this.props.category;
        // const { cursery, curlesson } = this.props.category;
        if (this.props.category.series.length > 0) {
            // this.steps = this.props.category.series.filter((item: Sery) => item.tutorialName === cursery)[0]['lessons']
            //     .filter((item: Lesson) => item.lessonName === curlesson)[0]['steps'];
            // this.stepContents = this.steps.filter((item: Step) => item.stepName === (curstep || 'step1'))[0]['content'];
        } else {
            // this.steps = [];
            // this.stepContents = [];
        }
    }

    select = (item: Step, index: number) => {
        // this.stepContents = this.steps.filter((value: Step) => value.stepName === item.stepName)[0]['content'];
        this.props.save({ curstep: item.stepName });
        this.setState({
            curindex: index
        });
    }

    render() {
        const { curindex } = this.state;
        return (
            <div className="lesson">
                <div>
                    <nav>
                        {/* <ul className="lesson-nav">
                            {
                                this.steps.length > 0 &&
                                this.steps.map((item: Step, index: number) => 
                                        <li className={`${curindex === index ? 'active' : ''}`} key={index} onClick={() => this.select(item, index)}>{index+1}</li>
                                )
                            }
                        </ul> */}
                        <ul className="lesson-nav">
                            {
                                [1,2,3,4,5].map((item: any, index: number) => 
                                        <li className={`${curindex === index ? 'active' : ''}`} key={index}>{index+1}</li>
                                )
                            }
                        </ul>
                    </nav>
                    <main className="content">
                        {/* {
                            this.stepContents.length > 0 &&
                            this.stepContents.map((content: StepContent, index: number) =>
                                    <div key={index}>
                                        <p>
                                            <label>{content.title}</label>
                                        </p>
                                        <p>
                                            <img style={{ width: '200px' }} src={content.media.url} alt="img" />
                                        </p>
                                        <p>{content.explain}</p>
                                    </div>
                                )
                        } */}
                        <div>123</div>
                        {/* <Button type="primary">next</Button> */}
                    </main>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    save: bindActionCreators(TutorialAction.save, dispatch)
})

export default hoc({ tutorialTitle: 'lesson' })(connect(mapStateToProps, mapDispatchToProps)(Lessons));