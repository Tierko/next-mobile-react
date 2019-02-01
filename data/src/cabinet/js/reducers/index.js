import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import App from './App';
import AutoPay from './AutoPay';
import Balance from './Balance';
import Cards from './Cards';
import Packages from './Packages';
import Dashboard from './Dashboard';
import Expenses from './Expenses';
import Roaming from './Roaming';
import Notice from './Notice';
import InterCalls from './InterCalls';
import Profile from './Profile';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  App,
  AutoPay,
  Balance,
  Cards,
  Packages,
  Dashboard,
  Expenses,
  Roaming,
  Notice,
  InterCalls,
  Profile,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
const persistor = persistStore(store);

export default { store, persistor };
