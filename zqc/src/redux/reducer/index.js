import {combineReducers} from 'redux';

// 导航
import nav from './nav';
// 主题
import theme from './theme';
// 其他
import app from './app';
import store from './store';
import persist from './persist';
import loading from './loading';
import processing from './processing';
import error from './error';
import input from './input';
import screen from './screen';
import location from './location';
import object from './object';
import network from './network';
import account from './account';
import user from './user';
import post from './post';
import player from './player';
import security from './security';

/**
 * 3.合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export default combineReducers({
  nav: nav,
  theme: theme,
  app,
  store,
  persist,
  loading,
  processing,
  error,
  network,
  location,
  input,
  screen,
  object,
  account,
  user,
  post,
  player,
  security,
});

// const redu = combineReducers({
//   nav: nav,
//   theme: theme,
// });

// export default redu;
