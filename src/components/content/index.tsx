import * as React from "react";
import { hoc } from 'components/hoc';
import { Tutorial, StoreState, IAction, IContentData, IRequest, IContent, ILangs } from "model";
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TutorialAction from 'reducers/tutorial/action';
import { Button, Modal, message } from 'antd';
import History from 'util/history';

interface IContentsProps  {
    category: Tutorial,
    langs: ILangs,
    save: IAction<{}>,
    content_list: IRequest<IContentData, Dispatch>,
}

interface IContentsState {
    curindex: number,
    visible: boolean,
    curselectItem: IContent,
    curModalType: string,
    isLastLesson: boolean
}

class Contents extends React.Component<IContentsProps, IContentsState> {

    state = {
        curindex: 0,
        visible: false,
        curselectItem: {content: '', type: ''},
        curModalType: 'media', //弹框类型 媒体资源、引导学习
        isLastLesson: false
    };

    constructor(props: IContentsProps) {
        super(props);
    }

    componentDidMount() {
        const { langs, content_list, category } = this.props;
        content_list({coverId: category.curlessonId}, () => {}, (err: any) => {
            if (err.code === 99999) {
                message.error(langs["MSG.99999"]);
                return;
            }
        });
    }

    handlePrevBtn = () => {
        this.setState({
            curindex: this.state.curindex - 1
        });
    }

    handleNextBtn = () => {
        const { curindex } = this.state;
        const { category } = this.props;
        const { contentlist, lessonlist, curlessonId } = category;
        if (curindex === (contentlist.length - 1)) {
            const lessonIds = lessonlist.map(item => {return item.id;});
            const lessonIndex = lessonIds.indexOf(curlessonId);
            if (lessonIndex === (lessonlist.length - 1)) {
                console.log('no more');
                this.setState({
                    curModalType: 'guidance',
                    isLastLesson: true
                });
                this.showModal('guidance');
                return;
            }
            this.showModal('guidance');
            return;
        }
        this.setState({
            curindex: curindex + 1
        });
    }

    showModal = (item: IContent | any ) => {
        if (item === 'guidance') {
            this.setState({
                visible: true,
                curModalType: 'guidance'
            });
        } else {
            this.setState({
              visible: true,
              curselectItem: item,
              curModalType: 'media'
            });
        }
    }
    
    handleOk = () => {
        this.setState({
          visible: false,
        });
        const { category } = this.props;
        const { lessonlist, curlessonId } = category;
        const lessonIds = lessonlist.map(item => {return item.id;});
        const lessonIndex = lessonIds.indexOf(curlessonId);
        if (lessonIndex === (lessonlist.length - 1)) {
            History.replace('/');
        } else {
            // next lesson
            const nextLessoId = lessonIds[lessonIndex+1];
            const nextLesson = lessonlist[lessonIndex+1];
            this.setState({
                isLastLesson: false
            });
            this.props.save({
                curlessonId: nextLessoId,
                curlesson: nextLesson.coverName,
            });
            (document.querySelector('.hasBackBtn .title') as HTMLElement).innerText = nextLesson.coverName;
            this.props.content_list({coverId: nextLessoId}, (res: any) => {
                console.log(res);
            });
        }
    }

    hideModal = () => {
        this.setState({
          visible: false,
        });
    }
    
    renderModal = () => {
        const { curselectItem, curModalType, isLastLesson } = this.state;
        const { langs } = this.props;
        const actions = new Map([
            ['media', {
                width: 800,
                className: "media-modal",
                title:  "",
                footer: null,
                onOk: undefined
            }],
            ['guidance', {
                width: 360,
                className: 'guidance-modal',
                title: <i className="mblock-icon icon-success"></i>,
                onOk: this.handleOk,
                okText: isLastLesson ? langs['tutorial-browse-more-lesson'] : langs['tutorial-start-next-lesson']
            }]
        ]);
        const mediaCon = curselectItem.type === 'image' 
        ? 
            <img src={curselectItem.content} alt="" />
        :
            <video controls
                src={curselectItem.content}
                width="100%" height="100%">
                Sorry, your browser doesn't support embedded videos, 
                but don't worry
            </video>;
        const guidaceMain = isLastLesson ? 
            <div>
                <p>{langs['tutorial-finish-last-lesson-row1']}</p>
                <p>{langs['tutorial-finish-last-lesson-row2']}</p>
            </div>
            :
            <div>
                <p>{langs['tutorial-finish-ond-lesson-row1']}</p>
                <p>{langs['tutorial-finish-ond-lesson-row2']}</p>
            </div>;
        const guidanceCon = <div className="guidace-wrapper">
            {guidaceMain}
        </div>;
        const conObj = {
            'media': mediaCon,
            'guidance': guidanceCon
        };
        return (
            <Modal
                {...actions.get(curModalType)}
                onCancel={this.hideModal}
                align={{}}
                visible={this.state.visible}
                maskClosable={false}
                centered
                zIndex={100000}
                >
                {conObj[curModalType]}
            </Modal>
        );
    }

    render() {
        const { curindex } = this.state;
        const { category, langs } = this.props;
        const { contentlist } = category;
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
                    {!isStart && <Button className="prev" type="primary" htmlType= "submit" onClick={this.handlePrevBtn}>{langs['tutorial-prev-step-btn']}</Button>}
                    <Button className="next" type="primary" htmlType= "submit" onClick={this.handleNextBtn}>{isFinished ? langs['tutorial-finish-btn'] : langs['tutorial-next-step-btn']}</Button>
                </footer>
                {this.renderModal()}
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
});

export default hoc({ tutorialTitle: 'lesson' })(connect(mapStateToProps, mapDispatchToProps)(Contents));