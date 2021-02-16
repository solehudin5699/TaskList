import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import indexReducer from './reducers/';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, indexReducer);
const logger = createLogger();
const enhancer = applyMiddleware(logger);

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

export {store, persistor};
