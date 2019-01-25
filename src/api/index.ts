import EventEmitter from 'util/events';
import store from "reducers/store";
import TutorialAction from "reducers/tutorial/action";

class TutorialApi {

    init() {
        window.TutorialApis = this;
    }

    openOrCloseTutorial = (visible: boolean) => {
        EventEmitter.emit('showDrawer', visible);
    }

    openDrawer = () => {
        store.dispatch(TutorialAction.openDrawer());
    }

    closeDrawer = () => {
        store.dispatch(TutorialAction.closeDrawer());
    }
}

export default TutorialApi;


