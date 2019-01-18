import * as React from 'react';
import TutorialAction from 'reducers/tutorial/action';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';
import { ISery, Tutorial, StoreState, IRequestNoParam, IAction, ILangs } from 'model';
import { Link } from 'react-router-dom';
import { Icon, message } from 'antd';
import { hoc } from 'components/hoc';
import History from 'util/history';

import '../app.less';
interface ISeryProps {
    category: Tutorial,
    langs: ILangs,
    save: IAction<{}>,
    sery_list: IRequestNoParam<Dispatch>,
}

class Sery extends React.Component<ISeryProps, any> {

    constructor(props: ISeryProps) {
        super(props);
    }

    componentDidMount() {
        const { langs, sery_list } = this.props;
        sery_list(() => {}, (err: any) => {
            if (err.code === 99999) {
                message.error(langs["MSG.99999"]);
                return;
            }
        });
    }

    render() {
        const { serylist } = this.props.category;
        return <div className="appContainer">
            <nav>
                <ul className="series-wrapper">
                    {
                        serylist.map((sery: ISery, index: number) => (
                            <li className={index === 0 && History.location.pathname !== '/' ? 'isPointUp' : ''} key={index}>
                                <Link onClick={() => this.props.save({ 
                                    cursery: sery.categoryName,
                                    curseryId: sery.id,
                                })} to={`lesson`}>
                                    <span>{sery.categoryName}</span>
                                    <Icon type="right" />
                                </Link>
                                <div className="sign"></div>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>
    }
}

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    save: bindActionCreators(TutorialAction.save, dispatch),
    sery_list: bindActionCreators(TutorialAction.sery_list, dispatch),
});

export default hoc({tutorialTitle: 'Tutorials'})(connect(mapStateToProps, mapDispatchToProps)(Sery));