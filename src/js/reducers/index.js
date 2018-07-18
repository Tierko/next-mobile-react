import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Balance from './Balance';
import Packages from './Packages';

const reducers = combineReducers({
  Packages,
  Balance,
});

export default createStore(reducers, {}, applyMiddleware(thunk));
