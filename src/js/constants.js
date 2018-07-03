export const Pages = {
  Kit: '/kit',
  SignIn: '/',
  SignUp: '/signup',
  Dashboard: '/cabinet',
  Support: '/support',
  RequestStatus: '/request-status',
  Conditions: '/conditions',
  Overview: '/cabinet',
  Pay: '/payment',
  Services: '/services',
  Roaming: '/roaming',
  History: '/history',
  Settings: '/settings',
  Exit: '/',
  AddPackage: '/add-package',
  PayPackage: '/pay-package',
  PayResult: '/pay-result',
  AutoPay: '/auto-pay',
  AutoPayResult: '/auto-pay-result',
  SiteMap: '/sitemap',
  SupportDashboard: '/support-dashboard',
  Detail: '/detail',
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

export const historyFilters = [{
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

export const historyTitles = [{
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
}];

export const months = [
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

export const monthsM = [
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

export const monthsShort = [
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

export const weekdays = [
  'воскресенье',
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
];

export const weekDaysShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export const units = {
  currency: '₽',
};
