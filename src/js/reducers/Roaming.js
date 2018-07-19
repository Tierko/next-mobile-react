import { ACTION_TYPES } from '../constants';

const initState = {
  currentZoneId: 0,
  currentCountry: 'UA',
  loaded: false,
  error: false,
  features: {
    items: [],
  },
  zones: {
    loaded: false,
    error: false,
    items: [],
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
  default:
    return state;
  }
};

export default Roaming;
