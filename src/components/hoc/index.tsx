import * as React from 'react';
import { InjectHocProps } from 'model';
import { Icon } from 'antd';
import History, { goBack } from 'util/history';

// import EventEmitter from 'util/events';
import '../app.less';
import store from 'reducers/store';

export interface IState {
    visible: boolean;
}

// TODO wrapperComponent not defined props
export const hoc = (props?: InjectHocProps) => {
    return (WrapperComponent: React.ComponentType<any>) => {
        return class Hoc extends React.Component<any, IState> {

            state = {
                visible: true,
            }

            setDrawer = () => {
                this.setState({
                    visible: !this.state.visible,
                });
            }

            componentDidMount() {
                // EventEmitter.on('showDrawer', this.setDrawer);
            }

            componentWillUnmount() {
                // EventEmitter.removeListener('showDrawer', this.setDrawer);
            }

            onClose = () => {
                this.setState({
                    visible: false,
                });
            }

            back = () => {
                if (History.location.pathname === '/') {
                    return;
                }
                goBack();
            }

            public render() {
                const { cursery, curlesson } = store.getState().category;
                const isNeedBackBtn = History.location.pathname !== '/';

                const actions = new Map([
                    ['/', 'Get start'],
                    ['/lesson', cursery],
                    ['/content', curlesson]
                ]);
                const title = actions.get(History.location.pathname);
                return (
                    <div>
                        {/* <Drawer
                            title={
                                <div onClick={this.back}>
                                    <label>
                                        {History.location.pathname !== '/' && <Icon type="left" />}
                                    </label>
                                    <span>
                                        {props && props.tutorialTitle}
                                    </span>
                                </div> 
                            }
                            className="drawer-show"
                            placement={`left`}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <WrapperComponent {...props} />
                        </Drawer>  */}
                        <div className={`drawer-open ${this.state.visible ? 'active' : ''}`}>
                            <div className="mask"></div>
                            <div className="drawer-wrapper">
                                {isNeedBackBtn &&
                                    <header className='hasBackBtn'>
                                        <div onClick={this.back}>
                                            <label>
                                                <Icon type="left" />
                                            </label>
                                            <span className="title">
                                                {title}
                                            </span>
                                        </div>
                                    </header>
                                }
                                <WrapperComponent {...props} />
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}