import { ACTION_TYPES } from '../constants';
import { reduxAjax } from '../utils';

const expensesRequest = () => ({
  type: ACTION_TYPES.EXPENSES_REQUEST,
});

const expensesRequestFail = () => ({
  type: ACTION_TYPES.EXPENSES_REQUEST_FAIL,
});

const expensesRequestSuccess = (response) => ({
  type: ACTION_TYPES.EXPENSES_REQUEST_SUCCESS,
  response,
});

const getExpenses = () => (
  dispatch => reduxAjax('/history/groups/', 'GET', null, dispatch, expensesRequest, expensesRequestFail, expensesRequestSuccess)
);

export default getExpenses;
