import CONSTANT from 'constant';
import { Category, IReducerAction } from 'model';

const defaultState: Category = {
    category: '',
    num: 0,
    members: [],
    series: []
};

let num = 0;
const reducer = (state = defaultState, action: IReducerAction) => {
    switch(action.type) {
        case CONSTANT.ACTIONS.CATEGORY_SELECT:
            return {...state, ...action.payload};
        case CONSTANT.ACTIONS.ADD:
            num++;
            return Object.assign({}, state, {num});
        case CONSTANT.ACTIONS.SAVE:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export default reducer;