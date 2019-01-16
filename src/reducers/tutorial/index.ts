import CONSTANT from 'constant';
import { Tutorial, IReducerAction } from 'model';

const defaultState: Tutorial = {
    category: '',
    members: [],
    series: [],
    cursery: '',
    curlesson: '',
    curstep: '',
    curseryId: 0,
    curlessonId: 0,
    curtitle: 'Get start',
    serylist: [],
    lessonlist: [],
    contentlist: [],
};

const reducer = (state = defaultState, action: IReducerAction) => {
    switch(action.type) {
        case CONSTANT.ACTIONS.CATEGORY_SELECT:
            return {...state, ...action.payload};
        case CONSTANT.ACTIONS.SAVE:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default reducer;