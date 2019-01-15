import EventEmitter from 'util/events';

const test = () => {
    console.log('sum plus 1');
}

const startTutorial = () => {
    EventEmitter.emit('showDrawer', true);
}

// const injectIntoTotutorialAppProps = () => {
//     console.log('inject props to TutorialApp');
//     store.dispatch(TutorialAction.add());
// }

export default {
    test,
    startTutorial
};

window.TutorialApi = {
    test,
    startTutorial
};