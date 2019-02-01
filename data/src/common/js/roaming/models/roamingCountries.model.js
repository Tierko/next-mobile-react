import { RestifyArray } from 'redux-restify';

import { ROAMING_COUNTRIES_ENDPOINT } from '~/common/js/apiUrlSchema';


export default {
  endpoint: ROAMING_COUNTRIES_ENDPOINT,
  defaults: {
    id: undefined,
    data: new RestifyArray({
      defaults: {
        name: undefined,
        code: undefined,
        parameter: undefined,
        price: undefined,
      },
    }),
  },
  transformEntityResponse: response => ({
    data: {
      // Make array look like object
      data: response,
    },
  }),
};
