import { RestifyForeignKeysArray } from 'redux-restify'

import { PRODUCTS_INFO_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: PRODUCTS_INFO_ENDPOINT,
  defaults: {
    id: '',
    tariffs: new RestifyForeignKeysArray('tariffs'),
    services: new RestifyForeignKeysArray('services'),
  },
  pagination: false,
}
