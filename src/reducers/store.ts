import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StoreState } from 'model';

import category from "./category/index";

const reducers = combineReducers<StoreState>({
    category
});

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

if (process.env.NODE_ENV !== 'production') {
    window.Store = store.getState();
}

export default store;