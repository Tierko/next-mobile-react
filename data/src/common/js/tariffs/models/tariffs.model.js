import { RestifyArray } from 'redux-restify'


export default {
  endpoint: undefined,
  idField: 'code',
  defaults: {
    name: undefined,
    code: undefined,
    active: false,
    order: undefined,
    parameters: new RestifyArray({
      defaults: {
        name: undefined,
        value: undefined,
        currency: undefined,
        unit: undefined,
        order: undefined,
        type: undefined,
      }
    }),
  },
  allowIdRequests: false,
  pagination: false,
}
