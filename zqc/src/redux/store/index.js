import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {autoRehydrate, persistStore as reduxPersistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducers from '../reducer';
import {middleware} from '../navigator/AppNavigators';

const middlewares = [middleware, thunk];

export function persistStore(store, cbOk, cbFail) {
  reduxPersistStore(
    store,
    {
      storage: AsyncStorage,
      blacklist: [
        'persist',
        'loading',
        'processing',
        'error',
        'network',
        'location',
      ],
    },
    (error, state) => {
      if (error) {
        cbFail(error);
      } else {
        cbOk(state);
      }
    },
  );
}

/**
 * 创建store
 */
export function confitsStore() {
  // 根据 reducer 初始化 store
  const store = createStore(reducers, applyMiddleware(...middlewares));

  return store;
}

export default confitsStore();
