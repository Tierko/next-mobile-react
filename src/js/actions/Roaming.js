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
  dispatch => ajax('/media/data/roaming-zones.json', dispatch, zonesRequest, zonesRequestFail, zonesRequestSuccess)
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
  dispatch => ajax('/media/data/map.geo.json', dispatch, featuresRequest, featuresRequestFail, featuresRequestSuccess)
);

const roamingInternetRequest = () => ({
  type: ACTION_TYPES.ROAMING_INTERNET_REQUEST,
});

const roamingInternetRequestFail = () => ({
  type: ACTION_TYPES.ROAMING_INTERNET_REQUEST_FAIL,
});

const roamingInternetRequestSuccess = data => ({
  type: ACTION_TYPES.ROAMING_INTERNET_REQUEST_SUCCESS,
  data,
});

export const getRoamingInternetAction = () => (
  dispatch => ajax('/media/data/roaming-internet.json', dispatch, roamingInternetRequest, roamingInternetRequestFail, roamingInternetRequestSuccess)
);
