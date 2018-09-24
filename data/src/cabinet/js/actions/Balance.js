import { ACTION_TYPES } from '../constants';

export const setSumBalance = sum => ({
  type: ACTION_TYPES.BALANCE_SUM_SET,
  sum,
});

export const setInternetBalance = sum => ({
  type: ACTION_TYPES.BALANCE_INTERNET_SET,
  sum,
});

export const setCallsBalance = sum => ({
  type: ACTION_TYPES.BALANCE_CALLS_SET,
  sum,
});
