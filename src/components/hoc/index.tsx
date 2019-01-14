import * as React from 'react';
import { InjectHocProps } from 'model';
import { Icon } from 'antd';
import History, { goBack } from 'util/history';

import EventEmitter from 'util/events';
import '../app.less'

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

            setDrawer = (visible: boolean) => {
                this.setState({
                    visible,
                });
            }

            componentDidMount() {
                EventEmitter.on('showDrawer', this.setDrawer);
            }

            componentWillUnmount() {
                EventEmitter.removeListener('showDrawer', this.setDrawer);
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
                console.log(props);
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
                                <header>
                                    <div onClick={this.back}>
                                        <label>
                                            {History.location.pathname !== '/' && <Icon type="left" />}
                                        </label>
                                        <span className="title">
                                            {props && props.tutorialTitle}
                                        </span>
                                    </div>
                                    {' '}
                                    <div  onClick={this.onClose}>close</div>
                                </header>
                                <WrapperComponent {...props} />
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}