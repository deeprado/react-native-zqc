export function reset() {
  return {
    type: 'RESET',
  };
}

export function resetStore() {
  return {
    type: 'RESET_STORE',
  };
}

export function setStoreVersion(version) {
  return {
    type: 'SET_STORE_VERSION',
    version,
  };
}

export default {
  reset,
  resetStore,
  setStoreVersion,
};
