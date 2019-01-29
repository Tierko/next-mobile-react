import { GENERAL_SETTINGS, Pages, units } from './constants';
import data from '../data/index';

export const checkCardNumber = str => str && str.replace(/\D/g, '').length === 16;

export const checkPhone = str => str && str.replace(/\D/g, '').length === 11;

export const checkCardDate = str => str && str.replace(/\D/g, '').length === 4;

export const checkCVV = str => str && str.replace(/\D/g, '').length === 3;

export const checkCardHolder = str => str && str.search(/^[a-z]+\s+[a-z]+$/gi) === 0;

export const getPaySystem = (pan) => {
  if (pan.indexOf('2') === 0) {
    return 'mir';
  }

  if (pan.indexOf('4') === 0) {
    return 'visa';
  }

  if (pan.indexOf('5') === 0) {
    return 'mastercard';
  }

  return '';
};

export const getShortPan = pan => `*${pan.substring(12)}`;

export const formatCost = (source, zeroByDefault) => {
  if (source === undefined) {
    return source;
  }

  const arr = [];
  let str = source.toString().replace(',', '.').replace(/\.+/g, '.').replace(/[^\d/.]/g, '');
  let tail = '';

  if (source === 0 && !zeroByDefault) {
    str = '';
  }

  if (str.indexOf('.') !== -1) {
    tail = str.substr(str.indexOf('.'));
    str = str.substring(0, str.lastIndexOf(tail));
    tail = tail.replace('.', ',');
  }

  str = str.split('').reverse();

  str.forEach((c, i) => {
    if (i !== 0 && i % 3 === 0 && str.length > 4) {
      arr.push(' ');
    }

    arr.push(c);
  });

  if (source < 0) {
    arr.push('-');
  }

  if (tail) {
    tail = tail.substr(0, 3);
  }

  return `${arr.reverse().join('') || ''}${tail} ${units.currency}`;
};

export const formatCount = (count, unit) => {
  if (unit === 'time') {
    const sec = count % 60;
    const min = (count - sec) / 60;

    return `${min} мин. ${sec} сек.`;
  }

  return `${count} ${unit}`;
};

export const showDate = (data, index) => {
  const { date } = data[index];

  if (index - 1 < 0) {
    return true;
  }

  return data.findIndex(d => (
    d.date.year === date.year && d.date.month === date.month && d.date.day === date.day)
  ) === index;
};

export const getData = (type) => {
  if (!data[type]) {
    return localStorage[type] * 1;
  }

  if (type === 'tariff' && localStorage[type]) {
    return data[type].find(d => d.id === localStorage[type] * 1);
  }

  return data[type][localStorage[type] || 0] || {};
};

export const convertStrings = (n, arr) => {
  const mod = n % 10;

  if (!arr.length || !Array.isArray(arr)) {
    return arr;
  }

  if (n > 10 && n < 20) {
    return arr[2];
  }

  if (mod === 1) {
    return arr[0];
  }

  if (mod === 2 || mod === 3 || mod === 4) {
    return arr[1];
  }

  return arr[2];
};

export const ajax = (url, dispatch, onRequest, onFail, onSuccess) => {
  if (onRequest) {
    dispatch(onRequest());
  }

  fetch(url, {
    credentials: 'same-origin',
    method: 'GET',
    headers: new Headers({
      'Content-Types': 'text/json',
    }),
  })
    .then(items => items.json())
    .then(items => dispatch(onSuccess(items)))
    .catch(() => dispatch(onFail()));
};

export const mapNumbers = (x, inMin, inMax, outMin, outMax) => (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

export const formatPhone = (phone) => {
  if (!phone) {
    return phone;
  }

  if (phone.length !== 12) {
    return phone;
  }

  return `${phone.substr(0, 2)} (${phone.substr(2, 3)}) ${phone.substr(5, 3)}-${phone.substr(8, 2)}-${phone.substr(10, 2)}`;
};

export function dataBuffer() {
  const interCallsData = {
    groups: {},
    items: [],
  };

  return (countries, interCalls) => {
    if (!interCallsData.items.length && countries.length && interCalls.items.length) {
      return {
        groups: Object.assign({}, interCalls.groups),
        items: interCalls.items.map((item) => {
          const country = countries.find(c => c.properties.code === item.code);

          if (country) {
            item.code = country.properties.code;
            item.name = country.properties.name;
            item.flag = country.properties.flag;
          }

          return item;
        }),
      };
    }

    return interCallsData;
  };
}

export function luhnAlgorithm(digits) {
  let sum = 0;

  if (typeof digits !== 'string') {
    return false;
  }

  digits = digits.replace(/\s/g, '');

  for (let i = 0; i < digits.length; i++) {
    let cardNum = parseInt(digits[i], 10);

    if ((digits.length - i) % 2 === 0) {
      cardNum *= 2;

      if (cardNum > 9) {
        cardNum -= 9;
      }
    }

    sum += cardNum;
  }

  return sum % 10 === 0;
}

export const cleanPhone = (phone) => {
  if (!phone) {
    return phone;
  }

  return phone.replace(/[+ -]/g, '');
};

export const sendAjax = (apiUrl, method, body) => {

  const headers = new Headers({
    'Content-Types': 'application/json',
    'Authorization': `Basic ${btoa(`${GENERAL_SETTINGS.api_login}:${GENERAL_SETTINGS.api_password}`)}`,
  });

  if (localStorage.getItem('next-token-login')) {
    headers.append('X-Authorization', `Bearer ${localStorage.getItem('next-token-login')}`);
  }

  return fetch(`${GENERAL_SETTINGS.api_url}${GENERAL_SETTINGS.api_version}${apiUrl}`, {
    method,
    headers,
    body,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    });
};
