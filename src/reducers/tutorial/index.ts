import CONSTANT from 'constant';
import { Tutorial, IReducerAction } from 'model';

const defaultState: Tutorial = {
    cursery: '',
    curlesson: '',
    curstep: '',
    curseryId: 0,
    curlessonId: 0,
    serylist: [],
    lessonlist: [],
    contentlist: [],
};

const reducer = (state = defaultState, action: IReducerAction) => {
    switch(action.type) {
        case CONSTANT.ACTIONS.SAVE:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default reducer;