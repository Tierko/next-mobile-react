import { RestifyArray } from 'redux-restify'

import { HISTORY_DETAIL_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: HISTORY_DETAIL_ENDPOINT,
  defaults: {
    id: '',
    filter: new RestifyArray({
      defaults: {
        name: undefined,
        code: undefined,
        icon: undefined,
        iconDetail: undefined,
      }
    }),
    operations: new RestifyArray({
      defaults: {
        time: undefined,
        name: undefined,
        description: undefined,
        type: undefined,
        amount: undefined,
        icon: undefined,
        iconDetail: undefined,
        country: undefined,
      },
    }),
  },
  pagination: false,
}
