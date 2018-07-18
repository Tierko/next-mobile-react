import { ACTION_TYPES } from '../constants';

const initState = {
  items: [],
  loaded: false,
  error: false,
};

const Packages = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.PACKAGES_REQUEST:
    return Object.assign({}, state, { loaded: false, error: false });
  case ACTION_TYPES.PACKAGES_REQUEST_FAIL:
    return Object.assign({}, state, { loaded: false, error: true });
  case ACTION_TYPES.PACKAGES_REQUEST_SUCCESS:
    return Object.assign({}, state, { loaded: true, error: false, items: action.items });
  default:
    return state;
  }
};

export default Packages;
