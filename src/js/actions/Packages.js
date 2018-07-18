import { ACTION_TYPES } from '../constants';

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
  (dispatch) => {
    dispatch(packagesRequest());

    fetch('/data/packages.json', {
      headers: new Headers({
        'Content-Types': 'text/json',
      }),
    })
      .then(items => items.json())
      .then(items => dispatch(packagesRequestSuccess(items)))
      .catch(() => dispatch(packagesRequestFail()));
  }
);

export default getPackages();
