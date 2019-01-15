import * as React from "react";
import { hoc } from 'components/hoc';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
// import './index.less';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Category, StoreState, IAction } from "model";
import _ from "lodash";
import CategoryAction from 'reducers/category/action';

interface ICodeyProps {
    category: Category,
    save: IAction<{}>
}
const Codey: React.StatelessComponent<ICodeyProps> = (props: ICodeyProps) => (
    <div className="codey">
        <ul>
            {
                !_.isEmpty(props.category.cursery) &&
                props.category.series.filter(item => item.tutorialName === props.category.cursery)[0]
                    .lessons.map((value, index) => <li key={index}>
                        <Link onClick={() => props.save({ curlesson: value.lessonName, curtitle: value.lessonName })} to={`${value.lessonName}`}>
                        <span>{value.lessonName}</span>
                        <Icon type="right" />
                    </Link>
                </li>)
            }
        </ul>
    </div>
);

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch ) => ({
    save: bindActionCreators(CategoryAction.save, dispatch)
});

export default hoc({ tutorialTitle: 'codey' })(connect(mapStateToProps, mapDispatchToProps)(Codey));