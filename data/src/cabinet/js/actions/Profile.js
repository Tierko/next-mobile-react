import { ACTION_TYPES } from '../constants';
import { ajax, reduxAjax, getFormData } from '../utils';

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

export const patchProfile = () => (dispatch, getState) => {
  const {Profile} = getState();
  reduxAjax('/profile/', 'PATCH', getFormData(Profile), dispatch, patchProfileRequest, patchProfileRequestFail, patchProfileRequestSuccess)
};
