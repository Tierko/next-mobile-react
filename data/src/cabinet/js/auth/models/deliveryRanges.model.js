import { DELIVERY_RANGES_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: DELIVERY_RANGES_ENDPOINT,
  defaults: {
    id: undefined,
    range: undefined,
  },
  allowIdRequests: false,
  pagination: false,
}
