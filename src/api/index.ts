import EventEmitter from 'util/events';

const startTutorial = () => {
    EventEmitter.emit('showDrawer');
}

// const injectIntoTotutorialAppProps = () => {
//     console.log('inject props to TutorialApp');
//     store.dispatch(TutorialAction.add());
// }

export default {
    startTutorial
};

window.TutorialApi = {
    startTutorial
};