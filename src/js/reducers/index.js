import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Packages from './Packages';

const reducers = combineReducers({
  Packages,
});

export default createStore(reducers, {}, applyMiddleware(thunk));
