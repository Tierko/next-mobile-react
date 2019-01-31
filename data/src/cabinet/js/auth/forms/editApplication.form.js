import { APPLICATIONS_ENDPOINT } from '~/common/js/apiUrlSchema'


export default {
  endpoint: APPLICATIONS_ENDPOINT,
  defaults: {
    id: undefined,
    firstName: '',
    lastName: '',
    middleName: '',
    name: '',
    code: '',
    delivery: {
      city: '',
      street: '',
      housing: '',
      block: '',
      apartment: '',
      date: '',
      timeRange: undefined,
      acceptConditions: false,
    },
  },
  transformBeforeSubmit: (values) => ({
    ...values,
    id: undefined,
    firstName: undefined,
    lastName: undefined,
    middleName: undefined,
    name: `${values.lastName} ${values.firstName} ${values.middleName}`,
    delivery: {
      ...values.delivery,
      acceptConditions: undefined,
    },
  })
}
