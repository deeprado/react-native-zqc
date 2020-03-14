export function resetProcessing() {
  return {
    type: 'RESET_PROCESSING',
  };
}

export function processingTask(task) {
  return {
    type: 'PROCESSING_TASK',
    task,
  };
}

export default {
  resetProcessing,
  processingTask,
};
