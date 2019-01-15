import CONSTANT from 'constant';
import { Tutorial, IReducerAction } from 'model';

const defaultState: Tutorial = {
    category: '',
    members: [],
    series: [],
    cursery: '',
    curlesson: '',
    curstep: '',
    curtitle: 'Get start',
    serylist: []
};

const reducer = (state = defaultState, action: IReducerAction) => {
    switch(action.type) {
        case CONSTANT.ACTIONS.CATEGORY_SELECT:
            return {...state, ...action.payload};
        case CONSTANT.ACTIONS.SAVE:
            return {...state, ...action.payload};
        case 'sery_list':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default reducer;