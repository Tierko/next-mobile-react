import { ACTION_TYPES, PRODUCT_TYPES, units } from '../constants';

const initialState = {
  balance: 0,
  currency: units.currency,
  tariff: {
    name: '',
    code: '',
  },
  packages: [],
  remaining: [],
  loaded: false,
  error: false,
};

const mapPackage = (remaining, type) => ({
  type,
  packages: remaining.each.filter(item => item.type === type.code),
  ...remaining.groups[type.code],
});

const mapApiToState = (response) => {
  const { dashboard, products } = response;
  const { remaining } = dashboard;

  return {
    balance: Number(dashboard.balance.replace(',', '.')),
    currency: dashboard.currency,
    tariff: dashboard.tariff,
    packages: products,
    remaining: [
      mapPackage(remaining, PRODUCT_TYPES.INTERNET),
      mapPackage(remaining, PRODUCT_TYPES.CALLS),
      mapPackage(remaining, PRODUCT_TYPES.SMS),
    ]
  };
};

const Dashboard = (state = initialState, action) => {
  switch (action.type) {
  case ACTION_TYPES.DASHBOARD_REQUEST:
    return Object.assign({}, state, { loaded: false, error: false });
  case ACTION_TYPES.DASHBOARD_REQUEST_FAIL:
    return Object.assign({}, state, { loaded: false, error: true });
  case ACTION_TYPES.DASHBOARD_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      loaded: true,
      error: false,
      ...mapApiToState(action.response),
    });
  default:
    return state;
  }
};

export default Dashboard;
