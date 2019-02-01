import { forms } from 'redux-restify'

import { HISTORY_DETAIL_REQUEST_ENDPOINT } from '~/common/js/apiUrlSchema'


export const requestHistoryDetail = (config) => (dispatch) => {
  return dispatch(forms.actions.sendQuickForm({
    endpoint: HISTORY_DETAIL_REQUEST_ENDPOINT,
    values: config,
  }))
}
