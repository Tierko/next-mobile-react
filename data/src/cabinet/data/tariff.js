const tariff = [{
  id: 37,
  title: 'СуперВИП',
  payment: 3000,
  internet: 32,
  nextCalls: 'Безлимит',
  calls: 700,
  sms: 'Безлимит',
  transition: 0,
  over: {
    internet: 3,
    sms: 3,
    calls: 3,
  },
}, {
  id: 38,
  current: false,
  title: 'Премиум',
  payment: 2000,
  internet: 16,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
  over: {
    internet: 2,
    sms: 2,
    calls: 2,
  },
}, {
  id: 39,
  current: false,
  title: 'Лайт',
  payment: 1500,
  internet: 8,
  calls: 700,
  nextCalls: 700,
  sms: 'Безлимит',
  transition: 0,
  over: {
    internet: 1,
    sms: 1,
    calls: 1,
  },
}];

export default tariff;
