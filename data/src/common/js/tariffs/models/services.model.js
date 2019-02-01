import { RestifyArray } from 'redux-restify'


export default {
  endpoint: undefined,
  idField: 'code',
  defaults: {
    name: undefined,
    code: undefined,
    order: undefined,
    description: undefined,
    active: undefined,
  },
  pagination: false,
}
