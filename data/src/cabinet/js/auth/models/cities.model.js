import { CITIES_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: CITIES_ENDPOINT,
  idField: 'name',
  defaults: {
    name: undefined,
  },
  allowIdRequests: false,
  pagination: false,
}
