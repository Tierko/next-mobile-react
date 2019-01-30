import { ACTION_TYPES } from '../constants';
import { ajax, reduxAjax } from '../utils';

const profileRequest = () => ({
  type: ACTION_TYPES.PROFILE_REQUEST,
});

const profileRequestFail = () => ({
  type: ACTION_TYPES.PROFILE_REQUEST_FAIL,
});

const profileRequestSuccess = profile => ({
  type: ACTION_TYPES.PROFILE_REQUEST_SUCCESS,
  profile,
});

export const getProfile = () => (
  dispatch => reduxAjax('/profile/', 'GET', null, dispatch, profileRequest, profileRequestFail, profileRequestSuccess)
);

export const changeProfile = profileValue => ({
  type: ACTION_TYPES.PROFILE_CHANGE,
  profileValue,
});

const patchProfileRequest = () => ({
  type: ACTION_TYPES.PROFILE_CHANGE_SAVE,
});

const patchProfileRequestFail = () => ({
  type: ACTION_TYPES.PROFILE_CHANGE_SAVE_FAIL,
});

const patchProfileRequestSuccess = () => ({
  type: ACTION_TYPES.PROFILE_CHANGE_SAVE_SUCCESS,
});

export const patchProfile = (data) => (
  dispatch => reduxAjax('/profile/', 'PATCH', data, dispatch, patchProfileRequest, patchProfileRequestFail, patchProfileRequestSuccess)
);
