import CONSTANT from 'constant';
import { Category, IReducerAction } from 'model';

const defaultState: Category = {
    category: '',
    members: [],
    series: [],
    cursery: '',
    curlesson: '',
    curstep: '',
    curtitle: 'Tutorials'
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