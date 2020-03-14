export function resetNetwork() {
  return {
    type: 'RESET_NETWORK',
  };
}

export function setNetwork(state) {
  return {
    type: 'SET_NETWORK',
    ...state,
  };
}

export default {
  resetNetwork,
  setNetwork,
};
