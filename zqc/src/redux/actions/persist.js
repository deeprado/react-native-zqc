export function resetPersist() {
  return {
    type: 'RESET_PERSIST',
  };
}

export function setPersistRehydrated(rehydrated) {
  return {
    type: 'SET_PERSIST_REHYDRATED',
    rehydrated,
  };
}

export default {
  resetPersist,
  setPersistRehydrated,
};
