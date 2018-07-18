import { ACTION_TYPES } from '../constants';

const initState = {
  sum: 0,
  internet: {
    current: 0,
    max: 0,
    unit: 'ГБ',
    name: 'Интернет',
    link: true,
  },
  calls: {
    current: 1000,
    max: 1000,
    unit: 'мин',
    name: 'Звонки',
    link: true,
  },
};

const Packages = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.BALANCE_SUM_SET:
    return Object.assign({}, state, { balance: action.sum });
  case ACTION_TYPES.BALANCE_INTERNET_SET:
    return Object.assign({}, state, { internet: { current: action.sum } });
  case ACTION_TYPES.BALANCE_CALLS_SET:
    return Object.assign({}, state, { calls: { current: action.sum } });
  default:
    return state;
  }
};

export default Packages;
