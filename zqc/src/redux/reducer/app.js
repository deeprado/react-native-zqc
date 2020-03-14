const initialState = {
  env: 'development',
};

export default (state = initialState, action) => {
  if (action.type === 'SET_APP_ENV') {
    let {env} = action;
    return {
      ...state,
      env,
    };
  } else if (action.type === 'RESET' || action.type === 'RESET_APP') {
    return initialState;
  } else {
    return state;
  }
};
