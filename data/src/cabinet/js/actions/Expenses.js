import { ACTION_TYPES } from '../constants';
import { sendAjax } from '../utils';

const expensesRequest = () => ({
  type: ACTION_TYPES.EXPENSES_REQUEST,
});

const expensesRequestFail = () => ({
  type: ACTION_TYPES.EXPENSES_REQUEST_FAIL,
});

const expensesRequestSuccess = (items) => ({
  type: ACTION_TYPES.EXPENSES_REQUEST_SUCCESS,
  items,
});

const getExpenses = () => (
  async (dispatch) => {
    dispatch(expensesRequest());
    try {
      const items = await sendAjax('/history/groups/', 'GET');
      dispatch(expensesRequestSuccess(items.history));
    } catch (error) {
      dispatch(expensesRequestFail());
    }
  }
);

export default getExpenses;
