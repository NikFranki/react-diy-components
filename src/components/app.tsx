import * as React from 'react';
// import AppRouter from 'router';
import CategoryAction from 'reducers/category/action';
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';
import { MemberEntity, Category, IActionNoParam, StoreState, IRequestNoParam } from 'model';
import { RouteComponentProps } from 'react-router-dom';
import { memberAPI } from '../api/member';
import { MemberHeader } from './members/memberHeader';
import { MemberRow } from './members/memberRow';

interface IAppContainerProps extends RouteComponentProps<any> {
    name: string;
    category: Category;
    add: IActionNoParam<Dispatch>;
    fetchMembersAction: IRequestNoParam<Dispatch>;
}

interface IIAppContainerState {
    age: number;
    members: MemberEntity[];
}

class AppContainer extends React.Component<IAppContainerProps, IIAppContainerState> {

    static defaultProps = {
        name: 'world'
    }

    state = {
        age: 24,
        members: []
    }

    constructor(props: IAppContainerProps) {
        super(props);
        console.log(this.state.age);
    }

    public componentDidMount() {
        // memberAPI.fetchMembers()
        //     .then((members) => {
        //         this.setState({ members });
        //     });
        memberAPI.fetchMembersAsync()
            .then((members) => {
                this.setState({ members });
            });
        this.props.fetchMembersAction();
    }

    change = (e: any) => {
        this.props.add();
    }

    public render() {
        console.log(this.props.category);
        return <div>
            <p onClick={this.change}>hello {this.props.name}!</p>
            {/* <AppRouter /> */}

            <div className="row">
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
            </div>
        </div>
    }
}

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    add: bindActionCreators(CategoryAction.add, dispatch),
    fetchMembersAction: bindActionCreators(CategoryAction.fetchMembersAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);