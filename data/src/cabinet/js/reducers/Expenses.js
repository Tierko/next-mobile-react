import { ACTION_TYPES } from '../constants';

const initState = {
  items: [],
  loaded: false,
  error: false,
};

const Expenses = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.EXPENSES_REQUEST:
    return Object.assign({}, state, { loaded: false, error: false });
  case ACTION_TYPES.EXPENSES_REQUEST_FAIL:
    return Object.assign({}, state, { loaded: false, error: true });
  case ACTION_TYPES.EXPENSES_REQUEST_SUCCESS:
    return Object.assign({}, state, { loaded: true, error: false, items: action.response.history });
  default:
    return state;
  }
};

export default Expenses;
