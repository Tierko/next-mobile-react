const roamingZones = [{
  id: 1,
  name: 'Зона 1',
  title: 'Зоне 1',
  center: [55.615383, 37.890201],
  zoom: 3,
  countries: [],
  tariff: {
    calls: 200,
    sms: 7,
    internet: {
      byMb: 58,
      fast: {
        title: 'Быстрый',
        title_: 'Интернета',
        desc: 'Для любого трафика на максимальной скорости',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
      regular: {
        title: 'Стандартный',
        title_: 'Интернета',
        desc: 'Для почты и мессенджеров',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
    },
  },
}, {
  id: 2,
  name: 'Зона 2',
  title: 'Зоне 2',
  center: [41.843539, 84.477611],
  zoom: 3,
  countries: [],
  tariff: {
    calls: 200,
    sms: 7,
    internet: {
      byMb: 48,
      fast: {
        title: 'Быстрый',
        title_: 'Интернета',
        desc: 'Для любого трафика на максимальной скорости',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
      regular: {
        title: 'Стандартный',
        title_: 'Интернета',
        desc: 'Для почты и мессенджеров',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
    },
  },
}, {
  id: 3,
  name: 'Зона 3',
  title: 'Зоне 3',
  center: [37.854653, -69.446866],
  zoom: 3,
  countries: [],
  tariff: {
    calls: 200,
    sms: 7,
    internet: {
      byMb: 38,
      fast: {
        title: 'Быстрый',
        title_: 'Интернета',
        desc: 'Для любого трафика на максимальной скорости',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
      regular: {
        title: 'Стандартный',
        title_: 'Интернета',
        desc: 'Для почты и мессенджеров',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
    },
  },
}, {
  id: 4,
  name: 'Остальной мир',
  title: 'Остальном мире',
  center: [6.804347, 21.635814],
  zoom: 3,
  countries: [],
  tariff: {
    calls: 200,
    sms: 7,
    internet: {
      byMb: 28,
      fast: {
        title: 'Быстрый',
        title_: 'Интернета',
        desc: 'Для любого трафика на максимальной скорости',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
      regular: {
        title: 'Стандартный',
        title_: 'Интернета',
        desc: 'Для почты и мессенджеров',
        unit: 'ГБ',
        items: [{
          id: 1,
          count: 3,
          period: 30,
          price: 6500,
        }, {
          id: 2,
          count: 1,
          period: 30,
          price: 2500,
        }, {
          id: 3,
          count: 0.5,
          period: 30,
          price: 1500,
        }],
      },
    },
  },
}];

export default roamingZones;
