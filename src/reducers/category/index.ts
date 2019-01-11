import CONSTANT from 'constant';
import { Category, IReducerAction } from 'model';

const defaultState: Category = {
    category: '',
    num: 0,
    members: []
};

let num = 0;
const reducer = (state = defaultState, action: IReducerAction) => {
    switch(action.type) {
        case CONSTANT.ACTIONS.CATEGORY_SELECT:
            return Object.assign({}, state, action.payload);
        case CONSTANT.ACTIONS.ADD:
            num++;
            return Object.assign({}, state, {num});
        case CONSTANT.ACTIONS.SAVE:
            return Object.assign({}, state, {members: action.payload});
        default:
            return state;
    }
};

export default reducer;