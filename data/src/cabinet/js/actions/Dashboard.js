import { ACTION_TYPES } from '../constants';
import { reduxAjax } from '../utils';

const dashboardRequest = () => ({
  type: ACTION_TYPES.DASHBOARD_REQUEST,
});

const dashboardRequestFail = () => ({
  type: ACTION_TYPES.DASHBOARD_REQUEST_FAIL,
});

const dashboardRequestSuccess = (response) => ({
  type: ACTION_TYPES.DASHBOARD_REQUEST_SUCCESS,
  response,
});

const getDashboard = () => (
  dispatch => reduxAjax('/dashboard/', 'GET', null, dispatch, dashboardRequest, dashboardRequestFail, dashboardRequestSuccess)
);

export default getDashboard;
