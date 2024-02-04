import { createStore, applyMiddleware } from 'redux';
import chatReducers from './reducers/chatReducers';
import {thunk} from 'redux-thunk';


const store = createStore(
    chatReducers,
    applyMiddleware(thunk)
);

export default store;