import EventEmitter from 'util/events';

class TutorialApi {

    init() {
        window.TutorialApi = this;
    }

    openOrCloseTutorial = () => {
        EventEmitter.emit('showDrawer');
    }

}

export default new TutorialApi();


