import * as type from '../actions/actionType';

const initialSecurityState = {
  csrfToken: null,
};

const security = (state = initialSecurityState, action) => {
  switch (action.type) {
    case type.CSRF_TOKEN_CHANGE:
      return {
        ...state,
        themeColor: action.csrfToken,
      };
    default:
      return state;
  }
};

export default security;
