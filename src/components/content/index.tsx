import * as React from "react";
import { hoc } from 'components/hoc';
// import { Tutorial, StoreState, Step, StepContent, IAction, Sery, Lesson } from "model";
import { Tutorial, StoreState, Step, IAction, IContentData, IRequest, IContent } from "model";
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TutorialAction from 'reducers/tutorial/action';
import { Button, Modal } from 'antd';

interface IContentsProps  {
    category: Tutorial,
    save: IAction<{}>,
    content_list: IRequest<IContentData, Dispatch> 
}

interface IContentsState {
    curindex: number,
    visible: boolean,
    curselectItem: IContent
}

class Contents extends React.Component<IContentsProps, IContentsState> {

    state = {
        curindex: 0,
        visible: false,
        curselectItem: {content: '', type: ''}
    };

    constructor(props: IContentsProps) {
        super(props);
    }

    componentDidMount() {
        this.props.content_list({coverId: this.props.category.curlessonId}, (res: any) => {
            console.log(res);
        });
    }

    select = (item: Step, index: number) => {
        this.props.save({ curstep: item.stepName });
        this.setState({
            curindex: index
        });
    }

    handlePrevBtn = () => {
        this.setState({
            curindex: this.state.curindex - 1
        });
    }

    handleNextBtn = () => {
        const { contentlist } = this.props.category;
        if (this.state.curindex === (contentlist.length - 1)) {
            console.log('no more');
            return;
        }
        this.setState({
            curindex: this.state.curindex + 1
        });
    }

    showModal = (item: IContent) => {
        this.setState({
          visible: true,
          curselectItem: item
        });
      }
    
      hideModal = () => {
        this.setState({
          visible: false,
        });
      }

    render() {
        const { curindex, curselectItem } = this.state;
        const { contentlist } = this.props.category;
        console.log(contentlist);
        const isStart = curindex === 0;
        const isFinished = curindex === (contentlist.length-1);
        return (
            <div className="content">
                    {
                        contentlist.length > 0 && 
                        <header>
                            <span className="process">{curindex+1}/{contentlist.length}</span>
                            <span className="title">{contentlist[curindex]['contentTitle']}</span>
                        </header>
                    }
                    <main className="content-wrapper">
                        {
                            contentlist.length > 0 && contentlist[curindex]['contents'].map((item, index) => {
                               return (
                                       <div key={index}>
                                            {
                                               item.type ==='video'
                                               ?
                                               <p>video</p>
                                               :
                                               item.type ==='image'
                                               ?
                                               <img src={item.content} alt="" onClick={this.showModal.bind(this, item)} />
                                               :
                                               <p>{item.content}</p>
                                            }
                                       </div>
                               )
                           })
                        }
                    </main>
                    <footer className={curindex === 0 ? 'start' : ''}>
                        {!isStart && <Button className="prev" type="primary" htmlType= "submit" onClick={this.handlePrevBtn}>上一步</Button>}
                        <Button className="next" type="primary" htmlType= "submit" onClick={this.handleNextBtn}>{isFinished ? '完成' : '下一步'}</Button>
                    </footer>
                    <Modal
                        className="lala"
                        align="center"
                        title="Modal"
                        visible={this.state.visible}
                        onOk={this.hideModal}
                        onCancel={this.hideModal}
                        >
                        {
                            curselectItem.type === 'image' ? 
                                <img src={curselectItem.content} alt="" />
                            :
                            <video>sfd</video>
                        }
                        
                    </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({ category }: StoreState) => ({
    category
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    save: bindActionCreators(TutorialAction.save, dispatch),
    content_list: bindActionCreators(TutorialAction.content_list, dispatch),
})

export default hoc({ tutorialTitle: 'lesson' })(connect(mapStateToProps, mapDispatchToProps)(Contents));