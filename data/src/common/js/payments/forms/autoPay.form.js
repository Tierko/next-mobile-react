import { PAYMENTS_AUTO_PAY_ENDPOINT } from '~/common/js/apiUrlSchema';
import { isBetween } from '../../utils';

const isInRange = isBetween(100, 10000);

export default {
  endpoint: PAYMENTS_AUTO_PAY_ENDPOINT,
  defaults: {
    type: '',
    cooldown: '',
    amount: 1000,
    amountLimit: 1000,
    day: 1,
    lowBalanceAmount: 0,
    limit: 500,
    dayLimit: 0,
    isMonthlyExist: false,
    isLimitExist: false,
  },
  validate: (values) => {
    if (!isInRange(values.amount)) {
      return { amount: 'Сумма должна быть от 100 до 10 000 ₽' };
    }
    if (!isInRange(values.amountLimit)) {
      return { amountLimit: 'Сумма должна быть от 100 до 10 000 ₽' };
    }
    if (!isInRange(values.limit)) {
      return { limit: 'Сумма должна быть от 100 до 10 000 ₽' };
    }
    return { };
  },
};
