import { ACTION_TYPES } from '../constants';

const initState = {
  data: [{
    id: 1,
    date: '21 июля, 14:30',
    text: 'Ваша SIM-карта заблокирована',
    note: 'Чтобы разблокировать карту – обратитесь в поддержку',
    action: null,
    isRed: false,
    important: true,
    deleted: false,
  }, {
    id: 2,
    date: '23 июля, 14:30',
    text: 'Добавьте электронную почту в настройках, чтобы получать квитанции и уведомления об оплатах',
    note: '',
    action: {
      type: 'link',
      text: 'Добавить',
      value: '/settings',
    },
    isRed: false,
    important: false,
    deleted: false,
  }, {
    id: 3,
    date: '29 июля, 14:30',
    text: 'Добавлено 3 ГБ бесплатного интернета до 5 марта',
    note: 'Спасибо, что всегда пополняете баланс вовремя',
    action: null,
    isRed: false,
    important: false,
    deleted: false,
  }],
};

const Notice = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.NOTICE_READ:
    return Object.assign({}, state, {
      data: state.data.map((n) => {
        n.isRed = true;

        return n;
      }),
    });
  case ACTION_TYPES.NOTICE_REMOVE:
    return Object.assign({}, state, {
      data: state.data.map((n) => {

        if (n.id === action.id) {
          n.deleted = true;
        }

        return n;
      }),
    });
  case ACTION_TYPES.NOTICE_EXCLUDE:
    return Object.assign({}, state, { data: state.data.filter(n => !n.deleted) });
  case ACTION_TYPES.NOTICE_REPAIR:
    return Object.assign({}, state, {
      data: state.data.map((n) => {
        if (n.id === action.id) {
          n.deleted = false;
        }

        return n;
      }),
    });
  default:
    return state;
  }
};

export default Notice;
