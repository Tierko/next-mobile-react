import { PROFILE_REQUEST_ENDPOINT } from '~/common/js/apiUrlSchema';
import { isEmail } from '~/common/js/utils';
import { isBetween } from '../../utils';

const isInRange = isBetween(100, 10000);

export default {
  endpoint: PROFILE_REQUEST_ENDPOINT,
  method: 'PATCH',
  defaults: {
    email: undefined,
    sendPaychecks: undefined,
    emailForDetalization: undefined,
    spendingsNotification: undefined,
    spendingsAmount: 0,
    spendingsNotificationDisplay: undefined,
  },
  validateOnSubmit: false,
  validate: (values) => {
    if (!isEmail(values.email) && values.email !== '') {
      return { email: 'Неверный формат почты' };
    }
    if (!isInRange(values.spendingsAmount)) {
      return { spendingsAmount: 'Сумма должна быть от 100 до 10 000 ₽' };
    }
    return { };
  },
};
