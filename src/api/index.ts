import store from 'reducers/store';
import CategoryAction from 'reducers/category/action';
import EventEmitter from 'util/events';

const test = () => {
    console.log('sum plus 1');
    store.dispatch(CategoryAction.add());
}

const startTutorial = () => {
    EventEmitter.emit('showDrawer', true);
}

export default {
    test,
    startTutorial
};

window.TutorialApi = {
    test,
    startTutorial
};