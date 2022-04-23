import { createStore, combineReducers, applyMiddleware } from 'redux'
import newsReducer from '../reducers/news-reducer'
import thunk from 'redux-thunk'
import todoReducer from '../reducers/todo-reducer';

let reducers = combineReducers({
    newsPage : newsReducer,
    todoPage : todoReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
export default store