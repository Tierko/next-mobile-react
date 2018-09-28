import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AutoPay from './AutoPay';
import Balance from './Balance';
import Cards from './Cards';
import Packages from './Packages';
import Roaming from './Roaming';
import Notice from './Notice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  AutoPay,
  Balance,
  Cards,
  Packages,
  Roaming,
  Notice,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
const persistor = persistStore(store);

export default { store, persistor };
