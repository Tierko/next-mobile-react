import { persistStore } from 'redux-persist';
import configureStore from './configureStore';


const getStorage = (history) => {
  const store = configureStore(history, {});
  const persistor = persistStore(store);
  return { store, persistor };
}

export default getStorage
