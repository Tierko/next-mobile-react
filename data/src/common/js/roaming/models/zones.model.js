import { RestifyForeignKeysArray, RestifyArray } from 'redux-restify';


export default {
  endpoint: undefined,
  defaults: {
    id: undefined,
    name: undefined,
    tariffsName: undefined,
    comment: undefined,
    countries: new RestifyForeignKeysArray('countries'),
    perMegabyte: {
      active: undefined,
      code: undefined,
      display: undefined,
      price: undefined,
    },
    calls: new RestifyArray({
      defaults: {
        name: undefined,
        currency: undefined,
        important: undefined,
        isMinimal: undefined,
        price: undefined,
        unit: undefined,
      },
    }),
    sms: new RestifyArray({
      defaults: {
        currency: undefined,
        important: undefined,
        isMinimal: undefined,
        name: undefined,
        price: undefined,
        unit: undefined,
      },
    }),
    internetPackage: {
      bases: undefined,
      remaining: undefined,
      renewalWithin: undefined,
      speedType: undefined,
      unit: undefined,
    },
  },
  pagination: false,
};
