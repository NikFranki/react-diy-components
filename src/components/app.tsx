import * as React from 'react';
import TutorialAction from 'reducers/tutorial/action';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';
import { MemberEntity, ISery, Tutorial, StoreState, IRequestNoParam, IAction, InjectHocProps } from 'model';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { Icon } from 'antd';
// import { memberAPI } from 'api/member';
import { hoc } from 'components/hoc';


import './app.less';
interface IAppContainerProps extends RouteComponentProps<any>, InjectHocProps {
    name: string,
    category: Tutorial,
    save: IAction<{}>,
    sery_list: IRequestNoParam<Dispatch>,
    fetchMembersAction: IRequestNoParam<Dispatch>,
    fetchSeriesAction: IRequestNoParam<Dispatch>,
}

interface IIAppContainerState {
    members: MemberEntity[],
}

class AppContainer extends React.Component<IAppContainerProps, IIAppContainerState> {

    static defaultProps = {
        name: 'world'
    }

    state = {
        age: 24,
        members: [],
    }

    constructor(props: IAppContainerProps) {
        super(props);
        console.log(this.state.age);
        console.log(process.env.NODE_ENV);
    }

    public componentDidMount() {
        // memberAPI.fetchMembersAsync()
        //     .then((members) => {
        //         this.setState({ members });
        //     });
        // this.props.fetchMembersAction();
        this.props.fetchSeriesAction();
        this.props.sery_list();
    }

    public render() {
        console.log(this.props.category.serylist);
        const { serylist } = this.props.category;
        return <div className="appContainer">
            <nav>
                <ul className="series-wrapper">
                    {
                        serylist.map((sery: ISery, index: number) => (
                            <li key={index}>
                                <Link onClick={() => this.props.save({ cursery: sery.categoryName, curtitle: sery.categoryName })} to={`${sery.categoryName}`}>
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
    fetchMembersAction: bindActionCreators(TutorialAction.fetchMembersAction, dispatch),
    fetchSeriesAction: bindActionCreators(TutorialAction.fetchSeriesAction, dispatch)
})

export default hoc({tutorialTitle: 'Tutorials'})(withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer)));