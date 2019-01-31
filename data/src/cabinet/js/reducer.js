import { combineReducers } from 'redux'
import { enableBatching } from 'redux-batched-actions'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import { api, forms } from 'redux-restify'


const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  blacklist: ['api', 'router']
};

const getRootReducer = () => {
  const reducer = enableBatching(combineReducers({
    [api.constants.NAME]: api.getRestifyApiReducer(),
    [forms.constants.NAME]: forms.getRestifyFormReducer(),
  }))
  return persistReducer(persistConfig, reducer)
}

export default getRootReducer
