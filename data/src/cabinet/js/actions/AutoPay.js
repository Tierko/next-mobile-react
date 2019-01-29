import { ACTION_TYPES } from '../constants';

export const autoPaySaveAction = state => ({
  type: ACTION_TYPES.AUTO_PAY_SAVE,
  state,
});

export const autoPayDisableAction = () => ({
  type: ACTION_TYPES.AUTO_PAY_DISABLE,
});
