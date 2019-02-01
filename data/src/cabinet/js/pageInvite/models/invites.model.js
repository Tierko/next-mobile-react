import { RestifyArray } from 'redux-restify'

import { INVITES_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: INVITES_ENDPOINT,
  defaults: {
    id: '',
    tariff: undefined,
    remaining: undefined,
    invites: new RestifyArray({
      defaults: {
        code: undefined,
        status: undefined,
        phone: undefined,
      },
    }),
  },
  pagination: false,
}
