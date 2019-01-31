import { PROFILE_REQUEST_ENDPOINT } from '~/common/js/apiUrlSchema';

export default {
  endpoint: PROFILE_REQUEST_ENDPOINT,
  defaults: {
    email: undefined,
    sendPaychecks: undefined,
    emailForDetalization: undefined,
    spendingsNotification: undefined,
    spendingsAmount: undefined,
    spendingsNotificationDisplay: undefined,
  },
  pagination: false,
};
