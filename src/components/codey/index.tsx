import * as React from "react";
import { hoc } from 'components/hoc';
import { Link } from 'react-router-dom';
// import { Icon } from 'antd';
// import './index.less';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Tutorial, StoreState, IAction } from "model";
import _ from "lodash";
import TutorialAction from 'reducers/tutorial/action';

interface ISeryProps {
    category: Tutorial,
    save: IAction<{}>
}
const Sery: React.StatelessComponent<ISeryProps> = (props: ISeryProps) => (
    <div className="series">
        <ul>
            {/* {
                !_.isEmpty(props.category.cursery) &&
                props.category.series.filter(item => item.tutorialName === props.category.cursery)[0]
                    .lessons.map((value, index) => <li key={index}>
                        <Link onClick={() => props.save({ curlesson: value.lessonName, curtitle: value.lessonName })} to={`${value.lessonName}`}>
                        <span>{value.lessonName}</span>
                        <Icon type="right" />
                    </Link>
                </li>)
            } */}
            <li>
                <Link onClick={() => props.save({ curlesson: '123', curtitle: '123' })} to={`123`}>123</Link>
                <div className="sign"></div>
            </li>
            <li>
                <Link onClick={() => props.save({ curlesson: '456', curtitle: '456' })} to={`456`}>456</Link>
                <div className="sign"></div>
            </li>
        </ul>
    </div>
);

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch ) => ({
    save: bindActionCreators(TutorialAction.save, dispatch)
});

export default hoc({ tutorialTitle: 'Sery' })(connect(mapStateToProps, mapDispatchToProps)(Sery));