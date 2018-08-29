import { units } from './constants';
import data from '../data';

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
  const arr = [];
  let str = source.toString().replace(/[^\d/.]/g, '');
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
    if (i !== 0 && i % 3 === 0) {
      arr.push(' ');
    }

    arr.push(c);
  });

  if (source < 0) {
    arr.push('-');
  }

  return `${arr.reverse().join('') || ''}${tail} ${units.currency}`;
};

export const getData = (type) => {
  if (!data[type]) {
    return localStorage[type] * 1;
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

export const hsl2rgb = (h, s, l) => {
  let r;
  let g;
  let b;
  let m;
  let c;
  let x;

  if (!isFinite(h)) h = 0;
  if (!isFinite(s)) s = 0;
  if (!isFinite(l)) l = 0;

  h /= 60;

  if (h < 0) {
    h = 6 - (-h % 6);
  }

  h %= 6;

  s = Math.max(0, Math.min(1, s / 100));
  l = Math.max(0, Math.min(1, l / 100));

  c = (1 - Math.abs((2 * l) - 1)) * s;
  x = c * (1 - Math.abs((h % 2) - 1));

  if (h < 1) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 2) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 3) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 4) {
    r = 0;
    g = x;
    b = c
  } else if (h < 5) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  m = l - c / 2;
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
};
