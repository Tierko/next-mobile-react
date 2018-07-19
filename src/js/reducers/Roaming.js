import { ACTION_TYPES } from '../constants';

const initState = {
  currentZoneId: 0,
  currentCountry: 'UA',
  features: {
    loaded: false,
    error: false,
    items: [],
  },
  zones: {
    loaded: false,
    error: false,
    items: [],
  },
  internet: {
    loaded: false,
    error: false,
    data: {},
  },
};

const Roaming = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.ROAMING_TOGGLE:
    return Object.assign({}, state, { currentZoneId: state.currentZoneId ? 0 : 1 });
  case ACTION_TYPES.ROAMING_ZONES_REQUEST:
    return Object.assign({}, state, { zones: { loaded: false, error: false, items: [] } });
  case ACTION_TYPES.ROAMING_ZONES_REQUEST_FAIL:
    return Object.assign({}, state, { zones: { loaded: false, error: true, items: [] } });
  case ACTION_TYPES.ROAMING_ZONES_REQUEST_SUCCESS:
    return Object.assign({}, state, { zones: { loaded: true, error: false, items: action.items } });
  case ACTION_TYPES.ROAMING_FEATURES_REQUEST:
    return Object.assign({}, state, { features: { loaded: false, error: false, items: [] } });
  case ACTION_TYPES.ROAMING_FEATURES_REQUEST_FAIL:
    return Object.assign({}, state, { features: { loaded: false, error: true, items: [] } });
  case ACTION_TYPES.ROAMING_FEATURES_REQUEST_SUCCESS:
    return Object.assign({}, state, { features: { loaded: true, error: false, items: action.items } });
  case ACTION_TYPES.ROAMING_INTERNET_REQUEST:
    return Object.assign({}, state, { internet: { loaded: false, error: false, data: {} } });
  case ACTION_TYPES.ROAMING_INTERNET_REQUEST_FAIL:
    return Object.assign({}, state, { internet: { loaded: false, error: true, data: {} } });
  case ACTION_TYPES.ROAMING_INTERNET_REQUEST_SUCCESS:
    return Object.assign({}, state, { internet: { loaded: true, error: false, data: action.data } });
  default:
    return state;
  }
};

export default Roaming;
