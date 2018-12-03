import { ACTION_TYPES } from '../constants';

const initState = {
  showChat: false,
};

const AutoPay = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.APP_CHAT_SHOW:
    return Object.assign({}, state, { showChat: true });
  case ACTION_TYPES.APP_CHAT_HIDE:
    return Object.assign({}, state, { showChat: false });
  default:
    return state;
  }
};

export default AutoPay;
