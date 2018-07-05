const roaming = [
  [{
    id: 1,
    zoneName: 'Зона 1',
    services: [{
      id: 11,
      desc: 'Пакет быстрого интернета',
      conditions: '2,01 ГБ еще 12 дней',
      type: 'fast',
    }, {
      id: 12,
      desc: 'Помегабайтный интернет',
      conditions: '58 ₽ / Мб',
      type: 'regular',
    }],
  }, {
    id: 2,
    zoneName: 'Остальной мир',
    services: [{
      id: 21,
      desc: 'Помегабайтный интернет',
      conditions: '320 ₽ / Мб',
      type: 'regular',
    }],
  }],
];

export default roaming;
