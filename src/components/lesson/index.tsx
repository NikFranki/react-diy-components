import _ from "lodash";
import * as React from "react";
import { hoc } from 'components/hoc';
import { Link } from 'react-router-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Tutorial, StoreState, IAction, ILessonData, IRequest, ILangs } from "model";
import TutorialAction from 'reducers/tutorial/action';
import { message } from 'antd';

interface ILessonProps {
    category: Tutorial,
    langs: ILangs,
    save: IAction<{}>,
    lesson_list: IRequest<ILessonData, Dispatch> 
}
class Lesson extends React.Component<ILessonProps, any> {

    constructor(props: ILessonProps) {
        super(props);
    }

    componentDidMount() {
        const { langs, lesson_list, category } = this.props;
        const { curseryId } = category;
        lesson_list({categoryId: curseryId}, () => {}, (err: any) => {
            if (err.code === 99999) {
                message.error(langs["MSG.99999"]);
                return;
            }
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