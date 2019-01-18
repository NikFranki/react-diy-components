import { Dispatch } from 'redux';
import CONSTANT from 'constant';
import { Tutorial } from 'model';
import { TurtorialApi } from 'services/api.remote';

const save = (res: {[key: string]: Tutorial} ) => ({
    type: CONSTANT.ACTIONS.SAVE,
    payload: res,
});

const sery_list = (success: Function, fail: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await TurtorialApi['sery_list']();
            console.log('sery_list: ', result);
            dispatch(save({serylist: result.categoryList}));
            success && success(result.categoryList);
        } catch (error) {
            console.warn(error);
            fail && fail(error);
        }
    };
};

const lesson_list = (data: {categoryId: number}, success?: Function, fail?: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await TurtorialApi['lesson_list'](data);
            console.log('leson_list: ', result);
            dispatch(save({lessonlist: result.coverList}));
            success && success(result.coverList);
        } catch (error) {
            console.warn(error);
            fail && fail(error);
        }
    };
}

const content_list= (data: {coverId: number}, success?: Function, fail?: Function) => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await TurtorialApi['content_list'](data);
            console.log('content_list: ', result);
            dispatch(save({contentlist: result.contentList}));
            success && success(result.contentList);
        } catch (error) {
            console.warn(error);
            fail && fail(error);
        }
    };
};

export default {
    save,
    sery_list,
    lesson_list,
    content_list
};