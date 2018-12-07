import { ACTION_TYPES } from '../constants';

const initState = {
  monthlyEnabled: false,
  monthlySum: 1000,
  monthlyDay: 2,
  monthlyUntil: 'август 2018',
  lessEnabled: false,
  lessSum: 1000,
  lessLess: 100,
};

const AutoPay = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.AUTO_PAY_SAVE:
    return Object.assign({}, action.state);
  case ACTION_TYPES.AUTO_PAY_DISABLE:
    return Object.assign({}, state, {
      monthlyEnabled: false,
      lessEnabled: false,
    });
  default:
    return state;
  }
};

export default AutoPay;
