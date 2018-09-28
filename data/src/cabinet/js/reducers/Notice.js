import { ACTION_TYPES } from '../constants';

const initState = {
  data: [{
    id: 1,
    date: '21 июля, 14:30',
    text: 'Ваша SIM-карта заблокирована',
    note: '',
    action: null,
    isRed: false,
    important: false,
  }, {
    id: 2,
    date: '23 июля, 14:30',
    text: 'Добавьте электронную почту в настройках, чтобы получать квитанции и уведомления об оплатах',
    note: '',
    action: {
      type: 'link',
      text: 'Добавить',
    },
    isRed: false,
    important: false,
  }, {
    id: 3,
    date: '29 июля, 14:30',
    text: 'Добавлено 3 ГБ бесплатного интернета до 5 марта',
    note: 'Спасибо, что всегда пополняете баланс вовремя',
    action: null,
    isRed: false,
    important: false,
  }],
};

const Notice = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.NOTICE_READ:
    return Object.assign({}, state, {
      data: state.data.map(n => n.id === action.id ? n.isRed = true : n),
    });
  case ACTION_TYPES.NOTICE_REMOVE:
    return Object.assign({}, state, state.data.filter(n => n.id !== action.id));
  default:
    return state;
  }
};

export default Notice;
