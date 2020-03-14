const initialState = {
  Login: {
    account: '',
    password: '',
  },
  ResetPassword: {
    account: '',
    password: '',
    code: '',
  },

  RegisterMobile: {
    mobile: '',
    password: '',
  },
  RegisterVerify: {
    code: '',
  },

  EditProfileNickname: {
    nickname: '',
  },
  EditProfileEmail: {
    email: '',
    code: '',
  },
  EditProfileAvatar: {
    avatarType: '',
    avatarName: '',
    avatarFile: null,
    avatarImage: null,
  },
  EditProfileIntro: {
    intro: '',
  },
  EditProfileBackground: {
    backgroundType: '',
    backgroundName: '',
    backgroundFile: null,
    backgroundImage: null,
  },
};

export default (state = initialState, action) => {
  if (action.type === 'INPUT') {
    let {screenId, input} = action;
    return {
      ...state,
      [screenId]: Object.assign({}, state[screenId], input),
    };
  } else if (action.type === 'RESET_INPUT') {
    let {screenId} = action;
    if (screenId === undefined) {
      return initialState;
    } else {
      return {
        ...state,
        [screenId]: initialState[screenId],
      };
    }
  } else if (action.type === 'RESET') {
    return initialState;
  } else {
    return state;
  }
};
