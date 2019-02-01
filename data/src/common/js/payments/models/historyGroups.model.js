import { RestifyArray } from 'redux-restify'

import { HISTORY_GROUPS_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: HISTORY_GROUPS_ENDPOINT,
  defaults: {
    id: '',
    history: new RestifyArray({
      defaults: {
        total: undefined,
        month: undefined,
        currency: undefined,
        fee: undefined,
        otherServices: undefined,
        roaming: undefined,
      },
    }),
  },
  pagination: false,
}
