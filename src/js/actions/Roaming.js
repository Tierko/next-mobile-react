import { ACTION_TYPES } from '../constants';
import { ajax } from '../utils';

export const toggleRoaming = () => ({
  type: ACTION_TYPES.ROAMING_TOGGLE,
});

const zonesRequest = () => ({
  type: ACTION_TYPES.ROAMING_ZONES_REQUEST,
});

const zonesRequestFail = () => ({
  type: ACTION_TYPES.ROAMING_ZONES_REQUEST_FAIL,
});

const zonesRequestSuccess = items => ({
  type: ACTION_TYPES.ROAMING_ZONES_REQUEST_SUCCESS,
  items,
});

export const getZonesAction = () => (
  dispatch => ajax('/data/roaming-zones.json', dispatch, zonesRequest, zonesRequestFail, zonesRequestSuccess)
);

const featuresRequest = () => ({
  type: ACTION_TYPES.ROAMING_FEATURES_REQUEST,
});

const featuresRequestFail = () => ({
  type: ACTION_TYPES.ROAMING_FEATURES_REQUEST_FAIL,
});

const featuresRequestSuccess = items => ({
  type: ACTION_TYPES.ROAMING_FEATURES_REQUEST_SUCCESS,
  items,
});

export const getFeaturesAction = () => (
  dispatch => ajax('/data/map.geo.json', dispatch, featuresRequest, featuresRequestFail, featuresRequestSuccess)
);
