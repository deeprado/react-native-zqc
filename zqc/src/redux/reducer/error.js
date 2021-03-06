const initialState = {
  input: {},
  flash: '',
};

export default (state = initialState, action) => {
  if (action.type === 'ERROR_INPUT') {
    let {screenId, error} = action;
    return {
      ...state,
      input: {
        ...state.input,
        [screenId]: {
          ...(state.input[screenId] === undefined ? {} : state.input[screenId]),
          ...error,
        },
      },
    };
  } else if (action.type === 'RESET_ERROR_INPUT') {
    let {screenId} = action;
    if (screenId === undefined) {
      return {
        ...state,
        input: initialState.input,
      };
    } else {
      return {
        ...state,
        input: {
          ...state.input,
          [screenId]: initialState.input[screenId] || {},
        },
      };
    }
  } else if (action.type === 'ERROR_FLASH') {
    let {error} = action;
    return {
      ...state,
      flash: error,
    };
  } else if (action.type === 'RESET' || action.type === 'RESET_ERROR') {
    return initialState;
  } else {
    return state;
  }
};
