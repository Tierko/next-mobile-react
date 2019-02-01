import {
  RestifyArray,
  RestifyForeignKey,
} from 'redux-restify'

import { DASHBOARD_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: DASHBOARD_ENDPOINT,
  defaults: {
    id: '',
    dashboard: {
      balance: undefined,
      currency: undefined,
      freeUsageUntil: undefined,
      paymentNotification: {
        notification: undefined,
        type: undefined,
      },
      remaining: {
        each: new RestifyArray({
          defaults: {
            additional: undefined,
            base: undefined,
            name: undefined,
            remain: undefined,
            renewal: undefined,
            type: undefined,
            unit: undefined,
          }
        }),
        groups: {
          internet: {
            base: undefined,
            remain: undefined,
            unit: undefined,
          },
          sms: {
            base: undefined,
            remain: undefined,
            unit: undefined,
          },
          calls: {
            base: undefined,
            remain: undefined,
            unit: undefined,
          },
        },
      },
      tariff: new RestifyForeignKey('tariffs'),
      calls: new RestifyArray({
        defaults: {
          name: undefined,
          value: undefined,
          unit: undefined,
        },
      }),
      invites: {
        linkText: undefined,
        amount: undefined,
      },
      packagesUpdate: undefined,
      roaming: {
        country: {
          current: undefined,
          zone: undefined,
          expensive: undefined,
          gt: undefined,
          code: undefined,
        },
        internet: {
          package: {
            base: undefined,
            remain: undefined,
            unit: undefined,
            renewalWithin: undefined,
            type: {
              type: undefined,
              name: undefined,
            },
          },
          perMegabyte: {
            active: undefined,
            code: undefined,
            display: undefined,
            price: undefined,
          },
        },
        calls: undefined,
        sms: undefined,
      },
    },
    products: new RestifyArray({
      defaults: {
        speedType: undefined,
        name: undefined,
        code: undefined,
        value: undefined,
        type: undefined,
        unit: undefined,
        period: undefined,
      },
    })
  },
}
