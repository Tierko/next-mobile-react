import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Balance from './Balance';
import Packages from './Packages';
import Roaming from './Roaming';

const reducers = combineReducers({
  Packages,
  Balance,
  Roaming,
});

export default createStore(reducers, {}, applyMiddleware(thunk));
