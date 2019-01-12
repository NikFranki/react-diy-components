import { IDrawer, IReducerAction } from 'model';

const initialState: IDrawer = {
    isShowDrawer: false,
};

const reducer = (state = initialState, action: IReducerAction) => {
    switch(action.type) {
        case '':
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default reducer;