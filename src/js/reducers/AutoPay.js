import { ACTION_TYPES } from '../constants';

const initState = {
  monthlyEnabled: true,
  monthlySum: 1000,
  monthlyDay: 2,
  monthlyUntil: 'Август 2018',
  lessEnabled: true,
  lessSum: 1000,
  lessLess: 100,
};

const AutoPay = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.AUTO_PAY_SAVE:
    return Object.assign({}, action.state);
  default:
    return state;
  }
};

export default AutoPay;
