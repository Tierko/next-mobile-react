import { ACTION_TYPES } from '../constants';

const initState = {
  currentZoneId: 0,
  currentCountry: 'UA',
  features: [],
  zones: [{
    id: 1,
    name: 'Зона 1',
    title: 'Зоне 1',
    title_: 'Зоны 1',
    center: [55.615383, 37.890201],
    zoom: 3,
    additionalPackage: {
      max: 12,
      current: 8.32,
      expired: 12,
    },
    byMegabytes: false,
    countries: ['BY', 'KZ', 'UA', 'UZ'],
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
    title_: 'Зоны 2',
    center: [41.843539, 84.477611],
    zoom: 3,
    additionalPackage: {
      max: 12,
      current: 2.01,
      expired: 12,
    },
    byMegabytes: false,
    countries: ['CN', 'IN'],
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
    title_: 'Зоны 3',
    center: [37.854653, -69.446866],
    zoom: 3,
    additionalPackage: null,
    byMegabytes: true,
    countries: ['US', 'CA'],
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
    title_: 'Остального мира',
    center: [6.804347, 21.635814],
    zoom: 3,
    additionalPackage: null,
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
  }],
};

const Roaming = (state = initState, action) => {
  switch (action.type) {
  case ACTION_TYPES.ROAMING_TOGGLE:
    return Object.assign({}, state, { currentZoneId: state.currentZoneId ? 0 : 1 });
  default:
    return state;
  }
};

export default Roaming;
