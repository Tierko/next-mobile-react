import { ACTION_TYPES } from '../constants';
import { ajax } from '../utils';

const packagesRequest = () => ({
  type: ACTION_TYPES.PACKAGES_REQUEST,
});

const packagesRequestFail = () => ({
  type: ACTION_TYPES.PACKAGES_REQUEST_FAIL,
});

const packagesRequestSuccess = (items) => ({
  type: ACTION_TYPES.PACKAGES_REQUEST_SUCCESS,
  items,
});

const getPackages = () => (
  dispatch => (ajax('/media/data/packages.json', dispatch, packagesRequest, packagesRequestFail, packagesRequestSuccess))
);

export default getPackages();
