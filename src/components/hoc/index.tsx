import * as React from 'react';
import { InjectHocProps } from 'model';
import { Drawer, Icon } from 'antd';
import store from 'reducers/store';
import History, { goBack } from 'util/history';

import EventEmitter from 'util/events';

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

            componentDidMount() {
                EventEmitter.on('showDrawer', (visible: boolean) => {
                    this.setState({
                        visible,
                    });
                });
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
                console.log(store.getState());
                console.log(History);
                return (
                    <div>
                        <Drawer
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
                            placement={`left`}
                            closable={false}
                            onClose={this.onClose}
                            visible={this.state.visible}
                        >
                            <WrapperComponent {...props} />
                        </Drawer> 
                    </div>
                )
            }
        }
    }
}