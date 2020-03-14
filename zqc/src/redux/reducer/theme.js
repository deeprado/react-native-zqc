import * as type from '../actions/actionType';

const initialThemeState = {
  themeColor: 'green',
};

const theme = (state = initialThemeState, action) => {
  switch (action.type) {
    case type.THEME_CHANGE:
      return {
        ...state,
        themeColor: action.themeColor,
      };
    default:
      return state;
  }
};

export default theme;
