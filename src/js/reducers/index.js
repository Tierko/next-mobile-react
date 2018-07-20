import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Balance from './Balance';
import Cards from './Cards';
import Packages from './Packages';
import Roaming from './Roaming';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  Balance,
  Cards,
  Packages,
  Roaming,
});

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
const persistor = persistStore(store);

export default { store, persistor };
