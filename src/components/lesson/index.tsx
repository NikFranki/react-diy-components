import _ from "lodash";
import * as React from "react";
import { hoc } from 'components/hoc';
import { Link } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Tutorial, StoreState, IAction, ILessonData, IRequest, ILesson } from "model";
import TutorialAction from 'reducers/tutorial/action';

interface ILessonProps {
    category: Tutorial,
    save: IAction<{}>,
    lesson_list: IRequest<ILessonData, Dispatch> 
}
class Lesson extends React.Component<ILessonProps, any> {

    constructor(props: ILessonProps) {
        super(props);
    }

    componentDidMount() {
    const { curseryId } = this.props.category;
        this.props.lesson_list({categoryId: curseryId}, (res: ILesson) => {
            console.log(res);
        });
    }

    render() {
        const { lessonlist } = this.props.category;
        return <div className="series">
            <ul>
                {
                    lessonlist.map((item, index) => (
                        <li key={index}>
                            <Link onClick={() => this.props.save({ 
                                curlesson: item.coverName,
                                curtitle: item.coverName,
                                curlessonId: item.id
                            })} to={`content`}>{item.coverName}</Link>
                            <div className="sign"></div>
                        </li>
                    ))
                }
            </ul>
        </div>;
    }
}

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch ) => ({
    save: bindActionCreators(TutorialAction.save, dispatch),
    lesson_list: bindActionCreators(TutorialAction.lesson_list, dispatch),
});

export default hoc({ tutorialTitle: 'Sery' })(connect(mapStateToProps, mapDispatchToProps)(Lesson));