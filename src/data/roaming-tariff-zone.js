const roamingTariffZone = [{
  id: 1,
  title: 'Звонки',
  items: [{
    id: 1,
    title: 'Внутри зоны',
    cost: 17,
    unit: 'мин',
  }, {
    id: 2,
    title: 'Вне зоны',
    cost: 56,
    unit: 'мин',
  }],
}, {
  id: 2,
  title: 'СМС',
  items: [{
    id: 1,
    title: 'Внутри зоны',
    cost: 17,
    unit: 'СМС',
  }, {
    id: 2,
    title: 'Вне зоны',
    cost: 56,
    unit: 'СМС',
  }],
}, {
  id: 3,
  title: 'Интернет',
  items: [{
    id: 1,
    title: 'Помегабитно',
    cost: 60,
    unit: 'Мб',
  }, {
    id: 2,
    title: 'Пакет',
    cost: 700,
    unit: '500 Мб',
    from: true,
  }],
}];

export default roamingTariffZone;
