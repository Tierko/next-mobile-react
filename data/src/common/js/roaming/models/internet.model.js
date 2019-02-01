import { RestifyArray } from 'redux-restify';

import { ROAMING_INTERNET_ENDPOINT } from '~/common/js/apiUrlSchema';

export default {
  endpoint: ROAMING_INTERNET_ENDPOINT,
  defaults: {
    zones: new RestifyArray({
      defaults: {
        name: undefined,
        products: new RestifyArray({
          defaults: {
            speedType: 0,
            name: undefined,
            code: undefined,
            value: undefined,
            type: undefined,
            unit: undefined,
            period: undefined,
          },
        }),
      },
    }),
  },
  pagination: false,
};
