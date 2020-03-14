import * as apis from '../../apis';
import * as type from './actionType';

import {handleError} from './error';

export function sendVerifyCode({by, mobile, email, cbOk}) {
  return (dispatch, getState) => {
    apis
      .sendVerifyCode({by, mobile, email})
      .then(response => {
        let {
          data: {csrfToken},
        } = response;
        dispatch(changeCsrfToken(csrfToken));
        cbOk && cbOk();
      })
      .catch(error => dispatch(handleError(error)));
  };
}

function changeCsrfToken(csrfToken) {
  return {
    type: type.CSRF_TOKEN_CHANGE,
    csrfToken: csrfToken,
  };
}

export default {
  sendVerifyCode,
};
