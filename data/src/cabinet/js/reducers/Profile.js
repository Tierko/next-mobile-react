import { ACTION_TYPES } from '../constants';

const initState = {
  email: '',
  send_paychecks: false,
  email_for_detalization: '',
  spendings_notification: false,
  spendings_amount: 0,
  spendings_notification_display: '',
  error: false,
  loaded: false,
};

const Profile = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.PROFILE_REQUEST:
    return Object.assign({}, state, { error: false, loaded: false });
  case ACTION_TYPES.PROFILE_REQUEST_SUCCESS:
    return Object.assign({}, state, action.profile, { error: false, loaded: true });
  case ACTION_TYPES.PROFILE_REQUEST_FAIL:
    return Object.assign({}, state, { error: true, loaded: false });
  case ACTION_TYPES.PROFILE_CHANGE:
    return Object.assign({}, state, { [action.profileValue.name]: action.profileValue.value });
  case ACTION_TYPES.PROFILE_CHANGE_SAVE:
    console.log(action);
    return Object.assign({}, state, { error: false });
  case ACTION_TYPES.PROFILE_CHANGE_SAVE_SUCCESS:
    console.log(action);
    return Object.assign({}, state, { error: false });
  case ACTION_TYPES.PROFILE_CHANGE_SAVE_FAIL:
    console.log(action);
    return Object.assign({}, state, { error: true });
  default:
    return state;
  }
};

export default Profile;
