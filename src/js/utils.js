import { units } from './constants';
import data from '../data';

export const checkCardNumber = str => str && str.replace(/\D/g, '').length === 16;

export const checkPhone = str => str && str.replace(/\D/g, '').length === 11;

export const checkCardDate = str => str && str.replace(/\D/g, '').length === 4;

export const checkCVV = str => str && str.replace(/\D/g, '').length === 3;

export const checkCardHolder = str => str && str.search(/^[a-z]+\s+[a-z]+$/gi) === 0;

export const formatCost = (source) => {
  const arr = [];
  let str = source.toString().replace(/[^\d/.]/g, '');
  let tail = '';

  if (source === 0) {
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
    headers: new Headers({
      'Content-Types': 'text/json',
    }),
  })
    .then(items => items.json())
    .then(items => dispatch(onSuccess(items)))
    .catch(() => dispatch(onFail()));
};
