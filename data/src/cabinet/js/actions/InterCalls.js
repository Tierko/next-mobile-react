import { ACTION_TYPES } from '../constants';
import { ajax } from '../utils';

const interCallsRequest = () => ({
  type: ACTION_TYPES.INTER_CALLS_REQUEST,
});

const interCallsRequestFail = () => ({
  type: ACTION_TYPES.INTER_CALLS_REQUEST_FAIL,
});

const interCallsRequestSuccess = data => ({
  type: ACTION_TYPES.INTER_CALLS_REQUEST_SUCCESS,
  data,
});

const getInterCallsAction = () => (
  dispatch => ajax('/media/info/internation-calls.json', dispatch, interCallsRequest, interCallsRequestFail, interCallsRequestSuccess)
);

export default getInterCallsAction;
