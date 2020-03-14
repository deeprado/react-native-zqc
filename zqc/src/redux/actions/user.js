import * as apiUser from '../../apis/user';

import {cacheUserByIds, cacheUsers} from './object';
import {handleError, errorFlash} from './error';

export function resetUser() {
  return {
    type: 'RESET_USER',
  };
}

export function userInfo({userId, cbOk, cbFail, cbFinish}) {
  return dispatch => {
    dispatch(cacheUserByIds({userIds: [userId], update: true}))
      .then(users => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbOk) {
          cbOk(users);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(handleError(error));
        }
      });
  };
}

export function nearbyUsers({cbOk, cbFail, cbFinish} = {}) {
  return (dispatch, getState) => {
    let {
      location: {position},
    } = getState();
    if (!position) {
      if (cbFinish) {
        cbFinish();
      }
      dispatch(errorFlash('无法获取当前位置。'));
      return;
    }
    let {coords: location} = position;
    apiUser
      .nearbyUsers({location})
      .then(response => {
        let {
          data: {users},
        } = response;
        return dispatch(cacheUsers({users}));
      })
      .then(users => {
        if (cbFinish) {
          cbFinish();
        }
        let userIds = users.map(v => v.id);
        dispatch({type: 'SET_NEARBY_USERS', userIds});
        if (cbOk) {
          cbOk(users);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(handleError(error));
        }
      });
  };
}

export default {
  resetUser,
  userInfo,
  nearbyUsers,
};
