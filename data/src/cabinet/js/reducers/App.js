import { ACTION_TYPES } from '../constants';

const initState = {
  showNotice: false,
  showChat: false,
};

const AutoPay = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.APP_CHAT_SHOW:
    return Object.assign({}, state, { showChat: true });
  case ACTION_TYPES.APP_CHAT_HIDE:
    return Object.assign({}, state, { showChat: false });
  case ACTION_TYPES.APP_NOTICE_SHOW:
    return Object.assign({}, state, { showNotice: true });
  case ACTION_TYPES.APP_NOTICE_HIDE:
    return Object.assign({}, state, { showNotice: false });
  default:
    return state;
  }
};

export default AutoPay;
