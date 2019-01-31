import { RestifyForeignKey } from 'redux-restify'

import { APPLICATIONS_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: APPLICATIONS_ENDPOINT,
  defaults: {
    application: {
      status: undefined,
      delivery: {
        courier: {
          name: undefined,
          photo: undefined,
          contacts: undefined,
        },
        date: undefined,
        time: undefined,
        address: undefined,
        city: undefined,
        street: undefined,
        housing: undefined,
        block: undefined,
        apartment: undefined,
        timeRange: new RestifyForeignKey('deliveryRanges'),
      },
      name: undefined,
      code: undefined,
    },
    inviteApplication: {
      status: undefined,
      application: undefined,
      tariff: undefined,
    },
  },
}
