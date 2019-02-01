import { RestifyArray } from 'redux-restify'

import { PAYMENTS_CARDS_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: PAYMENTS_CARDS_ENDPOINT,
  defaults: {
    id: '',
    cards: new RestifyArray({
      defaults: {
        token: undefined,
        canDelete: undefined,
        default: undefined,
        extId: undefined,
        paymentSystem: undefined,
        bank: {
          color1: undefined,
          color2: undefined,
          name: undefined,
        },
      },
    }),
    autoPayments: {
      description: undefined,
      payments: new RestifyArray({
        defaults: {
          type: undefined,
          amount: undefined,
          day: undefined,
          lowBalanceAmount: undefined,
          limit: undefined,
          dayLimit: undefined,
        },
      }),
    },
  },
  pagination: false,
}
