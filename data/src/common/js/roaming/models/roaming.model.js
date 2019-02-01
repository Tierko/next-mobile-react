import { RestifyArray, RestifyForeignKey, RestifyForeignKeysArray } from 'redux-restify';

import { ROAMING_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: ROAMING_ENDPOINT,
  defaults: {
    id: '',
    zones: new RestifyForeignKeysArray('zones'),
    countries: new RestifyForeignKeysArray('countries'),
    current: new RestifyForeignKey('countries'),
  },
};
