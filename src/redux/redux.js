import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { statReducer } from './statReducer';

const reducers = combineReducers({
  stat: statReducer,
});
const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;
export default store;
