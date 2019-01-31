import { forms } from 'redux-restify';

import {
  setVerifyToken,
  setLoginToken,
} from '~/common/js/localStorage';


import {
  SEND_CODE_ENDPOINT,
  VERIFY_PHONE_ENDPOINT,
  INVITE_APPLICATIONS_ENDPOINT,
  CHECK_PROMO_CODE_ENDPOINT,
  LOGIN_ENDPOINT,
} from '~/common/js/apiUrlSchema';


export const sendCode = (phone) => (dispatch) => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: SEND_CODE_ENDPOINT,
    values: {
      phone,
    },
  }));
}

export const checkPromoCode = (code) => (dispatch) => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: `${CHECK_PROMO_CODE_ENDPOINT}${code}`,
    method: 'GET',
  })).then(({ data, status }) => {
    if (status === 200) {
      dispatch(forms.actions.authForm.changeField('currentTariffSummary', data.summary))
    }
  })
}

export const verifyPhone = (phone, code) => (dispatch) => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: VERIFY_PHONE_ENDPOINT,
    values: {
      phone,
      code,
    },
  })).then(({ data, status }) => {
    if (status === 200) {
      setVerifyToken(data.token)
    }
  });
}

export const createInviteApplication = () => (dispatch) => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: INVITE_APPLICATIONS_ENDPOINT,
  }))
}

export const sendApplication = () => (dispatch) => {
  return dispatch(forms.actions.editApplicationForm.submit())
}

export const login = (phone, code) => (dispatch) => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: LOGIN_ENDPOINT,
    values: {
      phone,
      code,
    },
  })).then(({ data, status }) => {
    if (status === 200) {
      setLoginToken(data.token)
    }
  })
}
