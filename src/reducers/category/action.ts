import { Dispatch } from 'redux';
import CONSTANT from 'constant';
import { memberAPI } from 'api/member';
import { MemberEntity } from 'model';

const add = () => {
    return {
        type: CONSTANT.ACTIONS.ADD
    }
}

export const fetchMembersAction = () => (dispatch: Dispatch) => {
  memberAPI.fetchMembers()
    .then((members) => {
      dispatch(save(members));
    });
};

const save = (members: MemberEntity[]) => ({
    type: CONSTANT.ACTIONS.SAVE,
    payload: members,
});

export default {
    add,
    fetchMembersAction
};