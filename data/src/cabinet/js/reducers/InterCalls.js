import { ACTION_TYPES } from '../constants';

const initState = {
  loaded: false,
  error: false,
  data: {
    groups: {},
    items: [],
  },
};

const InterCalls = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.INTER_CALLS_REQUEST:
    return Object.assign({}, state, {
      loaded: false,
      error: false,
      data: { groups: {}, items: [] },
    });
  case ACTION_TYPES.INTER_CALLS_REQUEST_FAIL:
    return Object.assign({}, state, {
      loaded: false,
      error: true,
      data: { groups: {}, items: [] },
    });
  case ACTION_TYPES.INTER_CALLS_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      loaded: true,
      error: false,
      data: action.data,
    });
  default:
    return state;
  }
};

export default InterCalls;
