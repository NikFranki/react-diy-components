import store from 'reducers/store';
import CategoryAction from 'reducers/category/action';

function test() {
    console.log('sum plus 1');
    store.dispatch(CategoryAction.add());
}

export default {
    test
};