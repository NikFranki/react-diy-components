import { Dispatch } from 'redux';
import CONSTANT from 'constant';
import { memberAPI } from 'api/member';
import { MemberEntity, Sery, Tutorial } from 'model';
import { TurtorialApi } from 'services/api.remote';

export const fetchMembersAction = () => (dispatch: Dispatch) => {
  memberAPI.fetchMembers()
    .then((members) => {
      dispatch(save({members}));
    });
};

export const fetchSeriesAction = () => (dispatch: Dispatch) => {
    memberAPI.fetchSeries().then(series => {
        dispatch(save({series}));
    })
}

const save = (res: {[key: string]: MemberEntity[] | Sery[] | Tutorial} ) => ({
    type: CONSTANT.ACTIONS.SAVE,
    payload: res,
});

const sery_list = () => {
    return async (dispatch: Dispatch) => {
        try {
            const result = await TurtorialApi['sery_list']();
            console.log('sery_list: ', result);
            dispatch(save({serylist: result.categoryList}));
        } catch (error) {
            console.warn(error);
        }
    };
};

export default {
    save,
    fetchMembersAction,
    fetchSeriesAction,
    sery_list
};