import { api, forms } from 'redux-restify';

import { PAYMENTS_ENDPOINT } from '~/common/js/apiUrlSchema';

export const pay = (amount, binding) => dispatch => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: PAYMENTS_ENDPOINT,
    method: 'POST',
    values: {
      amount,
      binding,
    },
  })).then(() => {
    dispatch(api.actions.entityManager.dashboard.clearData())
  });
};
