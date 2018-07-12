import { units, DAYS } from './constants';
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

  if (str.indexOf('.') !== -1) {
    tail = str.substr(str.indexOf('.'));
    str = str.substring(0, str.lastIndexOf(tail));
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

  return `${arr.reverse().join('') || '0'}${tail} ${units.currency}`;
};

export const getData = type => data[type][localStorage[type] || 0] || {};

export const convertDays = (n) => {
  const mod = n % 10;
  if (mod === 1) {
    return DAYS[0];
  }

  if (mod === 2 || mod === 3 || mod === 4) {
    return DAYS[1];
  }

  return DAYS[2];
};
