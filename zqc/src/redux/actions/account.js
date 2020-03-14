import {
  ApiResultError,
  ERROR_CODE_DUPLICATED,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_WRONG_PASSWORD,
  ERROR_CODE_INVALID_VERIFY_CODE,
} from '../../error';
import * as apis from '../../apis';

import {cacheUsers} from './object';
import {handleError, errorFlash} from './error';

export function resetAccount() {
  return {
    type: 'RESET_ACCOUNT',
  };
}

export function setAccountUser({user, cbOk}) {
  return dispatch => {
    dispatch(cacheUsers({users: [user]}))
      .then(users => {
        let tmpUser = users[0];
        dispatch({type: 'SET_ACCOUNT_USER', id: tmpUser.id});
        if (cbOk) {
          cbOk(tmpUser);
        }
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function setAccountSettings(settings) {
  return {
    type: 'SET_ACCOUNT_SETTINGS',
    settings,
  };
}

export function register({csrfToken, mobile, password, code, cbOk}) {
  return dispatch => {
    apis
      .register({csrfToken, mobile, password, code})
      .then(response => {
        let {code: regCode, msg} = response;
        if (regCode !== 0) {
          dispatch(errorFlash(msg || '未知错误'));
          return;
        } else {
          dispatch(login({csrfToken, mobile, password, cbOk}));
        }
      })
      .catch(error => {
        if (error instanceof ApiResultError) {
          if (error.code === ERROR_CODE_DUPLICATED) {
            dispatch(errorFlash('手机号已注册过。'));
            return;
          } else if (error.code === ERROR_CODE_INVALID_VERIFY_CODE) {
            dispatch(errorFlash('验证码错误。'));
            return;
          }
        }
        dispatch(handleError(error));
      });
  };
}

export function isLogined({cbOk, cbFail}, {timeout = 5000} = {}) {
  return dispatch => {
    apis
      .isLogined({timeout})
      .then(response => {
        let {
          data: {user, settings},
        } = response;
        if (user) {
          dispatch(setAccountUser({user}));
        }
        if (settings) {
          dispatch(setAccountSettings(settings));
        }
        if (cbOk) {
          cbOk({user, settings});
        }
      })
      .catch(error => {
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(handleError(error));
        }
      });
  };
}

export function login({csrfToken, username, mobile, email, password, cbOk}) {
  return dispatch => {
    apis
      .login({csrfToken, username, mobile, email, password})
      .then(response => {
        let {
          data: {user, settings},
        } = response;
        dispatch(setAccountUser({user, cbOk}));
        dispatch(setAccountSettings(settings));
      })
      .catch(error => {
        if (error instanceof ApiResultError) {
          if (
            error.code === ERROR_CODE_NOT_FOUND ||
            error.code === ERROR_CODE_WRONG_PASSWORD
          ) {
            dispatch(errorFlash('帐号或密码错误'));
            return;
          }
        }
        dispatch(handleError(error));
      });
  };
}

export function logout(cbOk) {
  return dispatch => {
    apis
      .logout()
      .then(response => {
        if (cbOk) {
          cbOk();
        }
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function updateAccount({update, cbOk, cbFail}) {
  return dispatch => {
    apis
      .updateAccount(update)
      .then(response => {
        let {
          data: {user},
        } = response;
        return dispatch(cacheUsers({users: [user]}));
      })
      .then(users => {
        let user = users[0];
        if (cbOk) {
          cbOk(user);
        }
      })
      .catch(error => {
        if (cbFail) {
          cbFail(error);
        } else {
          dispatch(handleError(error));
        }
      });
  };
}

export function updateAccountSettings(settings) {
  return dispatch => {
    apis
      .updateAccountSettings(settings)
      .then(response => {
        let {
          data: {settings},
        } = response;
        dispatch(setAccountSettings(settings));
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function resetPassword({mobile, email, password, code, cbOk}) {
  return dispatch => {
    apis
      .resetPassword({mobile, email, password, code})
      .then(response => {
        let {
          data: {user},
        } = response;
        return dispatch(cacheUsers({users: [user]}));
      })
      .then(users => {
        let user = users[0];
        if (cbOk) {
          cbOk(user);
        }
      })
      .catch(error => dispatch(handleError(error)));
  };
}

export function accountInfo({cbOk, cbFinish}) {
  return dispatch => {
    apis
      .accountInfo()
      .then(response => {
        let {
          data: {user, settings},
        } = response;
        dispatch(setAccountSettings(settings));
        return dispatch(cacheUsers({users: [user]}));
      })
      .then(users => {
        if (cbFinish) {
          cbFinish();
        }
        let user = users[0];
        if (cbOk) {
          cbOk(user);
        }
      })
      .catch(error => {
        if (cbFinish) {
          cbFinish();
        }
        dispatch(handleError(error));
      });
  };
}

export default {
  resetAccount,
  setAccountUser,
  setAccountSettings,
  register,
  isLogined,
  login,
  logout,
  updateAccount,
  updateAccountSettings,
  resetPassword,
  accountInfo,
};
