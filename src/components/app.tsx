import * as React from 'react';
import CategoryAction from 'reducers/category/action';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';
import { MemberEntity, Sery, Category, StoreState, IRequestNoParam, IAction, InjectHocProps } from 'model';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { Icon } from 'antd';
// import { memberAPI } from 'api/member';
// import { MemberHeader } from './members/memberHeader';
// import { MemberRow } from './members/memberRow';
import { hoc } from 'components/hoc';


import './app.less';
interface IAppContainerProps extends RouteComponentProps<any>, InjectHocProps {
    name: string,
    category: Category,
    save: IAction<{}>,
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
        // memberAPI.fetchMembers()
        //     .then((members) => {
        //         this.setState({ members });
        //     });
        // memberAPI.fetchSeries()
        //     .then((res) => {
        //         console.log(res);
        //     });
        // memberAPI.fetchMembersAsync()
        //     .then((members) => {
        //         this.setState({ members });
        //     });
        this.props.fetchMembersAction();
        this.props.fetchSeriesAction();
    }

    public render() {
        console.log(this.props.category);
        return <div className="appContainer">
            <nav>
                <ul className="series-wrapper">
                    {
                        this.props.category.series.map((sery: Sery, index: any) => (
                            <li key={index}>
                                <Link onClick={() => this.props.save({ cursery: sery.tutorialName, curtitle: sery.tutorialName })} to={`${sery.tutorialName}`}>
                                    <span>{sery.tutorialName}</span>
                                    <Icon type="right" />
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            
            {/* <div className="row">
                <h2> Members Page</h2>
                <table className="table">
                    <thead>
                        <MemberHeader />
                    </thead>
                    <tbody>
                        {
                            this.state.members.map((member: any) =>
                                <MemberRow
                                    key={member.id}
                                    member={member}
                                />
                            )
                        }
                    </tbody>
                </table>
            </div> */}
        </div>
    }
}

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    save: bindActionCreators(CategoryAction.save, dispatch),
    fetchMembersAction: bindActionCreators(CategoryAction.fetchMembersAction, dispatch),
    fetchSeriesAction: bindActionCreators(CategoryAction.fetchSeriesAction, dispatch)
})

export default hoc({tutorialTitle: 'Tutorials'})(withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer)));