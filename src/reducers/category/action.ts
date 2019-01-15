import { Dispatch } from 'redux';
import CONSTANT from 'constant';
import { memberAPI } from 'api/member';
import { MemberEntity, Sery, Category } from 'model';

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

const save = (res: {[key: string]: MemberEntity[] | Sery[] | Category} ) => ({
    type: CONSTANT.ACTIONS.SAVE,
    payload: res,
});

export default {
    save,
    fetchMembersAction,
    fetchSeriesAction
};