export const URL = 'http://localhost';

export const Pages = {
  KIT: '/kit',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  DASHBOARD: '/cabinet',
  SUPPORT: '/support',
  REQUEST_STATUS: '/request-status',
  CONDITIONS: '/conditions',
  OVERVIEW: '/cabinet',
  PAY: '/payment',
  SERVICES: '/services',
  ROAMING: '/roaming',
  HISTORY: '/history',
  SETTINGS: '/settings',
  Exit: '/',
  ADD_PACKAGE: '/add-package',
  PAY_PACKAGE: '/pay-package',
  AUTO_PAY: '/auto-pay',
  SITE_MAP: '/',
  SUPPORT_DASHBOARD: '/support-dashboard',
  DETAIL: '/detail',
  CALLS: '/calls',
  RESULT: '/result',
  DATA: '/data',
  INVITE: '/invite',
};

export const Statuses = {
  REQUEST_SENT: 'request-sent',
  INFORMATION_CHECKED: 'information-checked',
  CHANGES_SAVED: 'changes-saved',
  TRANSITION_CONFIRMED: 'transition-confirmed',
  TRANSITION_STOPPED: 'transition-stopped',
  SIM_DELIVERY: 'sim-delivery',
  SIM_DELIVERY_TODAY: 'sim-delivery-today',
};

export const HISTORY_FILTERS = [{
  id: 1,
  title: 'Все операции',
}, {
  id: 2,
  title: 'Добавление пакетов',
}, {
  id: 3,
  title: 'Исходящие звонки по России',
}, {
  id: 4,
  title: 'Исходящие звонки за границу',
}, {
  id: 5,
  title: 'СМС в роуминге',
}, {
  id: 6,
  title: 'Интернет в роуминге',
}, {
  id: 7,
  title: 'Абоненская плата',
}, {
  id: 8,
  title: 'Входящий звонок',
}];

export const HISTORY_TITLES = [{
  id: 2,
  title: 'Покупка пакета услуг',
}, {
  id: 3,
  title: 'Исходящий звонок',
}, {
  id: 4,
  title: 'Исходящий звонок',
}, {
  id: 5,
  title: 'СМС в роуминге',
}, {
  id: 6,
  title: 'Интернет в роуминге',
}, {
  id: 7,
  title: 'Абоненская плата',
}, {
  id: 8,
  title: 'Входящий звонок',
}, {
  id: 9,
  title: 'СМС',
}, {
  id: 10,
  title: 'Интернет',
}, {
  id: 11,
  title: 'Пополнение счета',
}];

export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const MONTHS_M = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const MONTHS_SHORT = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

export const WEEKDAYS = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
];

export const DAYS = ['день', 'дня', 'дней'];
export const COUNTRIES = ['страна', 'страны', 'стран'];
export const PROMO_CODES = ['промокод', 'промокода', 'промокодов'];
export const LINKS = ['ссылка', 'ссылки', 'ссылок'];

export const WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const units = {
  currency: '₽',
};
