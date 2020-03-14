const initialState = {
  opBarHidden: true,
  orientation: 'PORTRAIT',
  isBuffering: false,
  loaded: false,
  paused: false,
  ended: false,
  rate: 1,
  rateSelectorVisible: false,
  src: undefined,
  naturalSize: undefined,
  duration: 0,
  playableDuration: 0,
  currentTime: 0,
  volume: 1,
  muted: false,
  repeat: false,
  resizeMode: 'contain',
  poster: 'https://baconmockup.com/300/200/',
  posterResizeMode: 'cover',
};

export default (state = initialState, action) => {
  if (action.type === 'SET_PLAYER_STATE') {
    let {...newState} = action;
    delete newState.type;
    newState = Object.assign({}, state, newState);
    newState.currentTime = Math.min(newState.currentTime, newState.duration);
    return newState;
  } else if (action.type === 'RESET' || action.type === 'RESET_PLAYER_STATE') {
    return initialState;
  } else {
    return state;
  }
};
