import keyMirror from 'keymirror';

export const URL = 'http://localhost';

export const HOME = 'RU';

export const ACTION_TYPES = keyMirror({
  PACKAGES_REQUEST: undefined,
  PACKAGES_REQUEST_FAIL: undefined,
  PACKAGES_REQUEST_SUCCESS: undefined,
  BALANCE_SUM_SET: undefined,
  BALANCE_INTERNET_SET: undefined,
  BALANCE_CALLS_SET: undefined,
  ROAMING_TOGGLE: undefined,
  ROAMING_ZONES_REQUEST: undefined,
  ROAMING_ZONES_REQUEST_FAIL: undefined,
  ROAMING_ZONES_REQUEST_SUCCESS: undefined,
  ROAMING_FEATURES_REQUEST: undefined,
  ROAMING_FEATURES_REQUEST_FAIL: undefined,
  ROAMING_FEATURES_REQUEST_SUCCESS: undefined,
  ROAMING_INTERNET_REQUEST: undefined,
  ROAMING_INTERNET_REQUEST_FAIL: undefined,
  ROAMING_INTERNET_REQUEST_SUCCESS: undefined,
  AUTO_PAY_SAVE: undefined,
  CARDS_ADD: undefined,
  CARDS_REMOVE: undefined,
  CARDS_MAKE_DEFAULT: undefined,
});

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
  MORE: '/more',
  RESULT: '/result',
  DATA: '/data',
  INVITE: '/invite',
  INTERNET: '/internet',
  CONFIRM: '/confirm',
  NOT_FOUND: '/not-found',
  HOME: '/',
  TARIFF: '/tariff_r2',
  HOME_R1: '/home_r1',
  HOME_R2: '/home_r2',
  TARIFF_R1: '/tariff_r1',
  TARIFF_R2: '/tariff_r2',
};

export const TITLES = {
  OVERVIEW: 'Обзор',
  PAY: 'Пополнение',
  SERVICES: 'Тарифы и услуги',
  ROAMING: 'Роуминг',
  HISTORY: 'История',
  SETTINGS: 'Настройки',
  SUPPORT: 'Поддержка',
  ADD_PACKAGE: 'Купить дополнительный пакет',
  AUTO_PAY: 'Автоплатеж',
  INVITES: 'Инвайты',
  KIT: 'Типовая',
  MORE_INTERNET: 'Интернет',
  MORE_CALLS: 'Звонки',
  NOT_FOUND: 'Ошибка 404: страница не найдена',
  DETAIL: 'Детализация',
  DATA: 'Демо данные',
  SITE_MAP: 'Карта сайта',
  CONDITIONS: 'Условия перехода',
  SIGN_UP: 'Регистрация',
  SIGN_IN: 'Вход',
  REQUEST_STATUS: 'Статус заявки',
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
export const LEFT = ['Остался', 'Осталось', 'Осталось'];
export const NOT_ACTIVATED = ['неактивированный', 'неактивированных', 'неактивированных'];
export const PROMO_CODES = ['промо-код', 'промо-кода', 'промо-кодов'];
export const LINKS = ['ссылка', 'ссылки', 'ссылок'];

export const WEEKDAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const units = {
  currency: '₽',
};

export const THIRTY_DAYS = 24 * 60 * 60 * 30 * 1000;
